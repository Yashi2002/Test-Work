import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
    const [code, setCode] = useState(Array(6).fill(''));
    const [inputErrors, setInputErrors] = useState(Array(6).fill(false)); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        const newCode = [...code];
        const newInputErrors = [...inputErrors];

        // for checking numeric value
        if (/^\d$/.test(value) || value === '') {
            newCode[index] = value;
            newInputErrors[index] = false;

            if (value && index < 5) {
                document.getElementById(`digit-${index + 1}`).focus();
            }
        } else {
            newInputErrors[index] = true; 
        }

        setCode(newCode);
        setInputErrors(newInputErrors);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('Text');

        if (/^\d{6}$/.test(pastedData)) {
            setCode(pastedData.split(''));
            setInputErrors(Array(6).fill(false)); 
        } else {
            setMessage('Verification Error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');

        try {
            const response = await fetch('http://localhost:5000/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: verificationCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                navigate(data.redirectTo);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setMessage('Error verifying code.');
        }
    };

    return (
        <div className="container">
            <h1>Enter 6-Digit Code</h1>
            <form onSubmit={handleSubmit} className="code-form" noValidate>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`digit-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onPaste={handlePaste}
                        maxLength="1"
                        className={`digit-input ${inputErrors[index] ? 'input-error' : ''}`}
                        required={false}
                    />
                ))}
                <button type="submit" className="submit-button">Verify</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;