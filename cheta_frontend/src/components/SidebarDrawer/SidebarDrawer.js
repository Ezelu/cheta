import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { HiMenu } from 'react-icons/hi';
import styles from './SidebarDrawer.module.css';
import Sidebar from '../Sidebar/Sidebar';
import { IconButton } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';



export default function SwipeableTemporaryDrawer({ user }) {

  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      className={styles.swipeableDrawer}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <div className={styles.togglerClose}>
        <IconButton size="large" sx={{color: '#28003b'}}>
          <AiFillCloseCircle onClick={toggleDrawer("left", false)}/>
        </IconButton>
      </div>

      <Sidebar user={user} />

    </Box>
  );





  return (
    <div>
        <React.Fragment key={"left"}>
          <IconButton size="large" sx={{color: '#28003b'}}>
            <HiMenu onClick={toggleDrawer("left", true)} className={styles.toogler} />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}






// import * as React from 'react';
// import Box from '@mui/material/Box';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
// import { HiMenu } from 'react-icons/hi';
// import styles from './SidebarDrawer.module.css';


// export default function SwipeableTemporaryDrawer({ setToggleSidebar }) {

//   const [state, setState] = React.useState({ left: false });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       Hello
//     </Box>
//   );

//   return (
//     <div>
//         <React.Fragment key={"left"}>
//           <Button onClick={toggleDrawer("left", true)}>
//             <HiMenu className={styles.toogler} onClick={() => setToggleSidebar(true)} />
//           </Button>
//           <SwipeableDrawer
//             anchor={"left"}
//             open={state["left"]}
//             onClose={toggleDrawer("left", false)}
//             onOpen={toggleDrawer("left", true)}
//           >
//             {list("left")}
//           </SwipeableDrawer>
//         </React.Fragment>
//     </div>
//   );
// }