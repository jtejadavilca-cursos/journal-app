import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";
import { Button, Link, TextField, Typography } from "@mui/material";

export const RegisterPage = () => {
    return (
        <AuthLayout title="Register">
            <form action="">
                <Grid container>
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField label="Nombre" type="text" placeholder="Nombre" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="user@email.com"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Confirm password"
                            type="password"
                            placeholder="Confirm password"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item="true" size={{ xs: 12 }}>
                        <Button variant="contained" fullWidth>
                            Register
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end">
                    <Grid item="true" size={6} sx={{ mt: 1 }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link component={RouterLink} color="inherit" to="/auth/login">
                                Login
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
