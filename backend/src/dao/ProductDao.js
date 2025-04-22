const { Product } = require("../models");

class ProductDao {
    async createProduct(product) {
        try {
            const newProduct = await Product.create(product);
            return await this.getProductById(newProduct.id);
        } catch (error) {
            throw new Error(`Unable to create product: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Unable to retrieve product: ${error.message}`);
        }
    }

    async getProductByName(name) {
        try {
            const product = await Product.findOne({ where: { name } });
            if (!product) {
                return null;
            }
            return product;
        } catch (error) {
            return null;
        }
    }

    async getAllProducts() {
        try {
            const products = await Product.findAll();
            return products;
        } catch (error) {
            throw new Error(`Unable to retrieve products: ${error.message}`);
        }
    }

    async updateProduct(productId, product) {
        try {
            const [updated] = await Product.update(product, {
                where: { id: productId }
            });
            if (!updated) {
                throw new Error('Product not found');
            }
            return await this.getProductById(productId);
        } catch (error) {
            throw new Error(`Unable to update product: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const deleted = await Product.destroy({
                where: { id: productId }
            });
            if (!deleted) {
                throw new Error('Product not found');
            }
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete product: ${error.message}`);
        }
    }

    async deleteMultipleProducts(productIds) {
        try {
            const deletedCount = await Product.destroy({
                where: { id: productIds }
            });
            if (deletedCount === 0) {
                throw new Error('No products found to delete');
            }
            return deletedCount;
        } catch (error) {
            throw new Error(`Unable to delete products: ${error.message}`);
        }
    }
}

module.exports = new ProductDao();
