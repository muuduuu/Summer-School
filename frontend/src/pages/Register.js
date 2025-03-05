import React, { useState } from 'react';
import { 
    Card, 
    Typography, 
    FormGroup, 
    Button,
    Box,
    styled,
    Container,
    TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.background.paper,
    margin: '40px auto',
    maxWidth: '500px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
    borderRadius: '16px',
    border: '1px solid rgba(99, 102, 241, 0.1)',
}));

const StyledFormCard = styled(Card)(({ theme }) => ({
    background: theme.palette.background.default,
    padding: '24px',
    marginTop: '20px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(99, 102, 241, 0.05)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: '24px',
    padding: '12px 32px',
    background: 'linear-gradient(145deg, #6366f1 0%, #4f46e5 100%)',
    color: theme.palette.text.primary,
    borderRadius: '8px',
    fontWeight: 500,
    letterSpacing: '0.5px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
        color: theme.palette.text.primary,
        '& fieldset': {
            borderColor: 'rgba(99, 102, 241, 0.2)',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
    },
}));

// const ErrorText = styled(Typography)({
//     color: '#f43f5e',
//     margin: '4px 0 16px 0',
//     fontSize: '0.875rem',
//     fontWeight: 500,
// });

export default function Register() {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        username: '',
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

        // Username validation
        if (!formData.username) {
            formIsValid = false;
            errors['username'] = 'Username cannot be empty';
        }

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
        } else if (formData.password.length < 6) {
            formIsValid = false;
            errors['password'] = 'Password must be at least 6 characters long';
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid, send data to server:', formData);
            // Proceed with submitting the data to your server or API endpoint
        }
    };

    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                background: theme.palette.background.default,
                paddingTop: '40px',
                paddingBottom: '40px',
            }} 
        >
            <Container maxWidth="md">
                <StyledCard>
                    <Typography 
                        variant='h4' 
                        sx={{ 
                            mb: 3,
                            fontWeight: 700,
                            background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Create Your Account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <StyledFormCard>
                            <FormGroup>
                                <StyledTextField
                                    label="Username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                                
                                <StyledTextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                
                                <StyledTextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </FormGroup>
                        </StyledFormCard>
                        <StyledButton type="submit" variant="contained" fullWidth>
                            Register
                        </StyledButton>
                    </form>
                </StyledCard>
            </Container>
        </Box>
    );
}
