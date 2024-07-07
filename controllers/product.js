const { connection } = require("../db/db");

const newProductController = async (req, res) => {
    // Extract the product data from the request body
    const { name, price, description, category, quantity, images } = req.body;

    try {
        // Insert product into the database
        const [productResult] = await connection.promise().query(
            `INSERT INTO products (name, price, description, categoryId, quantity) VALUES (?, ?, ?, ?, ?)`,
            [name, price, description, category, quantity]
        );

        const productId = productResult.insertId;

        // Upload images for the product
        await uploadImages(images, productId);

        res.status(201).json({ message: "Product created", productId });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

const uploadImages = async (images, productId) => {
    try {
        // Insert each image URL with the productId into images table
        const promises = images.map(async (image) => {
            await connection.promise().query(
                `INSERT INTO images (url, productId) VALUES (?, ?)`,
                [image, productId]
            );
        });

        // Wait for all image uploads to complete
        await Promise.all(promises);
    } catch (error) {
        console.error('Error uploading images:', error.message);
        throw error;
    }
};




// Get all products
const getProductsController = async (req, res) => {
    try {
        // Fetch all products with their associated image URLs aggregated into an array
        const [results] = await connection.promise().query(
            `SELECT p.*, GROUP_CONCAT(i.url) AS imageUrls
             FROM products p
             LEFT JOIN images i ON p.id = i.productId
             GROUP BY p.id`
        );

        // Format the result to replace imageUrls with an array of image URLs
        const formattedResults = results.map(product => ({
            ...product,
            images: product.imageUrls ? product.imageUrls.split(',') : []
        }));

        // Remove imageUrls field from each product object
        formattedResults.forEach(product => delete product.imageUrls);

        res.status(200).json(formattedResults);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};



// Get a single product by ID
const getProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const [results] = await connection.promise().query(
            `SELECT p.*, GROUP_CONCAT(i.url) AS imageUrls
             FROM products p
             LEFT JOIN images i ON p.id = i.productId
             WHERE p.id = ?
             GROUP BY p.id`,
            [productId]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Format the response to include an array of image URLs
        const product = {
            ...results[0],
            images: results[0].imageUrls ? results[0].imageUrls.split(',') : []
        };

        // Remove the imageUrls field from the product object
        delete product.imageUrls;

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Update a product by ID
const updateProductController = async(req, res) => {
    const productId = req.params.id;
    const { name, price, description } = req.body;

};

// Delete a product by ID
const deleteProductController = async (req, res) => {
    const productId = req.params.id;

    try {
        // Delete images associated with the product
        await deleteImages(productId);

        // Delete the product itself
        const [result] = await connection.promise().query(
            `DELETE FROM products WHERE id = ?`,
            [productId]
        );

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

const deleteImages = async (productId) => {
    try {
        // Delete all images associated with the product
        await connection.promise().query(
            `DELETE FROM images WHERE productId = ?`,
            [productId]
        );
    } catch (error) {
        console.error('Error deleting images:', error.message);
        throw error;
    }
};


module.exports = {
    newProductController,
    getProductsController,
    getProductController,
    updateProductController,
    deleteProductController,
};
