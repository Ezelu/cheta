import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { Avatar, InputAdornment, TextField, Tooltip, Zoom } from '@mui/material';
import styles from './Navbar.module.css';


const Navbar = ({ searchTerm, setSearchTerm, user }) => {  
  
  const navigate = useNavigate()



  if(!user) return (
    <div className={styles.login}>
      <p> Login to make ncheta </p> 
      <Link to="/login"> <button> Login </button> </Link>
    </div>
  )

  return (
    <div>
      <div className={styles.user}>
        <TextField 
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder = "Search"
          size = 'small'
          fullWidth
          value = { searchTerm }
          onFocus = {() => navigate('/search')}
          InputProps = {{
            startAdornment: <InputAdornment position="start"> <IoMdSearch /> </InputAdornment>
          }}
        />

        <Link to={`user-profile/${user?._id}`}>
          <Avatar src={user?.image} className={styles.user_avatar} alt="user" sx={{height: 35, width: 35, background: '#28003b'}}>
            {user?.userName.split(" ")[0][0]}
          </Avatar>
        </Link>

        <Link to={`create-pin`}>
          <Tooltip title="Create Post" arrow TransitionComponent={Zoom}>
            <Avatar alt="create post" variant='rounded' sx={{
              height: 35, 
              width: 35, 
              background: '#d06700',
              transition: 'background 0.5s ease',
              '&:hover': {
                background: '#28003b'
              }
            }}>
              <IoMdAdd />
            </Avatar>
          </Tooltip>
        </Link>
      </div>

    </div>
  )
}

export default Navbar









// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { IoMdAdd, IoMdSearch } from 'react-icons/io'
// import { Avatar, InputAdornment, TextField, Tooltip, Zoom } from '@mui/material';
// import styles from './Navbar.module.css';


// const Navbar = ({ searchTerm, setSearchTerm, user }) => {  
  
//   const navigate = useNavigate()



//   // if(!user) return null;

//   return (
//     <div>
//       <div className={styles.user}>
//         <TextField 
//           type='text'
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder = "Search"
//           size = 'small'
//           fullWidth
//           value = { searchTerm }
//           onFocus = {() => navigate('/search')}
//           InputProps = {{
//             startAdornment: <InputAdornment position="start"> <IoMdSearch /> </InputAdornment>
//           }}
//         />

//         <Link to={`user-profile/${user?._id}`}>
//           <Avatar src={user?.image} className={styles.user_avatar} alt="user" sx={{height: 35, width: 35, background: '#28003b'}}>
//             {user?.userName.split(" ")[0][0]}
//           </Avatar>
//         </Link>

//         <Link to={`create-pin`}>
//           <Tooltip title="Create Post" arrow TransitionComponent={Zoom}>
//             <Avatar alt="create post" variant='rounded' sx={{
//               height: 35, 
//               width: 35, 
//               background: '#d06700',
//               transition: 'background 0.5s ease',
//               '&:hover': {
//                 background: '#28003b'
//               }
//             }}>
//               <IoMdAdd />
//             </Avatar>
//           </Tooltip>
//         </Link>
//       </div>

//     </div>
//   )
// }

// export default Navbar
