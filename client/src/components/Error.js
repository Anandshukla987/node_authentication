import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const Error = () => {
    const params = useParams();
    const navigation = useNavigate();
    console.log(params.id);
    return (
        <div>
            <div className='errorPage'>
                <h1>404</h1>
                <div className='err-content'>
                    <h3>WE ARE SORRY, PAGE NOT FOUND!</h3>
                    <p>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.</p>
                    <button type="button" className="btn btn-warning" onClick={()=> navigation("")}>Back to Home Page</button>
                    {/* <NavLink to="/">Back to Home Page</NavLink> */}
                </div>
            </div>
        </div>
    )
}

export default Error