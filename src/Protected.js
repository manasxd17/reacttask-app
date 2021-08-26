import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
export default function Protected(props) {
    const Cmp = props.Cmp
    const history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            history.push("/login")
        }
    },[]);
    return (
        <div>
            <Cmp></Cmp>
        </div>
    )
}
