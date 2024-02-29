import React, { useContext } from 'react'
import { counterContext } from '../../CounterContext'
import Loading from '../Loading'
import { featuredProduct, useProducts } from '../../useProducts'
import Product from '../Product'
import MainSlider from '../../MainSlider'
import CategorySlider from '../../CategorySlider';
import { Helmet } from 'react-helmet'

export default function Home() {

  let { data, isLoading, isFetching, error, isError } = useProducts('product', featuredProduct)

  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return <h2>{error.message}</h2>

  return (
    <div className='container'>

      <Helmet>
        <title>Home Component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <div className='row gy-4 mt-3'>
        {/* {loading ? <Loading></Loading> : err ? <h2>{err}</h2> : products.map(prod => <Product key={prod._id} prod={prod}> </Product>)} */}

        {data?.map((prod) => <Product key={prod._id} prod={prod}></Product>)}

      </div>

    </div>
  )

}


