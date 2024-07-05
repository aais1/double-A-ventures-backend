const express=require('express');
require('dotenv').config()
const cors=require('cors');
const mysql=require('mysql2')
const user=require('./routes/user')
const product=require('./routes/product')
const review=require('./routes/review')
const db=require('./db/db')

const app = express()

app.use(cors());
app.use(express.json())


app.use('/user',user)
app.use('/products',product)
  

app.listen(3000,()=>{
    console.log('up and running',3000)
})