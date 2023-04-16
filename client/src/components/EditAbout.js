import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userprofile from '../images/user.png';
import toBase64  from '../base64/base64';

const EditAbout = () => {
    const navigation = useNavigate();
    const [show, setShow] = useState(true);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setUserData(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                // setUserData(data);
            }

        } catch (err) {
            console.log(err);
            navigation('/about');
        }
    }

    const submit = async () => {
        try {
            const res = await fetch("/editAbout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();
            if (res.status === 401) {
                setShow(false);
            }
            else {
                setVerified(true);
                console.log(data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    let name, value;
    const editHandler = e => {

        name = e.target.name;
        value = e.target.value;
        setUserData({ ...userData, [name]: value });
        console.log(userData);
    };

    const save = async () => {
        const {name, phone, work, userImg} = userData;
        const res = await fetch("/editSave", {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, work, phone, userImg
            })
        });
        await res.json();
        if(res.status === 200){
            console.log("Update successfully");
            navigation('/');
        }
        else{
            console.log("Not Updated!")
        }
    }

    const handleDP = ()=>{
        document.querySelector('#profileImg').click();
    }

    
    
    const handleProfileImg =async (e)=>{
        name=e.target.name;
        value=e.target.files[0];
        setUserData({ ...userData, [name]: await toBase64(value) });
    }
    


    return (
        <>
            {verified ?
                <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white"
                                            style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                            <img src={userData.userImg}
                                                alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} 
                                                onClick={handleDP}/>
                                            <input type='file' className='hide' id='profileImg' onChange={handleProfileImg}
                                            name='userImg'/>
                                            <div className="input-box">
                                                <input type="text" id="name" name="name" value={userData.name}
                                                    onChange={editHandler} />
                                            </div>
                                            <div className="input-box">
                                                <input type="text" id="work" name="work" value={userData.work}
                                                    onChange={editHandler} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4 ">
                                                <h6>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">{userData.email}</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Phone</h6>
                                                        <div className="input-box">
                                                            <input type="number" id="phone" name="phone" value={userData.phone}
                                                                onChange={editHandler} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h6>Projects</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Recent</h6>
                                                        <p className="text-muted">Lorem ipsum</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Most Viewed</h6>
                                                        <p className="text-muted">Dolor sit amet</p>
                                                    </div>
                                                </div>
                                                <div className='submit btn'>
                                                    <input type='submit' onClick={save} id='submit' name='Save' value='Save' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> :
                <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white"
                                            style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                            <img src={userData.userImg || userprofile}
                                                alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                            <h5>{userData.name}</h5>
                                            <p>{userData.work}</p>
                                            <i className="far fa-edit mb-5"></i>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h4>Verify Password</h4>
                                                <hr className="mt-0 mb-4" />
                                                <div style={{ color: "red" }} >
                                                    <h6>{show ? "" : "Wrong Password !"}</h6>
                                                </div>
                                                <div className="input-box">
                                                    <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                                    <input type="password" id="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' autoComplete='OFF' />
                                                </div>
                                            </div>
                                            <div className='submit btn'>
                                                <input type='submit' onClick={submit} id='submit' name='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default EditAbout