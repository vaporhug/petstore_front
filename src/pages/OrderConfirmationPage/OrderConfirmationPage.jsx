import React from 'react';
import { Container, Grid, Typography, Paper, Divider, Button } from '@mui/material';
import styles from './OrderConfirmationPage.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../../components/Header/Header";
const OrderConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { orderSummary, shippingInfo, paymentInfo, totalPrice } = location.state || {};

    const orderNumber = '1722323453890242';
    const handleReturnHome = () => {
        navigate('/');
    };

    const handleViewOrderDetails = () => {
        // 实现查看订单详情功能
        console.log('View order details');
    };

    return (
        <>
            <Header />
            <Container className={styles.confirmationContainer}>
                <Typography variant="h4" className={styles.confirmationTitle}>Order Confirmation</Typography>
                <Paper className={styles.paper}>
                    <Typography variant="h6" className={styles.thankYouMessage}>Thank you for your order!</Typography>
                    <Typography variant="body1" className={styles.orderNumber}>Order Number: {orderNumber}</Typography>
                    <Divider className={styles.divider} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Shipping Information</Typography>
                            <Divider className={styles.divider} />
                            <Typography variant="body1">Name: {shippingInfo.fullName}</Typography>
                            <Typography variant="body1">Address: {shippingInfo.address}</Typography>
                            <Typography variant="body1">City: {shippingInfo.city}</Typography>
                            <Typography variant="body1">State: {shippingInfo.state}</Typography>
                            <Typography variant="body1">Zip Code: {shippingInfo.zipCode}</Typography>
                            <Typography variant="body1">Phone: {shippingInfo.phoneNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Payment Information</Typography>
                            <Divider className={styles.divider} />
                            <Typography variant="body1">Card Type: {paymentInfo.cardType}</Typography>
                            <Typography variant="body1">Card Ending: **** {paymentInfo.cardLastFour}</Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                    <div className={styles.actions}>
                        <Button variant="contained" color="primary" onClick={handleReturnHome} className={styles.actionButton}>
                            Return Home
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleViewOrderDetails} className={styles.actionButton}>
                            View Order Details
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default OrderConfirmationPage;