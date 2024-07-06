const router=require('express').Router();
const {getAllOrders,getOrderById,createOrder,deleteOrderById} = require('../controllers/order');

router.get('/',getAllOrders);

router.get('/:id',getOrderById);

router.post('/',createOrder);

router.delete('/:id',deleteOrderById);

module.exports=router;