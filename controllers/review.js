const {connection} = require('../db/db')

const postReview = async (req,res)=>{
  const {username,ReviewText,Rating,ProductId} = req.body;
  console.log(username,ReviewText,Rating,ProductId)

    try{
        const [data] = await connection.promise().query(
            `INSERT INTO review (ProductID, username, ReviewText, rating)
             VALUES (?, ?, ?, ?)`, 
            [ProductId, username, ReviewText, Rating]
        );
        res.json({message:"Review posted"});
        
    }catch(e){
        res.json({error:e.message});
    }
}

const getReviews = async (req,res)=>{
    const {id}=req.body;
    try{
        const [review]=await connection.promise().query('SELECT * FROM review WHERE ProductId=?',[product[0].reviewId]);
        res.json({review})
    }catch(e){
        res.json({error:e.message});
    }
}

module.exports={
    postReview,
    getReviews
}

