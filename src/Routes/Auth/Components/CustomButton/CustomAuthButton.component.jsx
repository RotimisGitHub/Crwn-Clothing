import './CustomAuthButtons.styles.scss'

const CustomSignInButton = ({validForm, children}) => {

    return (
        <>
            <button
                type='submit'
                className='submitSignInButton'
                disabled={!validForm}>
                {children}
            </button>

        </>
    )

}

export default CustomSignInButton;