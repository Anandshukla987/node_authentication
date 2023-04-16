import React, {useState , useEffect} from 'react';

const Contact = () => {
    const [userData, setUserData] = useState({name: '', email: '', phone: '', message:''});
  const callAboutPage = async () =>{
    try{
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    callAboutPage();
  }, []);

  const dataHandler = (e) => {
    
    const value = e.target.value;

    setUserData({...userData, message:value});
  }

  const formHandler = async (e) => {
    e.preventDefault();

    const {name, email, phone, message} = userData;
    const res = await fetch('/contact', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, phone, message
        })
    });

    const data = await res.json();
    if(!data){
        console.log("message not send");
    }
    else{
        alert("message sent");
        setUserData({...userData, message:""});
    }

  }

    return (
        <div className='contact-container'>
            <div className='info'>
                <div className='detail'>
                    <div>
                        <i className="zmdi zmdi-phone info-icon" />
                    </div>
                    <div>
                        <h5>Phone</h5>
                        <h6>9236000032</h6>
                    </div>
                </div>
                <div className='detail'>
                    <div>
                        <i className="zmdi zmdi-email info-icon" />
                    </div>
                    <div>
                        <h5>Email</h5>
                        <h6>abcd@technical.com</h6>
                    </div>
                </div>
                <div className='detail'>
                    <div>
                        <i className="zmdi zmdi-pin-drop info-icon" />
                    </div>
                    <div>
                        <h5>Address</h5>
                        <h6>123 Xyz, Abc</h6>
                    </div>
                </div>
            </div>
            <div className='connect-withUs'>
                <div className='connect-content'>
                    <h3>Get in Touch</h3>
                    <div className='user-input'>
                        <div>
                            <input type='text' placeholder='Your name' name='name' onChange={dataHandler} value={userData.name} />
                        </div>
                        <div>
                            <input type='text' placeholder='Your email' name='email' onChange={dataHandler} value={userData.email} />
                        </div>
                        <div>
                            <input type='text' placeholder='Your phone' name='phone' onChange={dataHandler} value={userData.phone} />
                        </div>
                    </div>
                    <div className='mssg'>
                        <textarea placeholder='message' name='message' onChange={dataHandler} value={userData.message} />
                    </div>
                    <div className='btn'>
                        <input type='submit' id='submit' onClick={formHandler} placeholder='Your name' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;