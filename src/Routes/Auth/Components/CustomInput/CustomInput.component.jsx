import './CustomInput.styles.scss'

const CustomInput = ({identifier, onChange, value, ...remainingFields}) => {

    function capitalizeFirstLetter(str) {
        if (!str) return str;
        // str.replace(/\s+/g, "");
        return str[0].toUpperCase() + str.substring(1);
    }
    return (
        <div className={'inputDivider'}>
            <label htmlFor={identifier} >{capitalizeFirstLetter(identifier)}</label>
            <input

                name={identifier}
                value={value}
                onChange={onChange}
                className='formField'
                required

                {...remainingFields}/>
        </div>
    )
}

export default CustomInput;