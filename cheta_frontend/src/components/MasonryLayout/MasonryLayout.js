import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from '../Pin/Pin';



const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 3,
  700: 2,
  400: 1,
}


const MasonryLayout = ({ pins }) => {
  return (
    <div>
      <Masonry breakpointCols={breakpointObj} className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
        {
          pins.map( pin => <Pin key={pin._id} pin={pin} /> )
        }
      </Masonry>
    </div>
  )
}

export default MasonryLayout























// import React from 'react';
// import Masonry from 'react-masonry-css';
// import Pin from '../Pin/Pin';



// const breakpointObj = {
//   default: 4,
//   3000: 6,
//   2000: 5,
//   1200: 4,
//   1000: 3,
//   700: 2,
//   400: 1,
// }


// const MasonryLayout = ({ pins }) => {
//   return (
//     <div>
//       <Masonry breakpointCols={breakpointObj}>
//         {
//           pins.map( pin => <Pin key={pin._id} pin={pin} /> )
//         }
//       </Masonry>
//     </div>
//   )
// }

// export default MasonryLayout