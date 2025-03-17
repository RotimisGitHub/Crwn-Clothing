import './auth.styles.scss'
import {useRef, useState, useEffect} from "react";
import {obtainInformationFromDB} from '../../../../utils/firebase/firebase.utils'

import CustomGoogleButton from "../CustomButton/CustomGoogleButton.component";
import CustomInput from "../CustomInput/CustomInput.component";
import CustomSignInButton from "../CustomButton/CustomAuthButton.component";
const SignUpForm = ({logEmail}) => {


    const loginData = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }


    // States
    const [userInputData, setInputData] = useState(loginData)
    // Destructing the userInputData object to enable updating its state using handleInputs
    const {displayName, email, password, confirmPassword} = userInputData;

    const [validForm, setValidForm] = useState(false)
    const [validEmail, setValidEmail] = useState(null)

    // Refs


    const confirmPasswordRef = useRef(null)
    const formRef = useRef(null)
    const emailRef = useRef(null)


    const validEmailComponent = (
        <>
            <p style={{
                color: "red",
            }}>This email is already in use. Sign Up a different email, or <i>Sign In</i> using this email.</p>
            <br/>
        </>
    )



     const handleInputs = (event) => {
        const {name, value} = event.target;
        setInputData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }

        })

    }
    useEffect(() => {
        console.log(userInputData)
        if (!(userInputData.password === userInputData.confirmPassword)) {
            confirmPasswordRef.current.setCustomValidity('Please Ensure Your Passwords Match!')
            setValidForm(false)


        } else {
            confirmPasswordRef.current.setCustomValidity('')

        }
        const checkEmail = async () => {
            const emailInDB = await obtainInformationFromDB('email', userInputData) // Logs what the Promise resolves
            setValidEmail(!emailInDB)
        }

        checkEmail()

        setValidForm(formRef.current.checkValidity() && validEmail)

    }, [validEmail, userInputData]);


    const handleSubmit = async (event) => {
        event.preventDefault()


        const response = await logEmail(email, password, displayName)

        if (response) {
            formRef.current.submit()
            setInputData(loginData)
            console.log('complete')
        }


    }

    return (
        <div className='AuthFormClass'>
            <h1>Sign Up</h1>
            {!validEmail && validEmailComponent}
            <div className='formClass'>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}>
                    <CustomInput

                        identifier='displayName'
                        type='text'
                        value={displayName}
                        onChange={handleInputs}
                        placeholder='Display Name'
                        minLength='5'
                        maxLength='25'
                    />


                    <CustomInput

                        identifier={'email'}
                        type={'email'}
                        value={email}
                        ref={emailRef}
                        onChange={handleInputs}
                        placeholder='someone@mail.com'
                    />


                    <CustomInput

                        identifier={'password'}
                        type={'password'}
                        value={password}
                        onChange={handleInputs}
                        placeholder='Password...'
                        minLength='8' maxLength='20'
                        pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$'
                    />


                    <CustomInput
                        identifier={'confirmPassword'}
                        ref={confirmPasswordRef}
                        type='password'
                        value={confirmPassword}
                        onChange={handleInputs}
                        placeholder='Confirm Password...'
                        minLength='8' maxLength='20'
                        pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$'
                    />

                    <div className='signInButtons'>
                        <CustomSignInButton validForm={validForm}>
                            Sign Up
                        </CustomSignInButton>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default SignUpForm;