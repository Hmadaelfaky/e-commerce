import React, { useContext } from 'react'
import logo from '../../assests/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../UserContext'
import Login from '../Home/Login/Login'
import { getCart, useCart } from '../../useCart'
export default function Navbar() {

  let { user, setIsUser, setOpen, login } = useContext(userContext)
  let { data } = useCart('getCart', getCart)
  //console.log(user);
  let navigate = useNavigate()

  function LogOut() {
    setIsUser(null)
    localStorage.removeItem('userToken')
    navigate('/')
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
      >
        <div className="container">
          <Link className="navbar-brand" to='home'>
            <img src={logo} alt='cart logo'></img>
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {user ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to='home'
                >Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='products'
                >Products</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='categories'
                >Categories</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='brands'
                >Brands</Link>
              </li>


            </ul> : ''}


            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to=''>
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to=''>
                  <i className='fa-brands fa-facebook'></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to=''>
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to=''>
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to=''>
                  <i className="fa-brands fa-linkedin"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to=''>
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>

              {!user ? <>

                <li className="nav-item">
                  <Link className="nav-link" to='/'
                  >Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to='register'>Register</Link>
                </li>

              </> :


                <li className="nav-item">
                  <a className='nav-link cursor-pointer' onClick={LogOut}>Logout</a>
                </li>

              }

              {/* data-bs-toggle={!user ? 'modal' : ''} data-bs-target="#exampleModal"  */}

              <li className="nav-item position-relative" data-bs-toggle={!user ? 'modal' : ''} data-bs-target="#exampleModal" onClick={() => { setOpen(true) }}>
                <Link className="nav-link" to="cart"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <span className='d-inline-block cart d-flex justify-content-center align-items-center position-absolute  rounded-circle '>{data?.data?.numOfCartItems}</span>
              </li>

              {user ? <li className="nav-item profile">
                <span className='nav-link ms-5 d-flex' >
                  {/* {login} */}
                  <span className='fw-bolder '>Hi<br /></span><span className='mx-1'>{login}</span>
                </span>
              </li>
                : ''}



            </ul>

          </div>
        </div>
      </nav >



      {/* <button type="button" class="btn btn-primary" >
        Launch demo modal
      </button> */}


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-body">
              <p>Please Login First...</p>
            </div>

          </div>
        </div>
      </div>




    </>

  )
}
