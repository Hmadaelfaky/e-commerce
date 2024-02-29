import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Loading'
import { useQuery } from 'react-query'
import { featuredProduct, useProducts } from '../../../useProducts'
import Product from '../../Product'
import { Helmet } from 'react-helmet'

export default function Products() {

  // let [products, setProducts] = useState([])
  // let [loading, setLoading] = useState(false)
  // let [err, setErr] = useState('')



  // function featuredProduct() {
  //   // try {
  //   //   setLoading(true)
  //   //   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   //   console.log(data.data);
  //   //   setProducts(data.data)
  //   //   setLoading(false)
  //   //   setErr('');

  //   // } catch (error) {
  //   //   setErr(error.message);
  //   //   setLoading(false)
  //   // }

  //  return axios.get('https://ecommerce.routemisr.com/api/v1/products')

  // }

  // useEffect(() => {
  //   featuredProduct()
  // }, [])

  // By useQuery it takes (key{'products'},nameFunction{featuredProduct})!!

  // cacheTime:10*(60*1000),
  // refetchOnWindowFocus:false,
  // staleTime:20000

  //console.log(data?.data?.data);

  // console.log('isloading',isLoading);
  // console.log('isfetching',isFetching);
  let[heart,setHeart] = useState(false)
  let { data, isLoading, isFetching, error, isError } = useProducts('product', featuredProduct)

  let [searchArr, setSearchArr] = useState([])

  function search(e) {
    let term = e.target.value
    let newArr = data?.filter((ele) => ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim()))
    setSearchArr(newArr)
  }


  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return <h2>{error.message}</h2>

  return (
    <div className='container'>
      <Helmet>
        <title>Products Component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className='w-75 mx-auto bg-secondary main-color p-5 my-3' onChange={search}>
        <input type="text" className='form-control' />
      </div>


      <div className='row gy-4'>
        {/* {loading ? <Loading></Loading> : err ? <h2>{err}</h2> : products.map(prod => <Product key={prod._id} prod={prod}> </Product>)} */}

        {/* {data?.map((prod)=><Product key={prod._id} prod={prod}></Product>)} */}

        {
          searchArr.length ? searchArr?.map((prod) =><Product key={prod._id} prod={prod}></Product>): data?.map((prod)=><Product key={prod._id} prod={prod}></Product>)
         }

      </div>
    </div>
  )
}


