import {openCollectiveProducts} from '~constants/products'

export const PreOrderCards = () => {
  return (
    <div class='flex w-full justify-center gap-10'>
      {openCollectiveProducts.map((product) => (
        <div class='card glass w-96'>
          <div class='card-body'>
            <div class='card-title text-4xl'>{product.title}</div>
            <p class='mb-10'>{product.description}</p>
            <div class='card-actions justify-center'>
              <a href={product.url} class='btn btn-primary' target='_blank'>
                Order
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
