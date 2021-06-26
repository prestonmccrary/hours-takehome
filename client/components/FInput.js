import styles from '../styles/FInput.module.scss'


const FInput = ({placeholder, value, onChange, onKeyPress}) => {
    return(
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{margin:'5px 0px'}}
            onKeyPress={onKeyPress}
            className={styles.nameInput}
        />
    )
}

export default FInput