import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from "../../services/productService";
import styles from './ProductDetailPage.module.scss';
import Header from "../../components/Header/Header";
import {addItemToCart} from "../../services/cartService";
import  {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // 初始化数量为 1
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await productService.getProductById(productId);
            setProduct(data);
        };
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const handleAddToCart = async () => {
        if (!isAuthenticated)
            loginWithRedirect();
        const userId = 1;
        try {
            console.log(product);
            await addItemToCart(userId, {
                name: product.name,
                price: product.price,
                quantity: quantity,
                imageUrl: product.imgUrl
            });
            alert('Item added to cart');
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
        navigate('/cart');
    };
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1); // 确保数量至少为 1
    };

    return (
        <>
            <Header/>
            <div className={styles.productDetailContainer}>
                <div className={styles.imageContainer}>
                    <img src={product.imgUrl} alt={product.name} className={styles.productImage}/>
                </div>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productPrice}>${product.price}</p>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productStock}>{5 > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    <div className={styles.quantityContainer}>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                        {/*<input type="number" id="quantity" name="quantity" min="1" max={100}*/}
                        {/*       defaultValue="1"/>*/}
                    </div>
                    <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
                    <div className={styles.reviews}>
                        <h2>Customer Reviews</h2>
                        {/* 模拟的一些评论数据 */}
                        <div className={styles.review}>
                            <p><strong>John Doe:</strong> Great product! Highly recommend.</p>
                            <p>Rating: ★★★★★</p>
                        </div>
                        <div className={styles.review}>
                            <p><strong>Jane Smith:</strong> Very satisfied with the quality.</p>
                            <p>Rating: ★★★★☆</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProductDetailPage;
