import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LoginButton, LogoutButton } from '../Log/LogButtons';
import styles from './Header.module.scss';
import { useAuth0 } from "@auth0/auth0-react";
import {MenuItem, Paper, TextField} from "@mui/material";

function Header() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { loginWithRedirect } = useAuth0();

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            loginWithRedirect();
        }
    }

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.length > 1) {
            // 模拟搜索请求
            const results = [
                { id: 'K9-CW-01', name: 'Chihuahua' },
                { id: 'K9-DL-01', name: 'Dalmation' },
                { id: 'K9-RT-01', name: 'Golden Retriever' }
            ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            setSearchResults(results);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSearchItemClick = (item) => {
        navigate(`/product/${item.id}`);
        setSearchQuery('');
        setShowDropdown(false);
    };

    return (
        <AppBar position="static" className={styles.header}>
            <Toolbar>
                <Typography variant="h6" className={styles.title} onClick={handleLogoClick}>
                    Pet Shop &nbsp;&nbsp;
                </Typography>
                {/*<TextField*/}
                {/*    variant="outlined"*/}
                {/*    placeholder="Search Pets"*/}
                {/*    className={styles.searchBox}*/}
                {/*    InputProps={{*/}
                {/*        classes: {*/}
                {/*            root: styles.searchBoxRoot,*/}
                {/*            notchedOutline: styles.notchedOutline,*/}
                {/*            focused: styles.focused*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                <div className={styles.searchContainer}>
                    <TextField
                        variant="outlined"
                        placeholder="Search Pets"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.searchBox}
                        InputProps={{
                            classes: {
                                root: styles.searchBoxRoot,
                                notchedOutline: styles.notchedOutline,
                                focused: styles.focused
                            }
                        }}
                    />
                    {showDropdown && (
                        <Paper className={styles.dropdown}>
                            {searchResults.map(item => (
                                <MenuItem key={item.id} onClick={() => handleSearchItemClick(item)}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Paper>
                    )}
                </div>
                <div className={styles.rightButtons}>
                    <Button variant="contained" color="secondary" onClick={handleCartClick}
                            startIcon={<ShoppingCartIcon/>}>
                        Cart
                    </Button>
                    {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;