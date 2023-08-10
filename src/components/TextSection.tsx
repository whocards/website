import type {TextSection as TextSectionType} from '~types/Sanity'
import {urlForImage} from '~utils/sanity'

interface Props {
  section: TextSectionType
}

const TextSection = ({section}: Props) => {
  const isLeft = section.imageLayout === 'left'
  const isRight = section.imageLayout === 'right'

  return (
    <section
      class='my-12 flex flex-col md:flex-row'
      classList={{
        'md:flex-row-reverse': isLeft,
        'flex-col-reverse': section.imageLayoutSmall === 'top',
      }}
    >
      <div class='-mt-2' classList={{'pl-4': isLeft, 'pr-4': isRight, 'md:w-1/2': !!section.image}}>
        <h3 class='text-2xl'>{section.title}</h3>
        {section.paragraphs.map((p) => (
          <p class='my-4'>{p}</p>
        ))}
      </div>
      {section.image && (
        <img src={urlForImage(section.image).url()} alt={section.image.alt} class='md:w-1/2' />
      )}
    </section>
  )
}

export default TextSection
