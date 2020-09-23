import React from 'react';
import classes from './Input.scss';

function isInvalid({ valid, touched, shouldValidate }) {
    // console.log( shouldValidate && touched && !valid);
    return shouldValidate && touched && !valid;
}

const Input = props => {
    // console.log(props);
    const inputType = props.type || "text";
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={ cls.join(" ") }>
            <label htmlFor={ htmlFor }>{ props.label }
                <input
                    type={ inputType }
                    id={ htmlFor }
                    value={ props.value }
                    onChange={ props.onChange }
                />
                {
                    isInvalid(props)
                        ? <span>{ props.errorMessage || "Enter correct data" }</span>
                        : null
                }

            </label>
        </div>
    );
};
export default Input;