import React, { useState } from 'react';
import {
    Card, 
    Typography, 
    FormGroup, 
    FormLabel, 
    Input, 
    Button,
    Box,
    styled,
    ThemeProvider
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Using the same theme settings as the registration page
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1a4468',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        }
    }
});

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    margin: '40px auto',
    maxWidth: '500px',
    padding: '30px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    borderRadius: '12px',
}));

const StyledInput = styled(Input)(({ theme }) => ({
    marginBottom: '20px',
    color: theme.palette.text.primary,
    '&:before': {
        borderColor: theme.palette.text.secondary,
    },
    '&:after': {
        borderColor: theme.palette.primary.main,
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    padding: '10px 30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const ErrorText = styled('p')({
    color: '#ff6b6b',
    margin: '4px 0 16px 0',
    fontSize: '0.875rem',
});

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        // Email validation
        if (!formData.email) {
            formIsValid = false;
            errors['email'] = 'Email cannot be empty';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid';
        }

        // Password validation
        if (!formData.password) {
            formIsValid = false;
            errors['password'] = 'Password cannot be empty';
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid, send data to server:', formData);
            // Here you could call a backend service to authenticate the user
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, paddingTop: '20px' }}>
                <StyledCard>
                    <Typography variant='h4' sx={{ mb: 3, color: theme.palette.text.primary }}>
                        Sign In
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormLabel sx={{ color: theme.palette.text.secondary }}>Email</FormLabel>
                            <StyledInput
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                            />
                            {errors.email && <ErrorText>{errors.email}</ErrorText>}

                            <FormLabel sx={{ color: theme.palette.text.secondary }}>Password</FormLabel>
                            <StyledInput
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                            />
                            {errors.password && <ErrorText>{errors.password}</ErrorText>}
                        </FormGroup>
                        <StyledButton type="submit" variant="contained" fullWidth>
                            Sign In
                        </StyledButton>
                    </form>
                </StyledCard>
            </Box>
        </ThemeProvider>
    );
}
