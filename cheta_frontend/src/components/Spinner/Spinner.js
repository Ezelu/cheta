import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const style = {
  marginTop: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const Spinner = ({ message }) => {
  return (
    <div style={style}>
      <ThreeCircles
        color='#d06700'
        height={50}
        width={200}
      />

      <p> { message } </p> 
    </div>
  )
}

export default Spinner


// Audio, BallTriangle, Bars, Circles, CirclesWithBar, CradleLoader, Grid, Hearts, LineWave, MutatingDots, Oval, Plane, Puff, RevolvingDot, Rings, RotatingSquare, TailSpin, ThreeCircles, ThreeDots, Triangle, Watch 