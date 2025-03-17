export const loginData = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export const handleInputs = (event, setInputData) => {
    const {name, value} = event.target;
    setInputData((prevState) => {
        return {
            ...prevState,
            [name]: value
        }

    })

}