// Single login form with username and password
// Bottom link to registration form 
// Could potentially be the first page that you see when going to the game's url
// figure out the automatic subscription to a pusher channel upon login based on the player's id

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const initialFormState = {
    username: "",
    password: "",
}

function Login() {
    const [formState, setFormState] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});
    const history = useHistory();


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

