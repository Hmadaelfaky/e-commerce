import axios from 'axios'
import { useFormik, yupToFormErrors } from 'formik'
import React, { useContext, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userContext } from '../../../UserContext'


export default function Login() {
 // let {user} = useContext(userContext)
 //
 let {setIsUser,setLogin} = useContext(userContext)

  const navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')

  async function getLogin(values) {
    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      if (data.message === 'success') {
        setIsUser(data.token)
        setLogin(data.user.name)
        localStorage.setItem('userToken',data.token)
        localStorage.setLogin('userName',data.user.name)
        navigate('/home')
        setMsg('');
        setLoading(false)
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false)
    }
  }

  // function validate(values)
  // {
  //   let errors = {}
  //   if(!values.name)
  //   errors.name = 'name is required';
  //  else if(values.name.length<2)
  //  errors.name = 'name is too short min is 3'
  //  else if(values.name.length>8)
  //  errors.name = 'name is too long max is 10 '
  // if(!values.email)
  // errors.email = 'email is required'

  // return errors;

  // }

  const validationSchema = Yup.object({

    email: Yup.string().required('email is required').email('email is valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password not vaild'),

  })

  let formik = useFormik({
    initialValues: {

      email: "",
      password: "",

    },
    validationSchema,
    onSubmit: getLogin
  })

  // console.log(formik);



  return (
    <div className=''>
      <h4>Login Now:</h4>
      <form className='w-75 mx-auto my-4' onSubmit={formik.handleSubmit}>
        {msg ? <p className='alert alert-danger'>{msg}</p> : ''}


        <label htmlFor='email' >email:</label>
        <input type='email' className='form-control mb-3' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}

        <label htmlFor='password' >password:</label>
        <input type='password' className='form-control mb-3' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}



        <button disabled={!(formik.isValid && formik.dirty)} className='btn green-color text-white d-block ms-auto' type='submit'>{loading ? <Bars
          height="30"
          width="40"
          color="#fff"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> : 'Login'}</button>

      </form>
    </div>
  )
}
