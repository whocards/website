import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import process from 'node:process'

import {Resvg} from '@resvg/resvg-js'
import bidiFactory from 'bidi-js'
import satori from 'satori'
import {decompress} from 'wawoff2'

import languages from '~data/languages.json'
import questions from '~data/questions.json'

/**
 * Programmatic generator for the per-question social/OG card images.
 *
 * Pipeline: question text -> Satori (HTML/CSS -> SVG) -> @resvg/resvg-js (SVG -> PNG).
 *
 * Fonts ship as woff2 in /public/fonts but Satori only understands ttf/otf/woff,
 * so we decompress the woff2 to ttf once (cached) with wawoff2.
 *
 * Adding a question or language requires NO committed PNGs: the card is rendered
 * from src/data/questions.json on demand (build-time prerender of the .png endpoint).
 */

export const CARD_WIDTH = 1200
export const CARD_HEIGHT = 630

const BG_COLOR = '#262434'
const TEXT_COLOR = '#f5f5f5'
const ACCENT_PURPLE = '#c058d2'
const ACCENT_YELLOW = '#f9d75f'

type LanguageCode = keyof typeof languages
type Questions = Record<string, Record<string, string>>

const allQuestions = questions as Questions

// RTL languages in the dataset.
const RTL_LANGUAGES = new Set<string>(['he'])

// Map a language to the font that has glyph coverage for it. golos_text covers
// Latin + Cyrillic; CJK / Hebrew need their dedicated Noto subsets.
const LANGUAGE_FONT: Partial<Record<LanguageCode, FontKey>> = {
  he: 'hebrew',
  zh: 'chinese',
  jp: 'japanese',
}

type FontKey = 'golos' | 'hebrew' | 'chinese' | 'japanese'

const FONT_FILES: Record<FontKey, {file: string; family: string}> = {
  golos: {file: 'golos_text.woff2', family: 'Golos Text'},
  hebrew: {file: 'noto-sans-hebrew_regular.woff2', family: 'Noto Sans Hebrew'},
  chinese: {file: 'noto-sans-chinese_regular.woff2', family: 'Noto Sans Chinese'},
  japanese: {file: 'noto-sans-japanese_regular.woff2', family: 'Noto Sans Japanese'},
}

// Fonts live in /public/fonts. Cards are prerendered at build time where the
// process cwd is the project root, so resolve from cwd (robust against the
// bundled module location, which import.meta.url would point to).
const fontDir = join(process.cwd(), 'public', 'fonts')

const ttfCache = new Map<FontKey, Promise<Buffer>>()

const loadTtf = (key: FontKey): Promise<Buffer> => {
  let cached = ttfCache.get(key)
  if (!cached) {
    cached = (async () => {
      const woff2 = await readFile(join(fontDir, FONT_FILES[key].file))
      const ttf = await decompress(woff2)
      return Buffer.from(ttf)
    })()
    ttfCache.set(key, cached)
  }
  return cached
}

const fontFamilyFor = (language: string): string => {
  const key = LANGUAGE_FONT[language as LanguageCode] ?? 'golos'
  return FONT_FILES[key].family
}

const fontsFor = async (
  language: string
): Promise<{name: string; data: Buffer; weight: 400; style: 'normal'}[]> => {
  const scriptKey = LANGUAGE_FONT[language as LanguageCode]
  // Always include golos as the base (covers the wordmark + Latin punctuation),
  // then layer the script-specific font when needed.
  const keys: FontKey[] = scriptKey ? ['golos', scriptKey] : ['golos']
  const data = await Promise.all(keys.map(loadTtf))
  return keys.map((key, i) => ({
    name: FONT_FILES[key].family,
    data: data[i]!,
    weight: 400 as const,
    style: 'normal' as const,
  }))
}

const isRtl = (language: string): boolean => RTL_LANGUAGES.has(language)

const bidi = bidiFactory()

// Rough max characters per visual line at a given font size, used to wrap RTL
// text before reordering (Satori in this version does no bidi reordering, so we
// reorder ourselves and feed it pre-broken visual-order lines).
const maxCharsPerLine = (fontSize: number): number =>
  Math.floor((CARD_WIDTH - 128) / (fontSize * 0.52))

