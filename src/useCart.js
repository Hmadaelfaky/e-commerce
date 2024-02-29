import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

let baseURL = 'https://ecommerce.routemisr.com/api/v1'
let token = localStorage.getItem('userToken')

//Add to cart
export function addToCart(productId) {
    return axios.post(`${baseURL}/cart`, { productId }, {
        headers: {
            token
        }
    })
}

//Get from Cart
export function getCart() {
    return axios.get(`${baseURL}/cart`, {
        headers: {
            token
        }
    })
}

//Delete from Cart

export function deleteCart(productId) {
    return axios.delete(`${baseURL}/cart/${productId}`, {
        headers: {
            token
        }
    })
}

//Update Cart
export function updateCart({ id, count }) {
    return axios.put(`${baseURL}/cart/${id}`, { count }, {
        headers: {
            token
        }
    })
}

//CheckOut
export function CheckOut({ id, shippingAddress }) {
    return axios.post(`${baseURL}/orders/checkout-session/${id}?url=http://localhost:3000`, { shippingAddress }, {
        headers: {
            token
        }
    })
}


export function useCartCrud(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: (data) => {
            toast.success(data?.data?.message)
            queryClient.invalidateQueries('getCart')
        },
        onError: (data) => {
            toast.error(data?.message)
        }
    })

}

export function useCart(key, fn) {
    return useQuery(key, fn)
}