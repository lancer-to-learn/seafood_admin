const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, deleteMultipleProducts } = require("../controllers/productController");

const router = express.Router();

// Define routes
router.get('/getAll', getAllProducts);
router.get('/get/:id', getProductById);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.post('/deleteMultiple', deleteMultipleProducts);

module.exports = router;