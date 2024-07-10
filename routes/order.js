const router=require('express').Router();
const {getAllOrders,getOrderById,createOrder,deleteOrderById,approveOrder} = require('../controllers/order');

router.get('/',getAllOrders);

router.get('/:id',getOrderById);

router.post('/',createOrder);

router.patch('/:id',approveOrder);

router.delete('/:id',deleteOrderById);

module.exports=router;