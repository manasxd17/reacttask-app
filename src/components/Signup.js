import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Loading from './Loading';

export default function Signup() {
    const condition = localStorage.getItem('token');
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }
    const contactHandler = (event) => {
        setMobile(event.target.value);
    }

    const publishUser = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            let userData = {
                "fullname": username,
                "mobile": mobile,
                "email": email,
                "password": password
            }
            const res = await axios.post('https://manasxd17.herokuapp.com/register', userData);
            setLoading(false);
            alert(`Congrats! ${res.data.user.fullname} you're registered now`);
            setUsername('');
            setEmail('');
            setPassword('');
            setMobile('');
            history.push("/login")
        } catch (err) {
            alert(err.response.data.error)
            setLoading(false);
        }

    }
    return (
            <div>
                {
                    loading ?
                        <div>
                            <Loading></Loading>
                        </div>
                        :
                        <div>
                            {
                                condition === null ?
                                    <div className="container">
                                        <h1 style={{ fontFamily: "Brush Script MT,cursive", fontWeight: "bold" }} className="mt-2">Register</h1>
                                        <form onSubmit={publishUser}>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input type="text" className="form-control col-sm-6" placeholder="Enter username" value={username} onChange={usernameHandler} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Number</label>
                                                <input type="text" className="form-control col-sm-6" placeholder="Enter username" value={mobile} onChange={contactHandler} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Email address</label>
                                                <input type="email" className="form-control col-sm-6" placeholder="Enter email" value={email} onChange={emailHandler} required />
                                            </div>
                                            <div className="form-group">
                                                <label >Password</label>
                                                <input type="password" className="form-control col-sm-6" placeholder="Password" value={password} onChange={passwordHandler} required />
                                                <small>Password should've atleast one capital, one special character and total 8 characters.</small>
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-dark">Register <i className="fa fa-user-plus" aria-hidden="true"></i></button>
                                            <small id="emailHelp" className="form-text text-muted">Already registered?
                                                <Link to="/login">
                                                    <span> Login</span>
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
