import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.css';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import UserProfile from '../components/UserProfile/UserProfile';
import Pins from './Pins/Pins';
import { client } from '../client';
import logo from '../assets/logo.png';
import { userQuery } from '../utils/data';
import SidebarDrawer from '../components/SidebarDrawer/SidebarDrawer';
import { Avatar } from '@mui/material';
import { fetchUser } from '../utils/fetchUser';



export default function Home () {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =  fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
    .then(data => setUser(data[0]))
    .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])
  
  


  return (
    <div className={styles.container}>
      <div className={styles.mobileSidebar}>
        <div>
          <aside> 
            <SidebarDrawer user={user && user}/>
          </aside>
          <aside className={styles.logo}> 
            <Link to='/'> <img src={logo} alt="logo" className={styles.logo}/> </Link>
          </aside>
          <aside className={styles.avatar}> 
            <Link to={`user-profile/${user?._id}`}> 
              <Avatar src={user?.image} alt="profile image" size="small" sx={{height: 30, width: 30}}> 
                {user?.userName.split(" ")[0][0]}
              </Avatar>
            </Link>
          </aside>
       </div>
      </div>




      <div className={styles.desktopSidebar}>
        <Sidebar user={user && user} />
      </div>



      <div ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />}/>
          <Route path='/*' element={<Pins user={user && user} />}/>
        </Routes>
      </div>

    </div>
  )
}
















// import React, { useEffect, useState, useRef } from 'react';
// import styles from './Home.module.css';
// import { HiMenu } from 'react-icons/hi';
// import { AiFillCloseCircle } from 'react-icons/ai';
// import { Link, Route, Routes } from 'react-router-dom';
// import Sidebar from '../components/Sidebar/Sidebar';
// import UserProfile from '../components/UserProfile/UserProfile';
// import Pins from './Pins/Pins';
// import { client } from '../client';
// import logo from '../assets/logo.png';
// import { userQuery } from '../utils/data';
// import SidebarDrawer from '../components/SidebarDrawer/SidebarDrawer';
// import { Avatar } from '@mui/material';
// import { fetchUser } from '../utils/fetchUser';



// export default function Home () {

//   const [toggleSidebar, setToggleSidebar] = useState(false);
//   const [user, setUser] = useState(null);
//   const scrollRef = useRef(null);

//   const userInfo =  fetchUser();

//   useEffect(() => {
//     const query = userQuery(userInfo?.googleId);

//     client.fetch(query)
//     .then(data => setUser(data[0]))
//     .catch(error => console.log(error));
//   }, []);


//   useEffect(() => {
//     scrollRef.current.scrollTo(0, 0)
//   }, [])
  
  


//   return (
//     <div className={styles.container}>
//       <div className={styles.mobileSidebar}>
//         <div>
//           <aside> 
//             <SidebarDrawer user={user && user}/>
//           </aside>
//           <aside className={styles.logo}> 
//             <Link to='/'> <img src={logo} alt="logo" className={styles.logo}/> </Link>
//           </aside>
//           <aside className={styles.avatar}> 
//             <Link to={`user-profile/${user?._id}`}> 
//               <Avatar src={user?.image} alt="profile image" size="small" sx={{height: 30, width: 30}}> 
//                 {user?.userName.split(" ")[0][0]}
//               </Avatar>
//             </Link>
//           </aside>
//        </div>
//       </div>




//       <div className={styles.desktopSidebar}>
//         <Sidebar user={user && user} />
//       </div>



//       <div ref={scrollRef}>
//         <Routes>
//           <Route path='/user-profile/:userId' element={<UserProfile />}/>
//           <Route path='/*' element={<Pins user={user && user} />}/>
//         </Routes>
//       </div>

//     </div>
//   )
// }





