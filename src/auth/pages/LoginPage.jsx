import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Link, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleAuthentication } from "../../store/auth/thunks";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);

    const emailInput = useRef(null);
    const { email, password, onInputChange } = useForm(
        {
            email: "",
            password: "",
        },
        emailInput
    );

    const login = useCallback(() => {
        dispatch(checkingAuthentication(email, password));
    }, [email, password, dispatch]);

    const loginGoogle = useCallback(() => {
        dispatch(startGoogleAuthentication());
    }, [dispatch]);

    const onLogin = (e) => {
        e.preventDefault();
        if (!email || !password) return;
        login();
    };

    const onGoogleLogin = (e) => {
        e.preventDefault();
        console.log("onGoogleLogin");
        loginGoogle();
    };

    return (
        <AuthLayout title={`Login - ${status || (errorMessage ?? "")}`}>
            <form onSubmit={onLogin}>
                <Grid container>
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            ref={emailInput}
                            label="Email"
                            type="email"
                            placeholder="user@email.com"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>
                </Grid>

                {errorMessage && (
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    </Grid>
                )}

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item="true" size={{ xs: 12, md: 6 }}>
                        <Button variant="contained" type="submit" fullWidth onClick={onLogin}>
                            Login
                        </Button>
                    </Grid>
                    <Grid item="true" size={{ xs: 12, md: 6 }}>
                        <Button variant="contained" fullWidth onClick={onGoogleLogin}>
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end">
                    <Grid item="true" size={6} sx={{ mt: 1 }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link component={RouterLink} color="inherit" to="/auth/register">
                                Register
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
