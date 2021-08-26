import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

export default function Login() {
    const condition = localStorage.getItem('token');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const loginFunc = async (event) => {
        event.preventDefault();
        const loginData = {
            "email": email,
            "password": password
        }
        try {
            setLoading(true);
            const check = await axios.post('https://manasxd17.herokuapp.com/login', loginData);
            const localData = check.data.token
            localStorage.setItem('token', localData);
            alert(`Successfully Logged in`);
            history.push('/articles')
        }
        catch (err) {
            alert(err.response.data.error);
            setLoading(false);
        }

    }
    return (
        <div>
            {
                loading === true ?
                    <div>
                        <Loading></Loading>
                    </div>
                    :
                    <div>
                        {
                            condition === null ?
                                <div className="container">
                                    <h1 style={{ fontFamily: "Brush Script MT,cursive", fontWeight: "bold" }} className="mt-2">Login</h1>
                                    <form onSubmit={loginFunc}>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control col-sm-6" placeholder="Enter email" value={email} onChange={emailHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label >Password</label>
                                            <input type="password" className="form-control col-sm-6" placeholder="Password" value={password} onChange={passwordHandler} />
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-dark">Login<i className="fa fa-user-plus" aria-hidden="true"></i></button>
                                        <small id="emailHelp" className="form-text text-muted">Not registered?
                                            <Link to="/">
                                                <span> Signup</span>
                                            </Link>
                                        </small>
                                    </form>
                                </div>
                                :
                                <div>
                                    <h1 style={{ fontFamily: "Brush Script MT,cursive", textAlign: "center" }}>Already Logged in, View <Link to="/articles">Articles</Link> page.</h1>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}
