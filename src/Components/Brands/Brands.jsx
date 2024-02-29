// import React, { useContext } from 'react'
// import { counterContext } from '../../CounterContext'

// export default function Brands() {

//   let {counter,setCounter} = useContext(counterContext)

//   return (
//     <div>Brands
//          <h2>counter:{counter}</h2>
//       <button className='btn btn-danger' onClick={()=>{setCounter(counter+1)}}>+</button>
//     </div>
//   )
// }

import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function Brands() {


  function getBrands()
  {
   return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let {data,refetch} = useQuery('brands',getBrands,{
    select:(data)=>data?.data?.data,
    enabled:false
  })
  
  return (
    <div className='container'>
     <div className='row'>
       <h2 className='cursor-pointer text-main text-center my-2' onClick={()=>refetch()}>All Brands</h2>
       {data?.map((ele)=><div className='col-md-3' key={ele._id}>
         <div className='item'>
           <img src={ele.image} alt="" />
           <p>{ele.title}</p>
         </div>
       </div>)}
     </div>
    </div>
  )
}

