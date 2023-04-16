import React, {useEffect, useState} from 'react';

const Home = () => {

  const [userName, setUserName] = useState();
  const [show, setShow] = useState(false);
  const callHomePage = async () =>{
    try{
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setUserName(data.name);
      setShow(true);

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    callHomePage();
  }, []);


  return (
    <div className='home-page'>
        <div className='home-div'>
            <h3 className='pt-5'>Welcome</h3>
            <h1>{userName}</h1>
            <h2>{show ? "Happy, to see you back" :"Kindly Please login/register"}</h2>
        </div>
    </div>
  );
}

export default Home;