import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../../assets/logo.png';
import { Avatar, Divider } from '@mui/material';
import styles from './Sidebar.module.css';
import { categories } from '../../utils/data';



const Sidebar = ({ user }) => {


  const isActiveStyle = () => ({
    fontWeight: 'bold',
    color: '#d06700',
    // color: '#28003b',
    fontSize: '1.1em'
  })
  
  
  const isNotActiveStyle = () => ({
  
  })
  










  return (
    <div className={styles.container}>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>

        <div className={styles.links}>
          <NavLink 
            to='/'
            style={ ({ isActive }) => isActive ? isActiveStyle() : isNotActiveStyle() }
            >
            <p> <RiHomeFill /> Home </p>
          </NavLink>

          <h3> DISCOVER CATEGORIES </h3>
          {
            categories.slice(0, categories.length - 1).map(category => (
              <NavLink 
                to={`/category/${category.name}`} 
                key={category.name}
                style={ ({ isActive }) => isActive ? isActiveStyle() : isNotActiveStyle() }
                >
                <p style={{display: 'flex', alignItems: 'center'}}> 
                  <Avatar src={category.image} sx={{height: 25, width: 25}} alt={category.name}/>
                  &nbsp; { category.name } 
                </p>
              </NavLink>
            ))
          }
        </div>
      </div>

      {/* {
        user && (
          <div className={styles.avatar}>
            <Link to={`user-profile/${user?._id}`}> 
              <Avatar src={user?.image} alt="profile" size="small" sx={{height: 30, width: 30, background: '#28003b'}} > 
                {user?.userName.split(" ")[0][0]}
              </Avatar>
            </Link>
            <p> {user?.userName} </p>
          </div>
        )
      } */}

    </div>
  )
}

export default Sidebar















// import React from 'react';
// import { NavLink, Link } from 'react-router-dom'
// import { RiHomeFill } from 'react-icons/ri';
// import { IoIosArrowForward } from 'react-icons/io';
// import logo from '../../assets/logo.png';
// import { Avatar, Divider } from '@mui/material';
// import styles from './Sidebar.module.css';
// import { categories } from '../../utils/data';



// const Sidebar = ({ user }) => {


//   const isActiveStyle = () => ({
//     fontWeight: 'bold',
//     color: '#d06700',
//     // color: '#28003b',
//     fontSize: '1.1em'
//   })
  
  
//   const isNotActiveStyle = () => ({
  
//   })
  










//   return (
//     <div className={styles.container}>
//       <div>
//         <Link to="/">
//           <img src={logo} alt="logo" className={styles.logo} />
//         </Link>

//         <div className={styles.links}>
//           <NavLink 
//             to='/'
//             style={ ({ isActive }) => isActive ? isActiveStyle() : isNotActiveStyle() }
//             >
//               {/* <RiHomeFill /> */}
//               <p> Home </p>
//           </NavLink>

//           <h3> DISCOVER CATEGORIES </h3>
//           {
//             categories.slice(0, categories.length - 1).map(category => (
//               <NavLink 
//                 to={`/category/${category.name}`} 
//                 key={category.name}
//                 style={ ({ isActive }) => isActive ? isActiveStyle() : isNotActiveStyle() }
//                 >
//                 <p> { category.name } </p>
//               </NavLink>
//             ))
//           }
//         </div>
//       </div>

//       {
//         user && (
//           <div className={styles.avatar}>
//             <Link to={`user-profile/${user?._id}`}> 
//               <Avatar src={user?.image} alt="profile" size="small" sx={{height: 30, width: 30, background: '#28003b'}} > 
//                 {user?.userName.split(" ")[0][0]}
//               </Avatar>
//             </Link>
//             <p> {user?.userName} </p>
//           </div>
//         )
//       }

//     </div>
//   )
// }

// export default Sidebar