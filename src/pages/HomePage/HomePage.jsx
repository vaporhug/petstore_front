// src/pages/HomePage/HomePage.jsx
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
// import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import styles from  './HomePage.module.scss';
import Button from "@mui/material/Button";
import categoryService from "../../services/categoryService";
import productService from "../../services/productService";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const [showQuote, setShowQuote] = useState(false);
    const [quote, setQuote] = useState('');
    const [quoteTimeout, setQuoteTimeout] = useState(null); // 添加状态用于存储定时器

    const quotes = [
        "Pets are humanizing. They remind us we have an obligation and responsibility to preserve and nurture and care for all life. – James Cromwell",
        "The greatness of a nation and its moral progress can be judged by the way its animals are treated. – Mahatma Gandhi",
        "Until one has loved an animal, a part of one's soul remains unawakened. – Anatole France",
        "Dogs do speak, but only to those who know how to listen. – Orhan Pamuk"
    ];
    const handleShopCollectionClick = () => {
        // 每次点击按钮时清除之前的定时器
        if (quoteTimeout) {
            clearTimeout(quoteTimeout);
        }
        // 随机选择一条名言
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
        setShowQuote(true);
        // 设置定时器在 5 秒后隐藏名言
        const timeout = setTimeout(() => {
            setShowQuote(false);
        }, 3000);
        setQuoteTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (quoteTimeout) {
                clearTimeout(quoteTimeout);
            }
        };
    }, [quoteTimeout]);

    const handleCategoryClick = (label) => {
        console.log('Category clicked:', label);
        navigate(`/products/${label}`);
    };

    const [categories, setCategories] = useState([]);
    const [newestProducts, setNewestProduct] = useState([]);

    useEffect(() => {
        categoryService.getAllCategories()
            .then(response => {
                const formattedCategories = response.map(category => ({
                    image: category.description,
                    label: category.name,
                    id : category.catId,
                }));
                setCategories(formattedCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));

        productService.getNewestProduct()
            .then(response => {
                const formattedProducts = response.map(product => ({
                    name: product.name,
                    price: product.price,
                    image: product.imgUrl,
                    oldPrice: product.old_rice,
                    rating: product.rating,
                    id : product.productId,
                }));
                setNewestProduct(formattedProducts);
            })
            .catch(error => console.error('Error fetching newest products:', error));
    }, []);

    return (
        <>
            <Header />
            <div className={styles.hero}>
                <h1>Take care of your pets.</h1>
                <Button variant="contained" color="primary" onClick={handleShopCollectionClick} className={styles.shopCollectionButton}>Treat Your Pets Well</Button>
                {showQuote && (
                    <div className={styles.quoteContainer}>
                        <p className={styles.quoteText}>{quote}</p>
                    </div>
                )}
            </div>
            <section className={styles.categories}>
                <h2>Shop by categories</h2>
                <div className={styles.categoryList}>
                    {categories.map((category) => (
                        <CategoryCard key={category.id}
                                      image={category.image}
                                      label={category.label}
                                      onClick={() => handleCategoryClick(category.id)}
                        />
                    ))}
                </div>
            </section>
            <section className={styles.newArrivals}>
                <h2>New arrival products</h2>
                <div className={styles.productList}>
                    {newestProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            oldPrice={product.oldPrice}
                            rating={product.rating}
                        />
                    ))}
                </div>
            </section>
            <section className={styles.testimonials}>
                <h2>Our client says!</h2>
            </section>
        </>
    );
}


export default HomePage;
