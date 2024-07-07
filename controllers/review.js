const {connection} = require('../db/db')

const postReview = async (req,res)=>{
  const {username,ReviewText,Rating,ProductId} = req.body;
  console.log(username,ReviewText,Rating,ProductId)

    try{
        const [result] = await connection.promise().query(
            `INSERT INTO review (ProductID, username, ReviewText, rating)
             VALUES (?, ?, ?, ?)`, 
            [ProductId, username, ReviewText, Rating]
        );
        res.json({message:"Review posted",result});
        
    }catch(e){
        res.json({error:e.message});
    }
}

const getReviews = async (req,res)=>{
    const id=req.params.id;
    console.log(id)
    try{
        const [result]=await connection.promise().query('SELECT * FROM review WHERE ProductId=?',[id]);
        console.log(result)
        res.json({result})
    }catch(e){
        res.json({error:e.message});
    }
}

module.exports={
    postReview,
    getReviews
}

