import React from 'react'
import DanhSachSanPham from './DanhSachSanPham'

export default function Home() {
  return (
    <div>
       <div>
  <header id="header" />
  <div className="slider">
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row">
            <div className="col-l">
              <div className="item">
                <img src="./img/image 4.png" alt />
              </div>
            </div>
            <div className="col-r">
              <div className="item">
                <h3>Product name</h3>
                <p>Product description...</p>
                <button>By Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="col-l">
              <div className="item">
                <img src="./img/detail.png" alt style={{width:553}}/>
              </div>
            </div>
            <div className="col-r">
              <div className="item">
                <h3>Product name</h3>
                <p>Product description...</p>
                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item row">
          <div className="row">
            <div className="col-l">
              <div className="item">
                <img src="./img/image 4.png" alt />
              </div>
            </div>
            <div className="col-r">
              <div className="item">
                <h3>Product name</h3>
                <p>Product description...</p>
                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>  
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span aria-hidden="true">
          <i className="fa-solid fa-caret-left" style={{fontSize: 80, color: '#cbc9c9', marginRight: 150}} />
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span aria-hidden="true">
          <i className="fa-solid fa-caret-right " style={{fontSize: 80, color: '#cbc9c9', marginLeft: 150}} />
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <h5 style={{position:'relative', bottom:-90,color: '#cbc9c9'}}>Product Feature</h5>
  </div>
  
  <section className="product-feature">
  <div className='css-h2'>
      <h2>Product Feature</h2>
      </div>
    <div className="container">
      <div className="row">
        <DanhSachSanPham/>
      </div>
    </div>
  </section>
  {/* FOOTER */}
  <footer id="footer" />
</div>

    </div>
  )
}
