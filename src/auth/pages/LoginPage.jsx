import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Link, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
    return (
        <AuthLayout title="Login">
            <form action="">
                <Grid container>
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
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item="true" size={{ xs: 12, md: 6 }}>
                        <Button variant="contained" fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item="true" size={{ xs: 12, md: 6 }}>
                        <Button variant="contained" fullWidth>
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
