import { API_PREFIX } from '../config';
const API_URL = `${API_PREFIX}/api/cart`;

export const getCart = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        console.log('url:', `${API_URL}/${userId}`);
        if (!response.ok) {
            throw new Error('Error fetching cart');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const addItemToCart = async (userId, item) => {
    try {
        const response = await fetch(`${API_URL}/${userId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        console.log(JSON.stringify(item))
        console.log('response:', response);
        if (!response.ok) {
            throw new Error('Error adding item to cart');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
};

export const clearCart = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}/clear`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Error clearing cart');
        }
        return await response.json();
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

export const removeItemFromCart = async (userId, itemId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}/remove/${itemId}`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Error removing item from cart');
        }
        return await response.json();
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
}

export const updateItemQuantity = async (userId, itemId, quantity) => {
    quantity = parseInt(quantity)
    console.log('quantity: ',JSON.stringify({ quantity }))
    try {
        const response = await fetch(`${API_URL}/${userId}/update/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });
        if (!response.ok) {
            throw new Error('Error updating item quantity');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating item quantity:', error);
        throw error;
    }
}