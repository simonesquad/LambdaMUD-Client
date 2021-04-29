// Single login form with username and password
// Bottom link to registration form 
// Could potentially be the first page that you see when going to the game's url
// figure out the automatic subscription to a pusher channel upon login based on the player's id

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from "yup";

const initialFormState = {
    username: "",
    password: "",
}

function Login() {
    const [formState, setFormState] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});
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

            </form>
        </div>
    )
}

export default Login

