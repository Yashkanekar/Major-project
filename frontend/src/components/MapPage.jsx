// "pk.eyJ1IjoieWFzaGthbmVrYXIiLCJhIjoiY2tybmtwY3NkMXg1ajMxcGVtOHo5aGhpNiJ9.3cmOSr3XR555YERjLw0brw"
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map-styles.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g';

const MapPage = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [73.0267,19.0421],
      zoom: 12,
    });
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      // unit: 'metric',
      // profile: 'mapbox/driving',
    });
    map.addControl(directions, 'top-left');
  });

  
  return ( 
    <div>
      <div className='mapWrapper' id="map" />
    </div>
  ) 
};
export default MapPage;
