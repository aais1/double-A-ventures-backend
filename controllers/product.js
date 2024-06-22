const { connection } = require("../db/db");

const newProductController = async (req, res) => {
    // Extract the product data from the request body
    const { name, price, description, category, quantity, image } = req.body;

    console.log(req.body)

    try {
        const [results] = await connection.promise()
            .query(`INSERT INTO products (name, price, description, categoryId, quantity, image) VALUES (?, ?, ?, ?, ?, ?)`,
                [name, price, description, category, quantity, image]
            );

        res.status(201).json({ message: "Product created", productId: results.insertId });
    } catch (error) {
        console.error('Error creating product:', error.message); // Log the error for debugging
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};


// Get all products
const getProductsController = async(req, res) => {
    try {
    const [results] = await connection.promise()
    .query(`Select * From products `
    );
    res.status(200).json(results[0]);
    } catch (error) {
        res.json({message:error.message})
    }
};


// Get a single product by ID
const getProductController = async(req, res) => {
    try {
        const productId = req.params.id;
        const [results] = await connection.promise()
        .query(`Select * From products Where id = ?`, [productId]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.json({message:error.message})
    }

};

// Update a product by ID
const updateProductController = async(req, res) => {
    const productId = req.params.id;
    const { name, price, description } = req.body;

};

// Delete a product by ID
const deleteProductController = (req, res) => {
    const productId = req.params.id;
    try{
    const [result]=connection.promise()
    query(`Delete From products Where id = ?`, [productId]);
    res.status(200).json({message: "Product deleted"});
    }catch(error){
        res.json({message:error.message})
    }
    
};

module.exports = {
    newProductController,
    getProductsController,
    getProductController,
    updateProductController,
    deleteProductController,
};
