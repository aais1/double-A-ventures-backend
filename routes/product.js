const router=require('express').Router();
const { newProductController, getProductsController, getProductController, updateProductController, deleteProductController , getProductByCategoryController } = require('../controllers/product')
const reviewRouter=require('./review')

router.post('/',newProductController);
router.get('/',getProductsController);
router.get('/:id',getProductController);
router.put('/:id',updateProductController);
router.delete('/:id',deleteProductController);
router.get('/type/:type', getProductByCategoryController);

//for reviews
router.use('/review',reviewRouter)


module.exports=router;