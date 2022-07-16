import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { Avatar, IconButton, Tooltip, Zoom } from '@mui/material';
import { client, urlFor } from '../../client';
import styles from './Pin.module.css';
import { fetchUser } from '../../utils/fetchUser';







export default function Pin ({ pin: {postedBy, save, image, _id, destination} }) {

  const user =  fetchUser();
  const [postHovered, setPostHovered] = useState(window.innerWidth <= 700)
  const [savingPost, setSavingPost] = useState(false)
  const navigate = useNavigate();
  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;

  
  const savePin = (id) => {
    if(!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload()
          setSavingPost(false)
        })
    }
  }



  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => window.location.reload())
  }




  return (
    <div className={styles.Pin_container}>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(window.innerWidth <= 700)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className={styles.pin}
      >
        <img src={urlFor(image).width(450).url()}/>
        {
          postHovered && (
            <div className={styles.actions}>
              <div className={styles.action_div}>
                <div className={styles.action_div_inner}>
                  <Tooltip title="Download" arrow TransitionComponent={Zoom}>
                    <a 
                      href={`${image?.asset?.url}?dl=`}
                      download
                      onClick={(e) => e.stopPropagation()}
                      > 
                      <IconButton className={styles.download} size='small'>
                        <MdDownloadForOffline />
                      </IconButton>
                    </a>
                  </Tooltip>
                </div>
                
                {
                  alreadySaved ? 
                  (<button className={styles.btn} id="blue">
                      {save?.length} Saved
                    </button>): 

                  (<button className={styles.btn} id="red"
                    onClick = {(e) => { 
                      e.stopPropagation();
                      savePin(_id);
                    }}
                  > 
                    {savingPost ? 'Saving' : 'Save'}
                  </button>)
                }
              </div>

              <div className={styles.destination}>
                {
                  destination && (
                    <a href={destination} target="_blank" rel='noreferrer'
                    onClick= { (e) => e.stopPropagation()}
                    >
                      <BsFillArrowUpRightCircleFill /> &nbsp;
                      {
                        destination.length > 20 ?
                        destination.slice(8, 20) :
                        destination.slice(8)
                      }
                    </a> 
                  )
                }

                {
                  postedBy?._id === user?.googleId && (
                    <button
                    onClick = {(e) => { 
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    >
                      <AiTwotoneDelete />
                    </button>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      
      <div className={styles.post_info}>
        <aside>
          <Link to={`/user-profile/${postedBy?._id}`}>
            <Avatar src={postedBy?.image} className={styles.user_avatar} alt="user" sx={{height: 25, width: 25, background: '#28003b'}}>
              {postedBy?.userName.split(" ")[0][0]}
            </Avatar>
            <b> <small> {postedBy?.userName} </small> </b>
          </Link>
        </aside>
      </div>

    </div>
  )
}
