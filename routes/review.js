const router=require('express').Router();
const {getReviews,postReview} = require('../controllers/review')

router.get('/',getReviews)

router.post('/',postReview)

module.exports=router
