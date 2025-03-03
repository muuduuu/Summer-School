import React, { useState } from 'react';
import { Card, Typography, FormGroup, FormFormL, FormLabel, Input, Button } from '@mui/material';

export default function Register() {
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
        <Card className="registration-container" style={{margin:'10px 100px 10px 100px', padding:'20px'}}>
            <Typography variant='h6'>Register</Typography>
            <FormGroup onSubmit={handleSubmit}>
                <Card style={{display: 'flex', flexDirection: 'column', padding: '20px'}}>
                    <FormLabel>Username:</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                
                    <FormLabel>Email:</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                
                    <FormLabel>Password:</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </Card>
                <Button type="submit">Register</Button>
            </FormGroup>
        </Card>
    );
}
