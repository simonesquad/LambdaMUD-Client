// Single login form with username and password
// Bottom link to registration form 
// Could potentially be the first page that you see when going to the game's url
// figure out the automatic subscription to a pusher channel upon login based on the player's id

import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { setUserID, loadingRes } from '../store/actions/master';
import { useDispatch } from "react-redux";
import { axiosWithAuth } from '../store/utils/axiosWithAuth';
import * as yup from "yup";
import Registration from './Registration';

const initialFormState = {
    username: "",
    password: "",
}

function Login() {
    const [formState, setFormState] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const formSchema = yup.object().shape({
        username: yup
          .string()
          .min(8, "Usernames must be at least eight characters long."),
        password: yup
          .string()
          .min(10, "Passwords must be at least ten characters long."),
      });

    function updateForm(e) {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    function submit(e) {
        const user = {
            username: formState.username.trim(),
            password: formState.password
          }

        e.preventDefault();
          formSchema.validate(formState, {abortEarly:false})
            .then(valid => {
              setFormErrors({});

            axiosWithAuth()
            .post('/auth/login', user)

            .then(res => {
                window.localStorage.setItem('token', res.data.token)
             
                history.push('/room')
               
                dispatch(setUserID(res.data.id))
             
                dispatch(loadingRes())    
        })
    })

    .catch(err => {
        let errors = err.inner;
        let errorsObj = {};
        for (let i in errors) {
          let key = errors[i].params.path;
          errorsObj[key] = errors[i].errors[0]; 
        }
        setFormErrors(errorsObj); 
      });
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formState.username}
                    onChange={updateForm}
                />
            {formErrors.username && <p className="error">{formErrors.username}</p>}

                <label htmlFor="password">Password: </label>
                <input 
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={updateForm}
                />
            {formErrors.password && <p className="error">{formErrors.password}</p>}

            <button type="submit">Submit</button>

            <Link to={Registration}>
            <button type="register">Register</button>
            </Link>
            </form>
        </div>
    )
}

export default Login
