const ProductDao = require("../dao/ProductDao");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductDao.getAllProducts();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await ProductDao.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = await ProductDao.createProduct(req.body);
        res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid data',
        });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await ProductDao.updateProduct(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid data',
        });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await ProductDao.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Delete multiple products by IDs
const deleteMultipleProducts = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of product IDs in the request body
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or empty IDs array',
            });
        }
        const result = await ProductDao.deleteMultipleProducts(ids);
        res.status(200).json({
            success: true,
            message: `${result} products deleted successfully`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
};