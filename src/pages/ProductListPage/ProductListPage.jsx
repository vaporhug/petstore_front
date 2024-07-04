// src/pages/ProductListPage/ProductListPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import productService from "../../services/productService";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from  './ProductListPage.module.scss';
import heroImage from '../../assets/images/product/dog/hero.jpg';
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";

function ProductListPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getProductByCategory(category)
            .then(response => {
                const formattedProducts = response.map(product => ({
                    id : product.productId,
                    name: product.name,
                    price: product.price,
                    image: product.imgUrl,
                    oldPrice: product.old_rice,
                    rating: product.rating,
                    productId: product.productId,
                }));

                setProducts(formattedProducts);
            })
    }, [category]);
    return (
        <>
            <Header />
            <div className={styles.productListPage}>
                <div className={styles.hero}>
                    <h1>Choose your {category.toLowerCase()}</h1>
                </div>
                <Container className={styles.productContainer}>
                    <Grid container spacing={4}>
                        {products.map(product => (
                            <Grid item xs={12} sm={6} md={4} key={product.productid}>
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    oldPrice={product.oldPrice}
                                    rating={product.rating}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </>

    );
}

export default ProductListPage;
