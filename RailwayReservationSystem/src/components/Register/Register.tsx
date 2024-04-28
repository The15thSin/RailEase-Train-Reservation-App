import { useEffect, useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [sex, setSex] = useState('')
    const [dob, setDOB] = useState('')
    const [phone, setPhone] = useState(0)
    const [pincode, setPincode] = useState(0)
    const [response, setResponse] = useState(0)

    const navigate = useNavigate()
  
    useEffect(() => {
        const messageElement = document.getElementById('registration-message');
        if(messageElement){
            const timeoutId = setTimeout(() => {
                messageElement!.style.opacity = '0'; // Start fade-out animation
            }, 3000);
            setTimeout(()=>{
            if(response === -1){
                window.location.reload();
            }
            else if(response === 1){
                navigate('/login')
            }
            }, 6000);
            return () => clearTimeout(timeoutId);
        }
    }, [response]);

    async function RegisterUser(event: { preventDefault: () => void }) {
        event.preventDefault()

        if (password !== password2) {
            alert("Password not matched. Please enter password again...")
            return 0;
        }

        const userData = {
            name: name,
            email: email,
            password: password,
            sex: sex,
            dob: dob,
            phone: phone,
            pincode: pincode,
        };

        const response = await fetch('http://localhost:6969/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        // console.log(data);

        if (data.status === 'ok') {
            setResponse(1)
        } else {
            setResponse(-1)
        }
    }

    return (

        <div className="Register-form-container">
            {
                (response === -1) ?
                    <div id='registration-message' className='Registration-notification r-failed'>Registration Failed. Please try again later...</div>
                    :
                    <>
                        {
                            (response === 1) ?
                                <div className='Registration-notification r-success' id='registration-message'>Registration Succesful</div> :
                                <></>
                        }
                    </>
            }
            <div className='Register-text-heading'>
                <h2>
                    Register Yourself
                </h2>
            </div>
            <form className="Register-form" onSubmit={RegisterUser}>
                <label className='rf-label' htmlFor="name">Full Name :</label>
                <input
                    id="name"
                    className='RF-input'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    placeholder='Enter your full name'
                    required
                />
                <label className='rf-label' htmlFor="email">Email :</label>
                <input
                    id="email"
                    className='RF-input'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type='email'
                    placeholder='Enter your Email address'
                    required
                />
                <label className='rf-label' htmlFor="Password">Password :</label>
                <input
                    id="Password"
                    className='RF-input'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    type='password'
                    placeholder='Password (Min 8 chars)'
                    required
                />
                <label className='rf-label' htmlFor="Re-password">Re-enter Password :</label>
                <input
                    id="Re-password"
                    className='RF-input'
                    value={password2}
                    onChange={(e) => {
                        setPassword2(e.target.value)
                    }}
                    type='password'
                    placeholder='Re-enter Password'
                    required
                />
                <label className='rf-label' htmlFor="dob">Date of Birth :</label>
                <input
                    id="dob"
                    className='RF-input'
                    type="date"
                    value={dob}
                    onChange={(e) => {
                        setDOB(e.target.value)
                    }}
                    placeholder='Enter your Date of Birth'
                    required
                />
                <label className='rf-label' htmlFor="sex">Gender :</label>
                <select
                    className='RF-input'
                    name="sex"
                    id="sex"
                    onChange={(e) => setSex(e.target.value)}
                    required>
                    <option selected disabled> Select your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Gay">Others</option>
                </select>
                <label className='rf-label' htmlFor="Number">Phone Number :</label>
                <input
                    id="Number"
                    className='RF-input'
                    type="number"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                        setPhone(parseInt(e.target.value))
                    }}
                    placeholder='Enter your Phone Number'
                    required
                />
                <label className='rf-label' htmlFor="Pincode">Pincode :</label>
                <input 
                    id="pincode"
                    className='RF-input'
                    type="number"
                    inputMode='numeric'
                    placeholder='Enter your pincode'
                    value = {pincode}
                    onChange={(e)=>{
                        setPincode(parseInt(e.target.value))
                    }} 
                />
                <button type="submit" className='Register-submit-button'>
                    Register
                </button>

            </form>

        </div>
    )
}

export default Register
