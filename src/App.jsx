import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";

const AnimatedRouteMap = (props) => {
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [walkerPosition, setWalkerPosition] = useState(0);

  useEffect(() => {
    const startPoint = { lat: 12.9716, lng: 77.5946 }; 
    const endPoint = { lat: 11.6643, lng: 78.1460 }; 
    
    const pathCoordinates = calculatePath(startPoint, endPoint);

    setPathCoordinates(pathCoordinates);

    const interval = setInterval(() => {
      setWalkerPosition((prevPosition) => {
        const nextPosition = prevPosition + 1;
        if (nextPosition >= pathCoordinates.length) {
          clearInterval(interval); 
          return prevPosition; 
        }
        return nextPosition; 
      });
    }, 1000); 

    return () => clearInterval(interval);
  }, []); 

  const calculatePath = (startPoint, endPoint) => {
    const numSteps = 100; 
    const path = [];
    for (let i = 0; i <= numSteps; i++) {
      const lat = startPoint.lat + (endPoint.lat - startPoint.lat) * (i / numSteps);
      const lng = startPoint.lng + (endPoint.lng - startPoint.lng) * (i / numSteps);
      path.push({ lat, lng });
    }
    console.log(path)
    return path;
  };

  return (
    <Map  google={props.google} initialCenter={{ lat:  12.5286, lng: 78.2437 }} zoom={8}>
      <Polyline
        path={pathCoordinates}
        options={{
          strokeColor: "blue",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />
      {pathCoordinates.length > 0 && walkerPosition < pathCoordinates.length && (
        <Marker
          position={pathCoordinates[walkerPosition]}
          icon={{
            url: "https://maps.google.com/mapfiles/kml/shapes/man.png",
            anchor: new props.google.maps.Point(32, 32),
            scaledSize: new props.google.maps.Size(32, 32),
          }}
        />
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyC4Op3fDP7lY0igr2PtetMtirE1PnOsnGA", 
})(AnimatedRouteMap);
