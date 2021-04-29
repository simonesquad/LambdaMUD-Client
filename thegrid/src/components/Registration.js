// registration form embedded into the page where a new user can sign up for full access
//returns the user to the login page upon onSubmit

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleMain,  setErrors } from '../store/actions/master';
import axios from 'axios';
import * as yup from 'yup';

const initialFormValues = {
    username: '',
    password: ''
}

const initialFormErrors = {
    username: '',
    password: ''
}

const initialDisabled = true

function Registration() {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)
    const dispatch = useDispatch();
    const history = useHistory();

    const formSchema = yup.object().shape({
       username: yup
        .string()
        .min(8, "Your username must be at least eight characters long."),
      password: yup
        .string()
        .min(10, "Your password must be at least ten characters long.")
    });

    const inputChange = (name, value) => {
        yup
          .reach(formSchema, name)
          .validate(value)
          .then(valid => {
            setFormErrors({
              ...formErrors,[name]: "",})
          })
          .catch(err => {
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            })
          })
    
        setFormValues({
          ...formValues,
          [name]: value
        })
    }

    const submit = (formValues) => {
      
    const newPlayer = {
        username: formValues.username.trim(),
        password: formValues.password
        }
       
    axios 
        .post('https://cloudskool.herokuapp.com/api/auth/register', formValues)
        .then(res => {
            dispatch(toggleMain())
            history.push('/login')
        })
        .catch(err => {
            dispatch(setErrors(err))
        })
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit(formValues)
    }
    
    const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
    }

    useEffect(() => {
       formSchema.isValid(formValues)
            .then(valid => {
                setDisabled(!valid);
            })
    }, [formValues])
    
    return (
        <form onSubmit={onSubmit}> 
            <div className='form container' >
                <div className='form-group submit'>
                 <h2>Register to Play</h2>
                 <div className='register-form-container'>

                    <label htmlFor="username">Username: </label>
                            <input 
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={onInputChange}
                            />
                 {formErrors.username && <p className="error">{formErrors.username}</p>}

                 <label htmlFor="password">Password: </label>
                            <input 
                            type="text"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={onInputChange}
                            />
                {formErrors.password && <p className="error">{formErrors.password}</p>}
        
                <button type="submit">Submit</button>
        </div>
    </div>
    </div>
        </form>  
    )
} 

export default Registration