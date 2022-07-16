import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../../utils/data';
import { client } from '../../client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import Spinner from '../Spinner/Spinner';
import styles from './UserProfile.module.css';
import userNotFoundImage from '../../assets/userNotFound.png';
import { StrictMode } from 'react';
import { Button, IconButton } from '@mui/material';


const randomImage = 'https://source.unsplash.com/1600x500/?nature,photography,technology'


const UserProfile = () => {

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const {userId} = useParams();


  const activeBtnStyles = {
    background: 'green',
    height: '30px',
    width: '100%',
    color: 'white',
  }


  const notActiveBtnStyles = {
    background: 'blue',
  }



  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query)
      .then(data => {
        setUser(data[0])
      })
  }, [userId])


  useEffect(() => {
    if(text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
        .catch(error => console.log(error))
      }

      else {
        const savedPinsQuery = userSavedPinsQuery(userId);
        
        client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })
        .catch(error => console.log(error))
      }
  
  }, [text, userId])
  
  

  const onSuccess = () => {
    console.log('Logout Successful');
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }




  if(!user) {
    return <Spinner message="Loading Profile" />
  }

  return (
    <div>
      <div className={styles.logoutBtn}>
        {
          userId === user?._id &&
          <GoogleLogout
          clientId = "517059918584-3u6htv4t7nuovnpn1mof20cqbph8apae.apps.googleusercontent.com"
          buttonText = 'Logout'
          onLogoutSuccess = { onSuccess }
          />
        }
      </div>

      <div className={styles.container}>
        <div style={{position: 'relative'}}>
          <img src={randomImage} alt="banner-picture" />
          <aside> <img src={user?.image ? user?.image : userNotFoundImage} /> </aside>
        </div>

        <div className={styles.user_details}>
          <h1> {user?.userName} </h1> 
        </div>

        <div className={styles.dualBtn}>

          <Button
            variant='contained'
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created')
            }}
            sx={{ 
              background: activeBtn === 'created' ? '#28003b' : 'transparent',
              color: activeBtn === 'created' ? 'white' : 'purple',
              '&:hover' : {
                background: activeBtn === 'created' ? '#28003b' : 'transparent',
              }
            }}
          > 
            Created
          </Button>


          <Button
            variant='contained'
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved')
            }}
            sx={{ 
              background: activeBtn !== 'created' ? '#28003b' : 'transparent',
              color: activeBtn !== 'created' ? 'white' : 'purple',
              '&:hover' : {
                background: activeBtn !== 'created' ? '#28003b' : 'transparent',
              }
            }}
          > 
            Saved
          </Button>
        </div>  


        <div style={{ marginTop: '5%'}}>
          {
            pins?.length ?
              <MasonryLayout pins={pins} /> :
              <div>
                <Spinner message="No pins found..." />
              </div>
          }
        </div>

      </div>
    </div>
  )
}

export default UserProfile