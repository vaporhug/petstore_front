// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import {addItemToCart} from "../../services/cartService";
import { useAuth0 } from "@auth0/auth0-react";


function ProductCard({ id,image, name, price, oldPrice, rating }) {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const handleDetailsClick = () => {
        console.log('Details clicked:', id)
        navigate(`/product/${id}`);
    };

    const handleAddToCartClick = async () => {
        if (!isAuthenticated)
            loginWithRedirect();
        // 这里可以实现加入购物车的逻辑
        console.log('Added to cart');
        const userId = 1;
        try {
             await addItemToCart(userId, {
                name: name,
                price: price,
                quantity: 1,
                imageUrl: image
            });
            alert('Item added to cart');
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }

        navigate('/cart');

    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={image} alt={name} className={styles.image} />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                {oldPrice && <div className={styles.oldPrice}>${oldPrice}</div>}
                <div className={styles.price}>${price}</div>
                <div className={styles.rating}>
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleDetailsClick}>商品详情</button>
                    <button className={styles.button} onClick={handleAddToCartClick}>加入购物车</button>
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    oldPrice: PropTypes.string,
    rating: PropTypes.number.isRequired,
};

export default ProductCard;
