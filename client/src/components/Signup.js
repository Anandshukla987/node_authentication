import React,{ useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signUp from '../images/signup.png'

const Signup = () => {
    const navigation = useNavigate();
    const [user,setUser] = useState({
        name: '', email: '', phone: '', work: '', password: '', cpassword: ''
    });
    let name,value;
    const handleInputs = e => {
        // console.log(e);
        
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value});
    };

    const postData = async (e) => {
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Sorry User not register Try again");
            // console.log("Sorry User not register Try again")
        }
        else{
            window.alert("Congratulation User registered Successfully");
            // console.log("Congratulation User registered Successfully")

            navigation("/login");
        }
    }

    return (
        <div className="main-container">
            <section className="signup">
                <div className="container mt-6">
                    <div className="signup-content">
                        <h2 className="form-title">Sign up</h2>
                        <div className="form">
                            <form method='POST' className="register-form" id='register-form'>
                                <div className="input-box">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account"></i>
                                    </label>
                                    <input type="text" id="name" name="name" value={user.name} 
                                    onChange={handleInputs} placeholder='Enter Name' /> 
                                </div>
                                <div className="input-box">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input type="email" required id="email" name='email' value={user.email}
                                    onChange={handleInputs} placeholder='Enter Email'
                                     />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="phone"><i className="zmdi zmdi-phone"></i>
                                    </label>
                                    <input type="number" id="phone" name='phone' placeholder='Enter Phone No.'
                                    value={user.phone}
                                    onChange={handleInputs} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="work"><i className="zmdi zmdi-case"></i>
                                    </label>
                                    <input type="text" id="work" name='work' placeholder='Enter Work'
                                    value={user.work}
                                    onChange={handleInputs} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" id="password" name='password' placeholder='Enter Password'
                                    value={user.password}
                                    onChange={handleInputs} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="cpassword"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" id="cpassword" name='cpassword' placeholder='Enter Confirm Password'
                                    value={user.cpassword}
                                    onChange={handleInputs} />
                                </div>
                                <div className='submit btn'>
                                    <input type='submit' onClick={postData} id='submit' name='submit'/>
                                </div>
                            </form>
                            <div className='signup-img'>
                                <figure>
                                    <img src={signUp} alt='signUP'/>
                                </figure>
                                <NavLink className="nav-link lnk" to="/login">I am already Registered</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Signup;