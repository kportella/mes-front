import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/authService';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [responseMessage, setResponseMessage] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await loginUser(data.email, data.password);
            setResponseMessage(`Success! Welcome ${response.username}`);

            // Perform login using the context
            login(response.accessToken);
            navigate('/usuario');
        } catch (error) {
            setResponseMessage(`Error: ${(error as Error).message}`);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
                        })}
                        className="input"
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className="input"
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                <button type="submit" className="button">Login</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Login;
