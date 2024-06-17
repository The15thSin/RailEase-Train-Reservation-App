import { useState } from 'react'; // Import useState for handling form state
import './ForgotPassword.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';
import config from '../../config.ts'

interface ForgotPasswordProps {
    // Optional: Define props if needed for password recovery logic
}

function ForgotPassword(_props: ForgotPasswordProps) {
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(''); // Use appropriate date type (e.g., Date)
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [password, setPassword] = useState('');
    const [cnfmPassword, setCnfmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(''); // For handling errors
    const [successMessage, setSuccessMessage] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== cnfmPassword) {
            setErrorMessage('New Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${config.BACKEND_URL}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, dob, securityQuestion, securityAnswer, password }),
            });

            if (response.ok) {
                console.log('Password reset successful!');
                setSuccessMessage('Password reset successful! You can now login if new password...');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'An error occurred.'); // Handle specific errors
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.'); // Handle network errors
        }
    };

    return (
        <div className='forgot-password'>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div className='fp-form-group'>
                    <label htmlFor='email'>Email Address:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='fp-form-group'>
                    <label htmlFor='dob'>Date of Birth:</label>
                    <input
                        type='date' // Use appropriate date input type
                        id='dob'
                        name='dob'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div className='fp-form-group'>
                    <label htmlFor='securityQuestion'>Security Question:</label>
                    <select
                        id='securityQuestion'
                        name='securityQuestion'
                        value={securityQuestion}
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                        required
                    >
                        <option defaultChecked>-- Select your Secret Question --</option>
                        <option value="What is your favourite food?">What is your favourite food?</option>
                        <option value="What is your favourite color?">What is your favourite color?</option>
                        <option value="What is your favourite movie?">What is your favourite movie?</option>
                        <option value="Who is your favourite pornstar?">Who is your favourite pornstar?</option>
                        <option value="What position you like to fuck in/ being fucked?">What position you like to fuck in/being fucked?</option>
                        <option value="How many times did you fucked?">How many times did you fucked?</option>
                        <option value="What is your pp length?">What is your pp length?</option>
                    </select>
                </div>
                <div className='fp-form-group'>
                    <label htmlFor='securityAnswer'>Security Answer:</label>
                    <input
                        type='text'
                        id='securityAnswer'
                        name='securityAnswer'
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        required
                    />
                </div>
                <div className='fp-form-group'>
                    <label htmlFor='password'>New Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                </div>
                <div className='fp-form-group'>
                    <label htmlFor='confirmPassword'>Confirm New Password:</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={cnfmPassword}
                        onChange={(e) => { setCnfmPassword(e.target.value) }}
                        required
                    />
                </div>
                <button type='submit' className='fp-submit-button'>Recover Password</button>
                {errorMessage && <p className='fp-error-message'>{errorMessage}</p>}
                {successMessage && <p className='fp-success-message'>{successMessage}</p> }
            </form>
        </div>
    );
}

export default ForgotPassword;
