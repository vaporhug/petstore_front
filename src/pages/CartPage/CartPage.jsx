import React, {useEffect, useState} from 'react';
import { Container, Grid, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import Header from "../../components/Header/Header";
import {getCart, removeItemFromCart, updateItemQuantity} from "../../services/cartService";

const userId = 1;
const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        // 示例数据
        { id: 1, name: 'Chihuahua', price: 81, quantity: 2, imgUrl: 'http://localhost:9000/petstore-imgs/images/product/wild_bird/wild_bird_product1.jpg' },
        { id: 2, name: 'Persian Cat', price: 70, quantity: 1, imgUrl: 'http://localhost:9000/petstore-imgs/images/product/wild_bird/wild_bird_product1.jpg' }
    ]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await getCart(userId);
                console.log('Cart:', cart);
                setCartItems(cart.items);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart().catch(error => console.error(error));
    }, []);

    const handleQuantityChange = (id, quantity) => {
        let name = '';
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    name = item.name;
                    return { ...item, quantity: Math.max(1, quantity) };
                }
                return item;
            })
        );
        updateItemQuantity(1, name, quantity).catch(error => console.error(error));
    };

    const handleRemoveItem = id => {
        const itemToRemove = cartItems.find(item => item.id === id);
        let name = '';
        if (itemToRemove) {
            name = itemToRemove.name;
        }
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        removeItemFromCart(1, name).catch(error => console.error(error));
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleCheckout = () => {
        // 实现结算功能
        console.log('Proceed to checkout');
        navigate('/checkout');
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <Container className={styles.cartContainer}>
                <Typography variant="h4" className={styles.cartTitle}>Shopping Cart</Typography>
                <Grid container spacing={3}>
                    {cartItems.map(item => (
                        <Grid item xs={12} key={item.id} className={styles.cartItem}>
                            <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
                            <div className={styles.cartItemDetails}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body1">Price: ${item.price}</Typography>
                                <div className={styles.quantityControl}>
                                    <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                                    <Typography variant="body1">{item.quantity}</Typography>
                                    <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                                </div>
                                <Typography variant="body1">Total: ${item.price * item.quantity}</Typography>
                                <IconButton onClick={() => handleRemoveItem(item.id)}><DeleteIcon /></IconButton>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div className={styles.cartSummary}>
                    <Typography variant="h5">Total Price: ${totalPrice}</Typography>
                    <div className={styles.cartActions}>
                        <Button variant="contained" color="primary" onClick={handleContinueShopping}>Continue Shopping</Button>
                        <Button variant="contained" color="secondary" onClick={handleCheckout}>Checkout</Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CartPage;