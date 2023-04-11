import './App.css'
import { useState, useEffect } from 'react';
import { LemonApp } from './lemon';
import WithPropsApp from './withProps';

//Create the HOC outside the component

const withMousePosition = (WrappedComponent) => {
  return (props) => {

    const [mousePosition, setMousePosition] = useState({
      x: 0,
      y: 0
    })

    useEffect(() => {

      const handleMousePositionChange = (e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        })
      }

      window.addEventListener('mousemove', handleMousePositionChange); //Add listener on mount

      return () => {
        window.removeEventListener('mousemove', handleMousePositionChange); //Remove listener on unmount
      }

    }, [])

    return <WrappedComponent {...props} mousePosition={mousePosition} />   // props refers to all the original props of the component
  };
};

const PanelMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <div className='BasicTracker'>
      <p>Mouse Position:</p>
      <div className='row'>
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
};

const PointMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  );
};

const PanelMouseTracker = withMousePosition(PanelMouseLogger); //Create enhanced versions of Components
const PointMouseTracker = withMousePosition(PointMouseLogger);

function App() {
  return (
    <div className='App'>
      <h1 className='Header'>Little Mau Restaurant 🍕 </h1>
      <PanelMouseTracker />
      <PointMouseTracker />
      <LemonApp />
      <WithPropsApp />
    </div>
  );
}

export default App;