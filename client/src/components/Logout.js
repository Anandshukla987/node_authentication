import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(userContext);

    const navigation = useNavigate();
    useEffect( () => {
        fetch('/logout',{
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "spplication/json"
            },
            credentials: "include"
        }).then(res => {
            dispatch({type: "USER" , payload: false});
            navigation("/login", {replace: true});//second parameter crealed the navigation history stack
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            console.log(err);
        });
    });

  return (
    <div>Logout</div>
  )
}

export default Logout