// src/services/productService.js
import { API_PREFIX } from '../config';

const NEWEST_PRODUCT_URL = `${API_PREFIX}/api/products/newest`;
const PRODUCT_BY_CATEGORY_URL = `${API_PREFIX}/api/products?category=`;

const getNewestProduct = () => {
    return fetch(NEWEST_PRODUCT_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data);
};

const getProductByCategory = (category) => {
    console.log(`${PRODUCT_BY_CATEGORY_URL}${category}`)
    return fetch(`${PRODUCT_BY_CATEGORY_URL}${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data);
};

const getProductById = (productId) => {
    return fetch(`${API_PREFIX}/api/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data);
};
export default {
    getNewestProduct,getProductByCategory,getProductById
};
