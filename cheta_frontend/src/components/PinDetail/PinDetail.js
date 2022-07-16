import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PinDetail.module.css';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../../client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../../utils/data';
import Spinner from '../Spinner/Spinner';
import { Avatar, Divider, IconButton, InputAdornment, TextField, Tooltip, Zoom } from '@mui/material';
import { FiSend } from 'react-icons/fi';
import { RiArrowGoBackFill } from 'react-icons/ri'



export default function PinDetail ({ user }) {

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams();
  const navigate = useNavigate();



  console.log(pinDetail)



  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        })
        // .then(() => window.location.reload())
    }
  };


  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };




  useEffect(() => {
    fetchPinDetails()
  }, [ pinId ])
  
  
  
  if(!pinDetail) return <Spinner message={'Bringing Post details :) '} />
  
  return (
    <>
    <div className={styles.container}>

      <div className={styles.image_container}>
        <section>
        <Tooltip title="Back" arrow TransitionComponent={Zoom}>
            <IconButton sx={{color: '#28003b', marginBottom: '2%'}} onClick={() => navigate(-1)}>
              <RiArrowGoBackFill />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download" arrow TransitionComponent={Zoom}>
            <a 
              href={`${pinDetail?.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              > 
              <IconButton className={styles.download} sx={{color: 'black'}}>
                <MdDownloadForOffline />
              </IconButton>
            </a>
          </Tooltip>
        </section>
        <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="Pin image" />
      </div>

      <div className={styles.details}>

        <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
          <section className={styles.user_main_avatar}>
            <Avatar 
            src={pinDetail?.postedBy?.image} 
            alt={pinDetail?.postedBy?.userName}
            sx={{height: 25, width: 25, background: '#28003b'}}>

              {pinDetail?.postedBy?.userName.split(" ")[0][0]}
            </Avatar>
            <b> <small> &nbsp; {pinDetail?.postedBy?.userName} </small> </b>
          </section>
        </Link>


        <h2> { pinDetail.title } </h2>
        <i> { pinDetail?.category } </i> 
        <p> { pinDetail?.about } </p> 

        <h3> Comments </h3>
        <div className={styles.comments}>
        {
            user && 
              <div className={styles.create_comment}>
              <TextField
                type='text'
                size='small'
                label="Make a comment"
                value = { comment }
                InputProps={{ 
                  endAdornment: 
                    <InputAdornment position="start">
                      <IconButton 
                        size='small'
                        disabled={!comment.trim().length > 0 || addingComment} 
                        onClick={addComment}
                      >
                        <FiSend />
                      </IconButton>
                    </InputAdornment>
                }}
                onChange = { (e) => setComment(e.target.value) }
                fullWidth
                InputLabelProps={{style : {color : '#28003b'} }}
                sx ={{
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid rgb(40, 0, 59)",
                    borderRadius: "5px 5px 0 0"
                  },
                }}           
              />
            </div>
          }

          { 
            !pinDetail?.comments ? 
            <i style={{color: 'grey'}}> Be the first to comment </i> :
            ( 
              pinDetail.comments.map((comment, i) => {
                return (
                  <div key={i} className={styles.comment}>
                  <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
                    <section className={styles.user_avater}>
                      <Avatar 
                      src={comment?.postedBy?.image} 
                      alt={comment?.postedBy?.userName}
                      sx={{height: 25, width: 25, background: '#28003b'}}>

                        {comment?.postedBy?.userName.split(" ")[0][0]}
                      </Avatar>
                      <i> <b> <small> &nbsp; {comment?.postedBy?.userName} </small> </b>  </i> 
                    </section>
                  </Link>

                    <p> {comment.comment} </p>
                    <Divider />
                  </div>
                  )
              }))
          }

          
        </div>
      </div>

    </div>
    {
      (pins?.length > 0 ) ? (
        <div className={styles.more}>
          <h2> More under {pinDetail?.category} </h2>
          <MasonryLayout pins={pins} />
        </div>
      ) : 
      (
        <Spinner message="Seems like we're all caught up, but let's keey trying..." />
      ) 

    }
    </>
  )
}
















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './PinDetail.module.css';
// import { MdDownloadForOffline } from 'react-icons/md';
// import { Link, useParams } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { client, urlFor } from '../../client';
// import MasonryLayout from '../MasonryLayout/MasonryLayout';
// import { pinDetailMorePinQuery, pinDetailQuery } from '../../utils/data';
// import Spinner from '../Spinner/Spinner';
// import { Avatar, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
// import { FiSend } from 'react-icons/fi';
// import { RiArrowGoBackFill } from 'react-icons/ri'



// export default function PinDetail ({ user }) {

//   const [pins, setPins] = useState(null);
//   const [pinDetail, setPinDetail] = useState(null);
//   const [comment, setComment] = useState('');
//   const [addingComment, setAddingComment] = useState(false)
//   const { pinId } = useParams();
//   const navigate = useNavigate();







//   const addComment = () => {
//     if (comment) {
//       setAddingComment(true);

//       client
//         .patch(pinId)
//         .setIfMissing({ comments: [] })
//         .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
//         .commit()
//         .then(() => {
//           fetchPinDetails();
//           setComment('');
//           setAddingComment(false);
//         });
//     }
//   };


//   const fetchPinDetails = () => {
//     const query = pinDetailQuery(pinId);

//     if (query) {
//       client.fetch(`${query}`).then((data) => {
//         setPinDetail(data[0]);
//         console.log(data);
//         if (data[0]) {
//           const query1 = pinDetailMorePinQuery(data[0]);
//           client.fetch(query1).then((res) => {
//             setPins(res);
//           });
//         }
//       });
//     }
//   };




//   useEffect(() => {
//     fetchPinDetails()
//   }, [ pinId ])
  
  
  
//   if(!pinDetail) return <Spinner message={'Bringing Post details :) '} />
  
//   return (
//     <div className={styles.container}>

//       <div className={styles.image_container}>
//           <IconButton sx={{color: '#28003b', marginBottom: '2%'}} onClick={() => navigate(-1)}>
//             <RiArrowGoBackFill />
//           </IconButton>
//         <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="Pin image" />
//       </div>

//       <div className={styles.details}>

//         <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
//           <section className={styles.user_main_avatar}>
//             <Avatar 
//             src={pinDetail?.postedBy?.image} 
//             alt={pinDetail?.postedBy?.userName}
//             sx={{height: 25, width: 25, background: '#28003b'}}>

//               {pinDetail?.postedBy?.userName.split(" ")[0][0]}
//             </Avatar>
//             <b> <small> &nbsp; {pinDetail?.postedBy?.userName} </small> </b>
//           </section>
//         </Link>


//         <h2> { pinDetail.title } </h2>
//         <i> { pinDetail?.category } </i> 
//         <p> { pinDetail?.about } </p> 

//         <h3> Comments </h3>
//         <div className={styles.comments}>
//         {
//             user && 
//               <div className={styles.create_comment}>
//               <TextField
//                 type='text'
//                 size='small'
//                 label="Make a comment"
//                 value = { comment }
//                 InputProps={{ 
//                   endAdornment: 
//                     <InputAdornment position="start">
//                       <IconButton 
//                         size='small'
//                         disabled={!comment.trim().length > 0 || addingComment} 
//                         onClick={addComment}
//                       >
//                         <FiSend />
//                       </IconButton>
//                     </InputAdornment>
//                 }}
//                 onChange = { (e) => setComment(e.target.value) }
//                 fullWidth
//                 InputLabelProps={{style : {color : '#28003b'} }}
//                 sx ={{
//                   "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     border: "2px solid rgb(40, 0, 59)",
//                     borderRadius: "5px 5px 0 0"
//                   },
//                 }}           
//               />
//             </div>
//           }

//           { 
//             !pinDetail?.comments ? 
//             <i style={{color: 'grey'}}> Be the first to comment </i> :
//             ( 
//               pinDetail.comments.map((comment, i) => {
//                 return (
//                   <div key={i} className={styles.comment}>
//                   <Link to={`/user-profile/${pinDetail?.postedBy?._id}`}>
//                     <section className={styles.user_avater}>
//                       <Avatar 
//                       src={comment?.postedBy?.image} 
//                       alt={comment?.postedBy?.userName}
//                       sx={{height: 25, width: 25, background: '#28003b'}}>

//                         {comment?.postedBy?.userName.split(" ")[0][0]}
//                       </Avatar>
//                       <i> <b> <small> &nbsp; {comment?.postedBy?.userName} </small> </b>  </i> 
//                     </section>
//                   </Link>

//                     <p> {comment.comment} </p>
//                     <Divider />
//                   </div>
//                   )
//               }))
//           }

          
//         </div>
//       </div>



//     </div>
//   )
// }

















