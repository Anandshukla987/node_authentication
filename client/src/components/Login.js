import React,{useContext, useState} from 'react';
import logo from '../images/logIn.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Login = () => {

    const {state, dispatch} = useContext(userContext);

    const navigation = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");
    
    const logIn = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        
        if(res.status === 406 || !data || res.status === 400){
            if(res.status === 400){ navigation("/signup"); }
            window.alert("Invalid Credentioals");
            // console.log("Invalid Credentioals")
        }
        else{
            dispatch({type: "USER", payload: true});
            window.alert("User Logedin");

            navigation("/");
        }
    }

    return (
        <div className='main-container'>
            <div className='login'>
                <h2>Login</h2>
                <div className='login-content'>
                    <div className='login-img'>
                        <figure>
                            <img src={logo} alt='Login'/>
                        </figure>
                    </div>
                    <form className='login-form' id='login-form'>
                        <div className="input-box">
                            <label htmlFor="email">
                                <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='Enter email' autoComplete='OFF' />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                            <input type="password" id="password" value={password} onChange={(e) => setPass(e.target.value)} name='password' placeholder='Enter Password' autoComplete='OFF' />
                        </div>
                        <div className='submit btn'>
                            <input type='submit' onClick={logIn} id='submit' name='login' value='Log in' />
                        </div>
                        <NavLink className='forgot-password' to='#' >Forgot Password</NavLink>
                        <div  className='login-option'>
                            <p>or login with</p>
                            <i className="zmdi zmdi-facebook-box icon"></i>
                            <i className="zmdi zmdi-twitter-box icon"></i>
                            <i className="zmdi zmdi-google-plus-box icon"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;