import React from 'react'
import { useParams } from 'react-router-dom'
import { featuredSingleProduct, useProducts } from '../useProducts'
import Loading from './Loading'
import { addToCart, useCartCrud } from '../useCart'
import Slider from 'react-slick'

export default function ProductDetails() {

    let {id} = useParams()
    // console.log(id);
    let {isLoading,isError,error,data} = useProducts('productdetails',()=>featuredSingleProduct(id))

    let {mutate} = useCartCrud(addToCart)
    // console.log(data);

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
        autoplaySpeed:2000
  };

    if(isLoading)
    return <Loading></Loading>

    if(isError)
    return <h2>{error.message}</h2>

  return (
    <div className='row align-items-center mb-4'>
      <div className="col-md-4">
       {/* <img src={data?.imageCover} className='w-100' alt="" /> */}
       <Slider {...settings}>
        {data?.images?.map((img)=><img key={img} src={img}></img>)}
       </Slider>
      </div>
      <div className="col-md-8">
        <h2>{data?.title}</h2>
        <p>{data?.description}</p>
      
          <span className='text-main'>{data?.category?.name}</span>

          <div className="box d-flex justify-content-between">
                <span>{data?.price} EGP</span>
                <span>{data?.ratingsAverage} <i className='fa-solid fa-star rating-color'></i> </span>
            </div>
                <button className='btn btn-success form-control my-4' onClick={()=>{mutate(data?._id)}}>Ad to Cart</button>
        
      </div>
    </div>
  )
}

