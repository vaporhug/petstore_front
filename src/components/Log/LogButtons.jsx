import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <Button variant="contained" color="secondary" startIcon={<AccountCircleIcon />} onClick={() => loginWithRedirect()}>
        Log In
    </Button>
};

export const LogoutButton = () => {
    const { logout } = useAuth0();
    return <Button variant="contained" color="secondary" startIcon={<AccountCircleIcon />} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
    </Button>
};
export default {LoginButton,LogoutButton};
