import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
export default function DanhSachSanPham() {

    const [arrProduct, setArrProduct] = useState([]);
    const getApi = () => {
        const promise = axios({
            url: 'https://shop.cyberlearn.vn/api/Product',
            method: 'GET',
        })
        promise.then(res => {
            console.log(res.data.content);
            setArrProduct(res.data.content)
        })
        promise.catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getApi();
    }, [])

    const renderProduct = () => {
        return arrProduct.map((pro, index) => {
            return <div className="col-4 my-4" key={index}>
                <div className="card">
                    <img src={pro.image} alt="..." />
                    <div className="card-body">
                        <h3>{pro.name}</h3>
                        <p>{pro.description}</p>
                        <button className='btn '>
                        <a href="../page/detail.html?Productid=${pro.id}" >Buy now</a>
                        <span >${pro.price}$</span>
                        </button >
                        {/* <NavLink to={`/detail/${item.id}`} className='btn btn-dark'>Add to card
              <i className='fa fa-cart-plus'></i></NavLink> */}
                    </div>
                </div>
            </div>
        })
    }
    return (
        <Fragment >
            {renderProduct()}
        </Fragment>
    )
}
