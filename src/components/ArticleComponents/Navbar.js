import React, { useState, useEffect } from 'react';
import { tokenHeader } from '../../HeaderService';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export default function Navbar() {
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const logoutHandler = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    const createHandler = () => {
        history.push("/articles/articleform");
    }

    useEffect(() => {
        async function fetchEmail(){
            try{
                let structure = {
                    'method':'get',
                    'url':'https://manasxd17.herokuapp.com/self',
                    'headers':tokenHeader()
                }
                const selfData = await axios(structure);
                setEmail(selfData.data.email)
            }
            catch(err){
                alert(err.message);
            }
        }
        fetchEmail();
    },[])

    const tomyArticles = () => {
        history.push('/articles/myarticles')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <span className="navbar-brand" style={{ color: "white", fontFamily: "Baskerville, Baskerville Old Face, Hoefler Text, Garamond, Times New Roman, serif", fontSize: "24px" }}>Hi! Welcome  {email}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <button className="btn btn-dark" onClick = {createHandler}>
                                Create Article <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark" onClick = {tomyArticles}>My Articles <i className="fa fa-user-plus" aria-hidden="true"></i></button>
                        </li>
                        <div>
                            <li className="nav-item">
                                <button className="btn btn-dark" onClick = {logoutHandler}>Logout <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}