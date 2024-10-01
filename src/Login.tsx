import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import * as axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "./AuthContext.tsx";

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [responseMessage, setResponseMessage] = useState<string>('');
    const navigate = useNavigate();
    const { login  } = useAuth();

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
        // Handle login logic here (e.g., API call)
            
            // axios.default.post('http://localhost:3000/auth/login', data)
            //     .then((response) => {
            //         setResponseMessage(`Success! Data submitted: ${JSON.stringify(response.data)}`);
            //     })
            //     .catch((error) => {setResponseMessage(`Error: ${error.message}`);})

        login();

        navigate('/usuario');
    }

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        style={styles.input}
                    />
                    {errors.email && <p style={styles.error}>{errors.email.message}</p>}
                </div>

                <div style={styles.inputGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        style={styles.input}
                    />
                    {errors.password && <p style={styles.error}>{errors.password.message}</p>}
                </div>

                <button type="submit" style={styles.button}>Login</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        width: '300px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '12px',
    },
};

export default Login;
