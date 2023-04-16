import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userprofile from '../images/user.png';

const About = () => {
  const [log, setlog] = useState(false);
  const [userData, setUserData] = useState({});
  const navigation = useNavigate();
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
        setlog(true);
        setUserData(data);
      }

    } catch (err) {
      console.log(err);
      navigation('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  const Rndr = () => {
    return (
      <>
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
                      <i className="zmdi zmdi-border-color" onClick={()=> navigation("/editAbout")}></i>
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
                            <p className="text-muted">{userData.phone}</p>
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
                        <div className="d-flex justify-content-start">
                          <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                          <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                          <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (<>{log ? <Rndr />

    : <h5>loading...</h5>}</>)

}

export default About;