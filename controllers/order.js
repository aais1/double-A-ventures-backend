const {db} = require('../db/db')

const getAllOrders=async(req,res)=>{
    res.json({data:'all orders'})
}

const getOrderById=async(req,res)=>{
    let orderId=req.params.id;
    res.json({data:'order :'+orderId})
}    

const createOrder=async(req,res)=>{
    let cartItems=req.body;
    console.log(cartItems)
}

const deleteOrderById=async(req,res)=>{
    res.json({data:'delete'+req.params.id})
}

module.exports={
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrderById
}