# arlindd-use-fetch

> all fetches in one hook

[![NPM](https://img.shields.io/npm/v/arlindd-use-fetch.svg)](https://www.npmjs.com/package/arlindd-use-fetch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save arlindd-use-fetch
```

## Usage

```jsx
import React,{useState,useEffect}  from 'react'

import { useFetch } from 'arlindd-use-fetch'

const App = () => {
  const [fetchHook, loading,error] = useFetch();

  const [products,setProducts] = useState()
  const [title,setTitle] = useState("Product1")
  const [price,setPrice] = useState(20)

  useEffect(async () => {
    const response = await fetchHook({url: "http://localhost:5000/products"})
    setProducts(response)
  },[])

  const deleteProduct = async (id) => {
    const response = await fetchHook({url: `http://localhost:5000/products/${id}`,method: "DELETE"})
    console.log(response)
  }

  const submit = async () => {
    const body = JSON.stringify({title: title,price: price})
    const response = await fetchHook({url: `http://localhost:5000/products`,method: "POST",
                                      headers: {'Content-Type': 'application/json'},body: body})
    console.log(response)
  }

  if(loading){
    return <p>loading...</p>
  }

  return (
    <div>
        {products?.map(product => (
          <div key={product.id} onClick={() => deleteProduct(product.id)}>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </div>
        ))}
        <div>
          <input value={title} placeholder="title" type="text"/>
          <input value={price} placeholder="price" type="text"/>
          <button onClick={submit}>Submit</button>
        </div>
    </div>
  )
}
```

## Guide

const [fetchHook, loading,error] = useFetch()

**error** is set if an error was catched by the request.
**loading** is true until the request is done.
**fetchHook** will made requests to the server.

await fetchHook({url,method,headers,body})

**url** is the path of the request you want to do.

**method** by default is GET,but you can change it whatever you want for example to POST,PUT,DELETE,PATCH

**headers** you can put the headers you want for the request for example Authorization etc.

**body** you can put body when you need to POST,PUT or PATCH

## Example

**GET** request
> await fetchHook({url: "http://localhost:5000/products"})

**DELETE** request
> await fetchHook({url: `http://localhost:5000/products/${id}`,method: "DELETE"})

**POST** request
> await fetchHook({url: `http://localhost:5000/products`,method: "POST",headers: {'Content-Type': 'application/json'},body: body})

**PUT** request
> await fetchHook({url: `http://localhost:5000/products`,method: "PUT",headers: {'Content-Type': 'application/json'},body: body})

**PATCH** request
> await fetchHook({url: `http://localhost:5000/products`,method: "PATCH",headers: {'Content-Type': 'application/json'},body: body})

## License

MIT © [arlindd](https://github.com/arlindd)
