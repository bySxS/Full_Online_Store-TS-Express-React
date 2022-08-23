import React, { FC, useState } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { ModalComponent } from '../UI/Modal/ModalComponent'
import style from './ProductImagesCarusel.module.scss'

interface IProductImagesCarousel {
  product: IProduct
  currImg?: string
  onModal?: boolean
  showAllImg?: boolean
}

const ProductImagesCarousel: FC<IProductImagesCarousel> = ({
  product,
  currImg,
  onModal,
  showAllImg = false
}) => {
  const [notFixImages] = useState<string[]>([
    (product.screen && product.screen),
    (product.image1 && product.image1),
    (product.image2 && product.image2),
    (product.image3 && product.image3),
    (product.image4 && product.image4),
    (product.image5 && product.image5),
    (product.image6 && product.image6),
    (product.image7 && product.image7),
    (product.image8 && product.image8),
    (product.image9 && product.image9),
    (product.image10 && product.image10)
  ])
  const [images, setImage] = useState<string[]>(notFixImages.filter(img => img !== ''))
  const [currImage, setCurrImage] = useState(currImg || images[0])
  const [openFullModal, setOpenFullModal] = useState(false)

  const checkCurrImage = (img: string) => {
    return img === currImage
  }

  const clickLeftImg = () => {
    const i = images.indexOf(currImage)
    if (i > 0) {
      setCurrImage(images[i - 1])
    } else {
      setCurrImage(images[images.length - 1])
      if (!showAllImg) {
        setImage(images.splice(-1).concat(images))
      }
    }
  }

  const clickRightImg = () => {
    const i = images.indexOf(currImage)
    if (i < images.length - 1) {
      setCurrImage(images[i + 1])
      if (i === 3 && !showAllImg) {
        setImage(images.splice(1).concat(images))
      }
    } else {
      setCurrImage(images[0])
    }
  }

  const clickChangeImage = (e: React.MouseEvent, i: number) => {
    setCurrImage(images[i])
  }

  return (
    <>
    <div className={style.block}>
      <div className={style.sectionTop}>
        {currImage &&
          <img
            onClick={() => setOpenFullModal(!openFullModal)}
            alt={product.title}
            src={currImage}
            className={style.generalScreen}
          />
        }
      </div>
      <div className={style.sectionBottom}>
        <div
          onClick={clickLeftImg}
          className={style.arrowDiv}
        >
          <i className={`bi bi-chevron-left ${style.arrowImg}`} />
        </div>
        {images
          .filter((img, i) => i < (!showAllImg ? 4 : 11))
          .map((img, i) =>
          <div
            className={style.screenSmallDiv}
            style={checkCurrImage(img)
              ? { border: '1px solid #9999ff' }
              : {}}
            itemProp={img}
            key={i}
            onClick={(event) => clickChangeImage(event, i)}
          >
            <img
              alt={product.title + ' изображение ' + (i + 1)}
              src={img}
              className={style.screenSmall}
            />
          </div>
          )}
        <div
          className={style.arrowDiv}
          onClick={clickRightImg}
        >
        <i className={`bi bi-chevron-right ${style.arrowImg}`} />
        </div>
      </div>
    </div>
    {openFullModal && !onModal &&
      <ModalComponent
        show={openFullModal}
        title={`Изображения - ${product.title}`}
        onClose={() => setOpenFullModal(!openFullModal)}
        className={'w-full h-full'}
        size={'xl'}
        fullscreen={true}
      >
        <ProductImagesCarousel
          product={product}
          currImg={currImage}
          onModal={true}
          showAllImg={true}
        />
      </ModalComponent>
    }</>
  )
}

export default ProductImagesCarousel
