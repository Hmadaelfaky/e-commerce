import React from 'react'
import Child from './Child'

export default function Parent() {

    const counter = 30
  return (
    <div>Parent

        <Child data = {counter}></Child>
    </div>
  )
}
