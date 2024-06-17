import { useState } from 'react';
import './ChangePassword.css'
import config from '../../config.ts'

function ChangePassword() {

    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [cnfmPassword, setCnfmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For handling errors
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password!==cnfmPassword){
            setErrorMessage('New Passwords do not match!!!');
        }
        try{
            const res = await fetch(`${config.BACKEND_URL}/api/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, dob, oldPassword, password})
            });

            if(res.ok){
                setSuccessMessage('Password changed Successfully...')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='change-password'>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <div className='cp-form-group'>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='cp-form-group'>
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
                <div className='cp-form-group'>
                    <label htmlFor='password'>Old Password:</label>
                    <input
                        type='password'
                        id='oldPassword'
                        name='password'
                        value={oldPassword}
                        onChange={(e) => { setOldPassword(e.target.value) }}
                        required
                    />
                </div>
                <div className='cp-form-group'>
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
                <div className='cp-form-group'>
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
                <button type='submit' className='cp-submit-button'>Reset Password</button>
                {errorMessage && <p className='cp-error-message'>{errorMessage}</p>}
                {successMessage && <p className='cp-success-message'>{successMessage}</p> }
            </form>
        </div>
    )
}

export default ChangePassword
