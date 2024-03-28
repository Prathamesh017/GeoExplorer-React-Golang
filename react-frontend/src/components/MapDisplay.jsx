import React, { useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  FeatureGroup,
  Circle,
  Polyline,
} from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { kml } from '@tmcw/togeojson'
import { useMapEvents } from 'react-leaflet/hooks'

function MapDisplay({ isSelectedShape }) {
  let isKML = false
  const kmlText = `<?xml version="1.0" encoding="UTF-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
       <Placemark>
         <name>London</name>
         <description>Capital city of the United Kingdom</description>
         <Polygon>
           <outerBoundaryIs>
             <LinearRing>
               <coordinates>
                 -0.5103759765625,51.28676067579748,0 
                 -0.5103759765625,51.69199857120281,0
                 0.33447265625,51.69199857120281,0 
                 0.33447265625,51.28676067579748,0 
                 -0.5103759765625,51.28676067579748,0
               </coordinates>
             </LinearRing>
           </outerBoundaryIs>
         </Polygon>
        </Placemark>
     </Document>
   </kml>
   `
  const geoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [77.2436, 28.6159], // Longitude, Latitude of stadium 1
        },
        properties: {
          name: 'Eden Gardens',
          city: 'Kolkata',
          capacity: 66000,
          sports: ['Cricket'],
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [77.5928, 12.9786], // Longitude, Latitude of stadium 2
        },
        properties: {
          name: 'M. Chinnaswamy Stadium',
          city: 'Bengaluru',
          capacity: 38000,
          sports: ['Cricket'],
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [72.8258, 18.9402], // Longitude, Latitude of stadium 3
        },
        properties: {
          name: 'Wankhede Stadium',
          city: 'Mumbai',
          capacity: 33000,
          sports: ['Cricket'],
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [77.1711, 28.6129], // Longitude, Latitude of stadium 4
        },
        properties: {
          name: 'Feroz Shah Kotla Ground',
          city: 'Delhi',
          capacity: 41000,
          sports: ['Cricket'],
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [77.6271, 12.9784], // Longitude, Latitude of stadium 5
        },
        properties: {
          name: 'M. A. Chidambaram Stadium',
          city: 'Chennai',
          capacity: 50000,
          sports: ['Cricket'],
        },
      },
    ],
  }

  function MapChildContainer({ isSelectedShape }) {
    const [selectedPosition, setSelectedPosition] = useState({
      latitude: 0,
      longitude: 0,
    })
    const [multiPolygon, setMultiPolygon] = useState([])

    const map = useMapEvents({
      click: (location) => {
        console.log(location)
        const { lat, lng } = location.latlng
        setMultiPolygon((existing) => [...existing, [lat, lng]])
        console.log(multiPolygon)

        
        setSelectedPosition({ latitude: lat, longitude: lng })
      },
    })
    const data = isKML ? kmlText : geoJSON
    let convertedData
    if (isKML) {
      const kmlObj = new DOMParser().parseFromString(data, 'text/xml')
      convertedData = kml(kmlObj)
    } else {
      convertedData = data
    }

    return (
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        <GeoJSON
          key={`geo-json-3-selectedPosition[0]`}
          data={convertedData}
        ></GeoJSON>

        {/* MARKER */}
        {selectedPosition.latitude !== 0 && isSelectedShape === 'Point' ? (
          <Marker
            key={`marker-selectedPosition[0]`}
            position={[selectedPosition.latitude, selectedPosition.longitude]}
          >
            <Popup>
              A pretty CSS3 popup.zz <br /> Easily customizable.
            </Popup>
          </Marker>
        ) : null}

        {/* CIRCLE */}
        {selectedPosition.latitude !== 0 && isSelectedShape === 'Circle' ? (
          <FeatureGroup pathOptions={{ color: 'purple' }}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle
            
              key={`circle-selectedPosition[0]`}
              center={[selectedPosition.latitude, selectedPosition.longitude]}
              radius={100000}
            />
          </FeatureGroup>
        ) : null}
        {multiPolygon.length >= 2 && isSelectedShape === 'Line' ? (
          <Polyline
            pathOptions={{
              color: 'lime',
              weight: 2,
              opacity: 1,
            }}
            positions={multiPolygon}
          />
        ) : null}
      </>
    )
  }

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <MapContainer
        style={{ height: '100%', minHeight: '100%' }}
        center={[0, 0]}
        zoom={2}
      >
        <MapChildContainer
          isSelectedShape={isSelectedShape}
        ></MapChildContainer>
      </MapContainer>
    </div>
  )
}

export default MapDisplay
