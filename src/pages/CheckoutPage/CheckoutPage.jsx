import React, {useEffect, useState} from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import styles from './CheckoutPage.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import {clearCart, getCart} from "../../services/cartService";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [orderSummary,setOrderSummary] = useState([
        // 示例数据
        { id: 1, name: 'Chihuahua', price: 81, quantity: 2, imageUrl: 'http://localhost:9000/petstore-imgs/images/product/wild_bird/wild_bird_product1.jpg' },
        { id: 2, name: 'Persian Cat', price: 70, quantity: 1, imageUrl: 'http://localhost:9000/petstore-imgs/images/product/wild_bird/wild_bird_product1.jpg' }
    ]);
    const [loading, setLoading] = useState(true);
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: '',
        cardLastFour: '1111',
        cardType: 'Visa'
    });
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await getCart(1);
                setOrderSummary(cart.items);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const totalPrice = orderSummary.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleOrderSubmit = () => {
        // 实现提交订单功能
        console.log('Order submitted');
        clearCart(1)
        navigate('/order-confirmation',{ state: { orderSummary, shippingInfo, paymentInfo, totalPrice } });

    };

    const handleImportDefaultInfo = () => {
        // 使用假数据填充表单
        setShippingInfo({
            fullName: 'Jane Doe',
            address: '5678 Second St',
            city: 'Othertown',
            state: 'TX',
            zipCode: '67890',
            phoneNumber: '098-765-4321'
        });
        setPaymentInfo({
            cardNumber: '4111111111111111',
            cardName: 'Jane Doe',
            expirationDate: '12/25',
            cvv: '123',
            cardLastFour: '1111',
            cardType: 'Visa'
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header/>
            <Container className={styles.checkoutContainer}>
                <Typography variant="h4" className={styles.checkoutTitle}>Checkout</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper className={styles.paper}>
                            <Typography variant="h6">Shipping Information</Typography>
                            <Divider className={styles.divider} />
                            <TextField label="Full Name" fullWidth margin="normal" value={shippingInfo.fullName}
                                       onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })} />
                            <TextField label="Address" fullWidth margin="normal" value={shippingInfo.address}
                                       onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
                            <TextField label="City" fullWidth margin="normal" value={shippingInfo.city}
                                       onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}/>
                            <TextField label="State" fullWidth margin="normal" value={shippingInfo.state}
                                       onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} />
                            <TextField label="Zip Code" fullWidth margin="normal" value={shippingInfo.zipCode}
                                       onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })} />
                            <TextField label="Phone Number" fullWidth margin="normal" value={shippingInfo.phoneNumber}
                                       onChange={(e) => setShippingInfo({ ...shippingInfo, phoneNumber: e.target.value })} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={styles.paper}>
                            <Typography variant="h6">Payment Information</Typography>
                            <Divider className={styles.divider} />
                            <TextField label="Card Number" fullWidth margin="normal" value={paymentInfo.cardNumber}
                                       onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} />
                            <TextField label="Card Name" fullWidth margin="normal"  value={paymentInfo.cardName}
                                       onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}/>
                            <TextField label="Expiration Date" fullWidth margin="normal" value={paymentInfo.expirationDate}
                                       onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })} />
                            <TextField label="CVV" fullWidth margin="normal" value={paymentInfo.cvv}
                                       onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}/>
                        </Paper>
                    </Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleImportDefaultInfo}
                        className={styles.importButton}
                    >
                        Import Default Info
                    </Button>
                    <Grid item xs={12}>
                        <Paper className={styles.paper}>
                            <Typography variant="h6">Order Summary</Typography>
                            <Divider className={styles.divider} />
                            {orderSummary.map(item => (
                                <div key={item.id} className={styles.orderItem}>
                                    <img src={item.imageUrl} alt={item.name} className={styles.orderItemImage} />
                                    <div className={styles.orderItemDetails}>
                                        <Typography variant="body1">{item.name}</Typography>
                                        <Typography variant="body2">Price: ${item.price}</Typography>
                                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                        <Typography variant="body2">Total: ${item.price * item.quantity}</Typography>
                                    </div>
                                </div>
                            ))}
                            <Divider className={styles.divider} />
                            <Typography variant="h6" className={styles.totalPrice}>Total Price: ${totalPrice}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={styles.submitButtonContainer}>
                        <Button variant="contained" color="primary" onClick={handleOrderSubmit} className={styles.submitButton}>
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CheckoutPage;