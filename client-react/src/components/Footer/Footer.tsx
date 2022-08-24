import React from 'react'
import style from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={style.footerBg}>
      <div className={style.footer}>
      <div className={style.blockInfo}>
        <div className={'font-bold text-lg'}>Our services</div>
        <div>Product reviews</div>
        <div>Reviews of stores</div>
      </div>
      <div className={style.blockInfo}>
        <div className={'font-bold text-lg'}>To users</div>
        <div>FAQ for users</div>
        <div>About the project</div>
      </div>
      <div className={style.blockInfo}>
        <div className={'font-bold text-lg'}>Feedback</div>
        <div>For users</div>
        <div>For online stores</div>
      </div>
      <div className={style.blockInfo}>
        <div className={'font-bold text-lg'}>Social media</div>
        <div>
          <i className="bi bi-facebook text-blue-600 text-2xl hover:opacity-80"/>
          <i className="bi bi-instagram text-orange-500 text-2xl px-3 hover:opacity-80"/>
          <i className="bi bi-youtube text-red-600 text-2xl hover:opacity-80"/>
        </div>
      </div>
      <div className={style.blockInfo}>
        <div>Site by SxS</div>
        <div>Online Store</div>
        <div>Best Products 2022</div>
      </div>
      <div className={style.blockInfo}>
        <div className={'font-bold text-lg'}>
          <i className="bi bi-shop text-4xl"/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer
