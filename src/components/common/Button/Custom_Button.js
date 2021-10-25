
import React from 'react'
import styles from '../Button/CustomButton.module.css'
const Custom_Button = (props) => {
    
    if(props.variant==='fill_blue'){
        return (
            <>
            <button className={styles.fill_blue}>{props.text}</button>
            </>
        )
    }
    if(props.variant==='close'){
        return (
            <>
            <button className={styles.close}>Login</button>
            </>
        )
    }
   
}

export default Custom_Button
