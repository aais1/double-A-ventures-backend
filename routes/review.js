const router=require('express').Router();
const {getReviews,postReview} = require('../controllers/review')

router.get('/:id',getReviews)

router.post('/:id',postReview)

module.exports=router
