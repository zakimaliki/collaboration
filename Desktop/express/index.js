const express = require('express');

const app = express();

// res.status(200) // Ok
// res.status(201) // Created
// res.status(404) // Not found

let products = [
    {
        id: 1,
        name : "baju",
        price : 100000,
        stock : 2
    },
    {
        id: 2,
        name : "kemeja",
        price : 200000,
        stock : 10
    }
]


app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

app.get('/products',(req,res)=>{
    console.log(res.status)
    res.json(products)
})

app.get('/products/:id',(req,res)=>{
    const id = Number(req.params.id)
    const product = products.find(product => product.id === id)
    if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})

app.post('/products',(req,res)=>{
    const {name,price,stock} = req.body
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        stock
    }
    products.push(newProduct)
    res.status(201).json('Product created')
})

app.put('/products/:id',(req,res)=>{
    const id = Number(req.params.id)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).send('Product not found')
    }
    const {name,price,stock} = req.body
    const updatedProduct = {
        id: products[index].id,
        name,
        price,
        stock
    }
    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

app.delete('/products/:id',(req,res)=>{
    const id = Number(req.params.id)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).send('Product not found')
    }    
    // method splice untuk menghapus array yang parameter pertama lokasi index parameter kedua untuk menetukan jumlah yg dihapus
    products.splice(index,1)
    res.status(200).json('Product deleted')
})


app.listen(8080 , () => { 
    console.log("server running on http://localhost:8080");
})

