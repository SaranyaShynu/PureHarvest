const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()

const app=express()

app.use(cors())
app.use(express.json())

const Product = require('./models/Product'); // Import the model

// Route to Add a Product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).json({ error: "Failed to save harvest" })
  }
})

// Route to Get all Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

// Route to Delete a Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Harvest item removed" })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" })
  }
})

mongoose.connect(process.env.MONGODB_URL)
  .then(()=>console.log("Database Connected"))
  .catch(err=>console.error("DB Connection Error:",err))

app.get('/',(req,res)=>res.send("PureHarvest API is Live!"))

const PORT=process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))