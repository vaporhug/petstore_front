// src/config.js
import { API_PREFIX } from '../config';

const API_URL = `${API_PREFIX}/api/categories`;

const getAllCategories = () => {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data);
};

export default {
    getAllCategories,
};
