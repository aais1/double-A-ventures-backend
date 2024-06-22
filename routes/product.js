const router=require('express').Router();
const { newProductController, getProductsController, getProductController, updateProductController, deleteProductController } = require('../controllers/product')

router.post('/',newProductController);
router.get('/',getProductsController);
router.get('/:id',getProductController);
router.put('/:id',updateProductController);
router.delete('/:id',deleteProductController);


module.exports=router;