import './auth.styles.scss'
import {useRef, useState, useContext, useEffect} from "react";
import {logInWithEnP} from '../../../../utils/firebase/firebase.utils'
import CustomGoogleButton from "../CustomButton/CustomGoogleButton.component";
import CustomInput from "../CustomInput/CustomInput.component";
import CustomSignInButton from "../CustomButton/CustomAuthButton.component";
// import {AuthIntelContext} from "../../../../Provider/UserProvider.components";


const SignInForm = ({logGoogle}) => {


    const loginData = {
        email: '',
        password: '',
    }

    // States

    const [userInputData, setInputData] = useState(loginData)
    const {email, password} = userInputData

    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)

    // Refs

    const formRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    const invalidPasswordElement = (
        <>
            <p style={{
                color: "red",
            }}>Password is Invalid. Please Try Again.</p>
            <br/>
        </>
    )

    const invalidEmailElement = (
        <>
            <p style={{
                color: "red",
            }}>There are no accounts matching this Email Address. Try a new one or Sign up if you don't have an
                account</p>
            <br/>
        </>
    )


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await logInWithEnP(email, password)
            if (response) {
                formRef.current.submit()
                // Clear FORM FIELDS
                setInputData(loginData)

                console.log('complete')
            }

        } catch (error) {
            switch (error.code) {
                case ('auth/wrong-password'): {
                    // Clear Password Field
                    setInputData((prevState => {
                            return {
                                ...prevState,
                                password: ''
                            }

                        })
                    )
                    // Show Error message for incorrect password
                    setInvalidPassword(true)
                    if (invalidEmail) setInvalidPassword(false);
                }
                    break;

                case ('auth/user-not-found'): {
                    setInvalidEmail(true)
                    if (invalidPassword) setInvalidPassword(false);
                    break;


                }
                default :
                    setInvalidEmail(false)
                    setInvalidPassword(false)
                    console.log(error)

            }


        }


    }

    const handleInputs = (event) => {
        const {name, value} = event.target;
        setInputData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }

        })

    }

    return (
        <div className='AuthFormClass'>
            <h1>Sign In</h1>
            {invalidPassword && invalidPasswordElement}
            {invalidEmail && invalidEmailElement}
            <div className='formClass'>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}>

                    <CustomInput
                        identifier={'email'}
                        type={'text'}
                        ref={emailRef}
                        onChange={handleInputs}
                        placeholder='someone@mail.com'/>


                    <CustomInput


                        identifier='password'
                        type={'password'}
                        onChange={handleInputs}
                        ref={passwordRef}
                        placeholder={'Password...'}
                    />


                    <div className='signInButtons'>
                        <CustomSignInButton validForm={() => emailRef.current.checkValidity() && password.length > 8}>
                            Sign In
                        </CustomSignInButton>
                        <CustomGoogleButton
                            logGoogle={logGoogle}/>
                    </div>


                </form>
            </div>

        </div>
    )
}

export default SignInForm;

