import './authentication.styles.scss'
import SignUpForm from "../authForms/sign-up-form.component";
import SignInForm from "../authForms/sign-In-form.component";

import {
    signInWithGooglePopup,
    createUserDocument,
    createAuthUserWithEnP,

} from '../../../../utils/firebase/firebase.utils'


const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocument = await createUserDocument(user)
        console.log(userDocument)
    }


    return (
        <div className='auth-content'>

            <SignUpForm logEmail={createAuthUserWithEnP}/>
            <SignInForm logGoogle={logGoogleUser}/>


            <div className='userDataDisplay'>

            </div>


        </div>
    )
}

export default SignIn;