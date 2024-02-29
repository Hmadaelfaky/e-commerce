import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart, useCartCrud } from '../useCart'

export default function Product({ prod }) {

    //  export function Product({ prod }) {
    // console.log(prod);
    let[heart,setHeart] = useState(false)
    let {data,error,isError,isLoading,mutate} = useCartCrud(addToCart)

    // console.log(data?.data?.message)

    return <div className='col-md-2'>
        <div className="product cursor-pointer p-2">
            <i class="fa-solid fa-heart fa-1x m-2" style={ heart?{color:'green'}:{color:'unset'}} onClick={()=>setHeart(!heart)}></i>
            <Link to={`/productDetails/${prod._id}`}>
            <img src={prod.imageCover} className='w-100' alt={prod.title} />
            <h2 className='h5 main-color'>{prod.category.name}</h2>
            <p>{prod.title}</p>
            <div className="box d-flex justify-content-between">
                <span>{prod.price} EGP</span>
                <span>{prod.ratingsAverage} <i className='fa-solid fa-star rating-color'></i> </span>
            </div>
            
            </Link>
            <button className='btn btn-border my-2' onClick={()=>{mutate(prod._id)}}>Add to Cart</button>

        </div>
    </div>

}
