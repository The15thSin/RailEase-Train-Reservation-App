import { useEffect, useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../../config.ts'
import Loader from '../Loading/Loading.tsx'

interface PasswordComplexity {
    type: string;
    regex: RegExp;
}

const complexityRequirements: PasswordComplexity[] = [
    { type: "lowercase", regex: /[a-z]/ },
    { type: "uppercase", regex: /[A-Z]/ },
    { type: "number", regex: /[0-9]/ },
    { type: "special", regex: /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\]/ },
];

function Register() {
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [feedback, setFeedback] = useState('')
    const [sex, setSex] = useState('')
    const [dob, setDOB] = useState('')
    const [phone, setPhone] = useState(0)
    const [pincode, setPincode] = useState(0)
    const [seqQuestion, setSeqQuestion] = useState("")
    const [seqAnswer, setSeqAnswer] = useState("")
    const [response, setResponse] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if (1) {
            const timeoutId = setTimeout(() => {
                setResponse(0);
            }, 3000);
            setTimeout(() => {
                if (response === -1) {
                    // window.location.reload();
                }
                else if (response === 1) {
                    navigate('/login')
                }
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [response]);

    const [errMsg, setErrMsg] = useState(null);

    const checkPasswordComplexity = (value: string) => {
        const meetsRequirements = complexityRequirements.every(
            (requirement) => requirement.regex.test(value)
        );

        if (value.length < 8) {
            setFeedback('*Password must be at least 8 characters long.');
        } else if (!meetsRequirements) {
            const missingTypes = complexityRequirements.filter(
                (requirement) => !requirement.regex.test(value)
            ).map((requirement) => requirement.type);
            const missingTypesList = missingTypes.join(', ');
            setFeedback(`*Password must include at least one ${missingTypesList}.`);
        } else {
            setFeedback(''); // Clear feedback if password meets complexity
        }
    };

    async function RegisterUser(event: { preventDefault: () => void }) {
        event.preventDefault()
        setIsLoading(true);
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
            securityQuestion: seqQuestion,
            securityAnswer: seqAnswer
        };

        const response = await fetch(`${config.BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'ok') {
            setResponse(1)
        } else {
            setErrMsg(data.message)
            setResponse(-1)
        }
        setIsLoading(false);
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.4 }}
        >
            {isLoading && <Loader />}
            <div className="Register-form-container">
                <div className='Register-text-heading'>
                    Register
                    <div className="go-back-reg">
                        <Link to="/">
                            <img width="35" height="35" src="https://img.icons8.com/ios/100/ffffff/circled-left-2.png" alt="circled-left-2" />
                        </Link>
                    </div>
                </div>
                <form className="Register-form" onSubmit={RegisterUser}>
                    <label className='rf-label' htmlFor="name">Full Name : <span style={{ color: 'red' }}>*</span></label>
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
                    <label className='rf-label' htmlFor="email">Email : <span style={{ color: 'red' }}>*</span></label>
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
                    <label className='rf-label' htmlFor="Password">Password : <span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="Password"
                        className={feedback==='' ? 'RF-input' : 'RF-input pswrd-invalid' }
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            checkPasswordComplexity(e.target.value);
                        }}
                        type='password'
                        placeholder='Password (Min 8 chars)'
                        required
                    />
                    <p className="password-complexity-feedback" aria-live="polite">
                        {feedback}
                    </p>
                    <label className='rf-label' htmlFor="Re-password">Re-enter Password : <span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="Re-password"
                        className={feedback==='' ? 'RF-input' : 'RF-input pswrd-invalid' }
                        value={password2}
                        onChange={(e) => {
                            setPassword2(e.target.value)
                        }}
                        type='password'
                        placeholder='Re-enter Password'
                        required
                    />
                    <label className='rf-label' htmlFor="dob">Date of Birth : <span style={{ color: 'red' }}>*</span></label>
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
                    <label className='rf-label' htmlFor="sex">Gender : <span style={{ color: 'red' }}>*</span></label>
                    <select
                        className='RF-input'
                        name="sex"
                        id="sex"
                        onChange={(e) => setSex(e.target.value)}
                        required>
                        <option defaultChecked> Select your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Gay">Others</option>
                    </select>
                    <label className='rf-label' htmlFor="Number">Phone Number : <span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="Number"
                        className='RF-input'
                        inputMode="numeric"
                        value={(phone === 0) ? undefined : phone}
                        onChange={(e) => {
                            setPhone(parseInt(e.target.value))
                        }}
                        placeholder='Enter your Phone Number'
                        required
                    />
                    <label className='rf-label' htmlFor="Pincode">Pincode : <span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="pincode"
                        className='RF-input'
                        type="number"
                        inputMode='numeric'
                        placeholder='Enter your pincode'
                        value={(pincode === 0) ? undefined : pincode}
                        onChange={(e) => {
                            setPincode(parseInt(e.target.value))
                        }}
                    />
                    <label className="rf-label" htmlFor="seq-question">Select your Secret Question : <span style={{ color: 'red' }}>*</span></label>
                    <select
                        className='RF-input'
                        name="seq-question"
                        id="seq-question"
                        onChange={(e) => setSeqQuestion(e.target.value)}
                        required>
                        <option defaultChecked>-- Select your Secret Question --</option>
                        <option value="What is your favourite food?">What is your favourite food?</option>
                        <option value="What is your favourite color?">What is your favourite color?</option>
                        <option value="What is your favourite movie?">What is your favourite movie?</option>
                        <option value="Who is your favourite pornstar?">Who is your favourite pornstar?</option>
                        <option value="What position you like to fuck in/ being fucked?">What position you like to fuck in/being fucked?</option>
                        <option value="How many times did you fucked?">How many times did you fucked?</option>
                        <option value="What is your pp length?">What is your pp length?</option>
                    </select>
                    <label className='rf-label' htmlFor="seq-answer">Enter your answer : <span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="seq-answer"
                        className='RF-input'
                        type="text"
                        placeholder='Enter your answer'
                        value={seqAnswer}
                        onChange={(e) => {
                            setSeqAnswer(e.target.value)
                        }}
                        required
                    />
                    <button type="submit" className='Register-submit-button'>
                        Register
                    </button>

                </form>

            </div>
            <AnimatePresence mode="wait">
                {
                    (response === -1) &&
                    (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: "0" }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.4 }}
                            id='registration-message' className='Registration-notification r-failed'>
                            <span>
                                <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/ff4444/cancel.png" alt="cancel" />
                                <p>
                                    Oops! Registration Failed. Please try again later...
                                </p>
                            </span>
                            <p className='err-msg'>"{errMsg}"</p>
                        </motion.div>
                    )
                    ||
                    (response === 1) &&
                    (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: "0" }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.4 }}
                            className='Registration-notification r-success'
                            id='registration-message'
                        >
                            <span>
                                <img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/008000/task-completed.png" alt="task-completed" />
                                <p>
                                    Registration Successful. Redirecting to Login page...
                                </p>
                            </span>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default Register
