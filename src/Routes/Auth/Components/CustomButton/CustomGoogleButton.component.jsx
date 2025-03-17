import './CustomAuthButtons.styles.scss'


const CustomGoogleButton = ({logGoogle}) => {
    return (
        <>
        <button
            type='button'
            className='submitSignInButton'
            onClick={logGoogle}>
            Sign In With Google
        </button>
            </>
    )
}
export default CustomGoogleButton;