import React, { useEffect } from 'react';
import styles from './Login.module.css';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../../assets/share.mp4';
import logo from '../../assets/logowhite.png';
import { gapi } from 'gapi-script'

import { client } from '../../client';



export default function Login () {

  const navigate = useNavigate()

  // Initializing the client
  useEffect(() => {
    function start () {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_AUTH_API_TOKEN,
        scope: "",
      })
    }
    gapi.load('client:auth2', start)
  }, [])



  const onSuccess = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName : name,
      image: imageUrl
    }

    // Create a user document if it doesn't exist
    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })
      .catch(error => console.log(error))
  }



  const onFailure = (response) => {
    console.log(response)
  }













  return (
    <div className={styles.container}>
      <article>
        <div className={styles.video}>
          <video 
            src={shareVideo}
            type = "video/mp4"
            loop
            controls={false}
            muted
            autoPlay
          />
        </div>

        <section>
          <div>
            <img src={logo} />
          </div>
          
          <div className={styles.google_login}>
            <GoogleLogin 
              clientId = "517059918584-3u6htv4t7nuovnpn1mof20cqbph8apae.apps.googleusercontent.com"
              buttonText = 'Sign In with Google'
              onSuccess = { onSuccess }
              onFailure = { onFailure }
              cookiePolicy = { 'single_host_origin' }
              isSignedIn = { true }
            />
          </div>
        </section>
      </article>

    </div>
  )
}


















// import React, { useEffect } from 'react';
// import styles from './Login.module.css';
// import GoogleLogin from 'react-google-login';
// import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
// import shareVideo from '../../assets/share.mp4';
// import logo from '../../assets/logowhite.png';
// import { gapi } from 'gapi-script'




// const Login = () => {


//   // Initializing the client
//   useEffect(() => {
//     function start () {
//       gapi.client.init({
//         clientId: "517059918584-3u6htv4t7nuovnpn1mof20cqbph8apae.apps.googleusercontent.com",
//         scope: "",
//       })
//     }

//     gapi.load('client:auth2', start)
//   }, [])


//   const onSuccess = (response) => {
//     localStorage.setItem('user', JSON.stringify(response.profileObj));

//     const { name, googleId, imageUrl } = response.profileObj;

//     const doc = {
//       _id: googleId,
//       _type: 'user',
//       userName : name,
//       image: imageUrl
//     }
//   }

//   const onFailure = (response) => {
    
//   }













//   return (
//     <div className={styles.container}>
//       <div className={styles.video}>
//         <video 
//           src={shareVideo}
//           type = "video/mp4"
//           loop
//           controls={false}
//           muted
//           autoPlay
//         />
//       </div>

//       <section>
//         <div>
//           <img src={logo} />
//         </div>
        
//         <div className={styles.google_login}>
//           <GoogleLogin 
//             clientId = "517059918584-3u6htv4t7nuovnpn1mof20cqbph8apae.apps.googleusercontent.com"
//             buttonText = 'Sign In with Google'
//             onSuccess = { onSuccess }
//             onFailure = { onFailure }
//             cookiePolicy = { 'single_host_origin' }
//             isSignedIn = { true }
//           />
//         </div>
//       </section>

//     </div>
//   )
// }

// export default Login