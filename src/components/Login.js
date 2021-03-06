import React,{ useState, useRef, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
// initiallizing a refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

//Load the contents of .env variables
require('dotenv').config();
const clientId = process.env.REACT_APP_CLIENT_ID;
//console.log(clientId);
const LOGIN_URL = '/api/v1/login';



const Login = (props) => {
    const [fullID, setFullID] = useState('');
    
    const onSuccess = (res) => {
     console.log('[Login Success] currentUser:', res.profileObj);
     props.setter(res.profileObj.email)
     props.logSetter(true);
     checkEmail(res);
     refreshTokenSetup(res);  
   };
   const onFailure = (res) => {
       console.log('[Login failed] res:', res);
       
   };
   const checkEmail = (res) => {
       const emailCopy = res.profileObj.email;
       if (emailCopy.includes('@njit.edu')) {
           props.setId(true);
           saveLoginData(res.profileObj.name,res.profileObj.givenName,
            res.profileObj.email,res.profileObj.image_url);
       }
       else{
           alert('You must sign in with a valid njit email')
       }
   };
   const saveLoginData = (name,nickname,email,image_url) => {
       const loginInfo = {
           email: email,
           name: name,
           nickname: nickname,
           image: image_url,
       };
       fetch(LOGIN_URL, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
         body: JSON.stringify(loginInfo)  
       }).then((response)=>response.json()).then((data)=>{
           if (({}).hasOwnProperty.call(data, 'match') && data.status === 3) {
               props.setMatchEmail(data.match);
           }
       });
   };
   //console.log(Email);
    return (
        <>
        
        <GoogleLogin
    clientId={clientId}
    buttonText="Log in with NJIT"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    style={{ marginTop: '100px' }}
    isSignedIN={true}
    theme='dark'
    />
    
        </>
        )
};

export default Login;