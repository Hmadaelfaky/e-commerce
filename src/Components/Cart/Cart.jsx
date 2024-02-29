import React, { useContext, useState } from 'react'
import { userContext } from '../../UserContext'
import { CheckOut, deleteCart, getCart, updateCart, useCart, useCartCrud } from '../../useCart'
import Loading from '../Loading'
import emptyimg from '../../assests/preview.png'

export default function Cart() {

 
  let [details,setDetails] = useState('')
  let [phone,setPhone] = useState('')
  let [city,setCity] = useState('')


  let { isOpen, setOpen } = useContext(userContext)
  let { data, isLoading, isError, error } = useCart('getCart', getCart)
  // console.log(data?.data);
  let { mutate, data: deleteddata } = useCartCrud(deleteCart)
  let { mutate: mutateupdate, data: updatedata } = useCartCrud(updateCart)
  let { mutate: mutateonline, data: dataonline } = useCartCrud(CheckOut)
  


  function addAdds(e)
  {
    e.preventDefault()
    let shippingAddress = {
      details,phone,city
    }
    mutateonline({id:data?.data?.data?._id,shippingAddress})
    console.log(dataonline);

    if(dataonline?.data?.status == 'success')
    window.location.href = dataonline?.data?.session?.url;
    // console.log(data?.data?.data?._id);
    // console.log(shippingAddress);
  }

  // console.log(deleteCart);

  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return <div className='text-center my-4'>
      {/* {error.message} */}
      <h4>Cart is Empty</h4>
      <img src={emptyimg} height={400} alt="" />
      </div>
     //right cart-text
  return (
    <div className={data?.data?.numOfCartItems? 'main-color':'#fff'}  style={isOpen ? { right: 0, transition: 'right 1s' } : { right: '-100%', transition: 'right 1s' }}>
      <i className='fa-solid fa-close p-3 fa-2x cursor-pointer' onClick={() => { setOpen(false) }}></i>

      <div className='container'>

        {data?.data.numOfCartItems ? <>
          <h3 className='text-main'>Number of Cart items :{data?.data.numOfCartItems}</h3>
          <p>Total cart Price:<span className='fw-bolder mx-3'>{data?.data?.data?.totalCartPrice}</span></p>
          {/* {data?.data?.data?.products.map((prod) => <div className='row gy-2 align-items-center' key={prod.product._id}> */}
          {data?.data?.data?.products.map((ele) => <div className='row gy-2 align-items-center' key={ele.product._id}>
            <div className="col-md-8">

              <div className="row gy-3 align-items-center">

                <div className="col-md-2">
                  {/* <img src={prod.product.imageCover} className='w-100 my-3' alt="" /> */}
                  <img src={ele.product.imageCover} className='w-100 my-3' alt="" />
                </div>

                <div className="col-md-10">
                  {/* <p>{prod.product.title}</p> */}
                  <p>{ele.product.title}</p>
                  {/* <p className='text-main'>Price: {prod.price}EGP</p> */}
                  <p className='text-main'>Price: {ele.price}EGP</p>
                  {/* <p className='cursor-pointer' onClick={()=>{mutate(prod._id)}}><i className='fa-solid fa-trash-can text-main cursor-pointer'></i> Remove</p> */}
                  <p className='cursor-pointer' onClick={() => { mutate(ele.product._id) }}><i className='fa-solid fa-trash-can text-main cursor-pointer'></i> Remove</p>

                </div>

              </div>

            </div>
            <div className="col-md-4 d-flex justify-content-end">

              <div>
                <button className='btn btn-border p-2' onClick={() => mutateupdate({ id: ele.product._id, count: ele.count + 1 })}>+</button>
                {/* <button className='btn btn-border p-2' >+</button> */}
                {/* <span className='mx-2'>{prod.count}</span> */}
                <span className='mx-2'>{ele.count}</span>
                <button className='btn btn-border p-2' onClick={() => ele.count==1?mutate(ele.product._id):mutateupdate({ id: ele.product._id, count:(ele.count)>0? ele.count - 1 : ele.count })}>-</button>
              </div>


            </div>

          </div>)}

          <button className='btn btn-success' data-bs-toggle="modal"
            data-bs-target="#modalId">CheckOut</button>

          {/* model */}

          <div
            class="modal fade"
            id="modalId"
            tabindex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"

            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalTitleId">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <input type="text" onChange={(e)=>{setDetails(e.target.value)}} className='form-control' placeholder='details' />
                    <input type="text" onChange={(e)=>{setPhone(e.target.value)}} className='form-control' placeholder='phone' />
                    <input type="text" onChange={(e)=>{setCity(e.target.value)}} className='form-control' placeholder='city' />
                    <button className='btn btn-danger mt-2' type='submit' onClick={addAdds}>Add Address</button>
                    
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>

        </>

          : <div className='my-4 text-center'>
            <h3 className='text-main mb-1'>Cart is Empty</h3>
              <img src={emptyimg} alt="" />
          </div>}
      </div>

    </div>
  )
}










