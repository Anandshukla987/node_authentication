import React, { useContext, useEffect } from 'react';
import "../App.css";
import logo from '../images/OIP.jpeg';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(userContext);

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                dispatch({type: "USER", payload: true});
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    const NavBtn = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Log Out</NavLink>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Registration</NavLink>
                    </li>
                </>)
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img id='logo' src={logo} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {<NavBtn />}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;