const wrapLine = (line: string, maxChars: number): string[] => {
  if (line.length <= maxChars) return [line]
  const words = line.split(' ')
  const out: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
      out.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current) out.push(current)
  return out
}

// Reorder logical-order RTL text into visual order (with bracket mirroring) and
// wrap it, so Satori's plain LTR glyph placement renders it correctly.
const toVisualRtl = (text: string, fontSize: number): string => {
  const maxChars = maxCharsPerLine(fontSize)
  const reorder = (line: string): string => {
    if (!line) return line
    const levels = bidi.getEmbeddingLevels(line, 'rtl')
    return bidi.getReorderedString(line, levels)
  }
  return text
    .split('\n')
    .flatMap((paragraph) => {
      if (paragraph === '') return ['']
      return wrapLine(paragraph, maxChars).map(reorder)
    })
    .join('\n')
}

/** Pick a font size that keeps long questions inside the card. */
const fontSizeFor = (text: string): number => {
  const len = text.replace(/\s+/g, ' ').trim().length
  if (len <= 55) return 70
  if (len <= 90) return 60
  if (len <= 140) return 52
  if (len <= 200) return 44
  return 38
}

const Wordmark = (rtl: boolean) => ({
  type: 'div',
  props: {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      ...(rtl ? {flexDirection: 'row-reverse'} : {}),
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            fontFamily: 'Golos Text',
            fontSize: '34px',
            fontWeight: 700,
            letterSpacing: '1px',
            color: TEXT_COLOR,
          },
          children: 'WHOCARDS.CC',
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontFamily: 'Golos Text',
            fontSize: '40px',
            fontWeight: 700,
            color: ACCENT_PURPLE,
          },
          children: '?',
        },
      },
      {
        type: 'div',
        props: {
          style: {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: ACCENT_YELLOW,
            marginLeft: rtl ? '0' : '-14px',
            marginRight: rtl ? '-14px' : '0',
            alignSelf: 'flex-end',
            marginBottom: '4px',
          },
        },
      },
    ],
  },
})

const buildTree = (rawText: string, language: string) => {
  const rtl = isRtl(language)
  const fontFamily = `${fontFamilyFor(language)}, Golos Text`
  const fontSize = fontSizeFor(rawText)
  // For RTL we pre-reorder + pre-wrap the text and disable Satori wrapping;
  // for LTR we let Satori wrap normally.
  const text = rtl ? toVisualRtl(rawText, fontSize) : rawText
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: BG_COLOR,
        padding: '64px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flex: 1,
              alignItems: 'flex-start',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    fontWeight: 400,
                    lineHeight: 1.25,
                    color: TEXT_COLOR,
                    // RTL text is already wrapped into visual lines, so use `pre`
                    // to keep those breaks; LTR wraps naturally with pre-wrap.
                    whiteSpace: rtl ? 'pre' : 'pre-wrap',
                    textAlign: rtl ? 'right' : 'left',
                    width: '100%',
                  },
                  children: text,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: rtl ? 'flex-start' : 'flex-end',
            },
            children: [Wordmark(rtl)],
          },
        },
      ],
    },
  }
}

/** Render the OG/social card PNG for a given language + question id. */
export const renderCardPng = async (language: string, id: string): Promise<Buffer> => {
  const entry = allQuestions[id]
  if (!entry) throw new Error(`Unknown question id: ${id}`)
  const text = entry[language]
  if (text == null) throw new Error(`Question ${id} has no text for language ${language}`)

  const fonts = await fontsFor(language)

  const svg = await satori(buildTree(text, language) as never, {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts,
    loadAdditionalAsset: async () => '',
  })

  const resvg = new Resvg(svg, {
    fitTo: {mode: 'width', value: CARD_WIDTH},
    background: BG_COLOR,
  })
  return Buffer.from(resvg.render().asPng())
}

/** Every (language, id) pair that has question text — used for static prerender. */
export const cardImagePaths = (): {language: string; id: string}[] => {
  const paths: {language: string; id: string}[] = []
  for (const [id, entry] of Object.entries(allQuestions)) {
    for (const language of Object.keys(entry)) {
      paths.push({language, id})
    }
  }
  return paths
}
