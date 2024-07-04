// src/components/CategoryCard/CategoryCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryCard.module.scss';

function CategoryCard({ image, label,onClick }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={image} alt={label} className={styles.image} onClick={onClick} />
            </div>
            <div className={styles.label}>{label}</div>
        </div>
    );
}

CategoryCard.propTypes = {
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default CategoryCard;
