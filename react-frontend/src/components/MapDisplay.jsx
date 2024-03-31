import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  useMap,
} from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { kml } from '@tmcw/togeojson'
import { GeoJSON } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

let defaultGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Mumbai',
        'marker-color': '#ff0000',
        'marker-symbol': 'star',
      },
      geometry: {
        type: 'Point',
        coordinates: [72.8777, 19.076],
      },
    },
   
  ],
}
function generateCircle(center, radius) {
  const numSegments = 64 // Number of line segments to approximate a circle

  const coordinates = []

  for (let i = 0; i < numSegments; i++) {
    const angle = (Math.PI * 2 * i) / numSegments
    const x = center[0] + radius * Math.cos(angle)
    const y = center[1] + radius * Math.sin(angle)
    coordinates.push([x, y])
  }

  // Close the circle
  coordinates.push(coordinates[0])

  return [coordinates]
}

function MapDisplay({ isSelectedShape, fileUploadData, setFileUploadData }) {
  const navigate = useNavigate()
  const [location, setLocation] = useState(defaultGeoJSON)
  const getMaps = async () => {
    try {
      let token = JSON.parse(localStorage.getItem('token'))
      if (!token) {
        navigate('/')
        return
      }
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user`,
        config,
      )

      const locations = response.data.user.location
      setLocation({
        ...location,
        features: [...location.features, ...locations],
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMaps()
  }, [])
  let isKML = fileUploadData.fileType
    ? fileUploadData.fileType === 'geoJSON'
      ? false
      : true
    : false

  function MapChildContainer({ location, isSelectedShape }) {
    const map = useMap()
    useEffect(() => {
      const provider = new OpenStreetMapProvider()
      const searchControl = new GeoSearchControl({
        provider: provider,
        position: 'topright',
        autoComplete: true,
        autoCompleteDelay: 250,
        style: 'button',
        showMarker: true,
        autoClose: true,
        searchLabel: 'Enter Location To Search',
      })
      map.addControl(searchControl)
      return () => map.removeControl(searchControl)
    }, [])
    // const [selectedPosition, setSelectedPosition] = useState({
    //   latitude: 0,
    //   longitude: 0,
    // })

    // const [multiPolygon, setMultiPolygon] = useState([])

    useMapEvents({
      click: (loc) => {
        const { lat, lng } = loc.latlng
        if (isSelectedShape === 'Circle' || isSelectedShape === 'Point') {
          const feature = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: isSelectedShape === 'Point' ? 'Point' : 'Polygon',
              coordinates:
                isSelectedShape === 'Point'
                  ? [lng, lat]
                  : generateCircle([lng, lat], 1),
            },
          }
          setLocation({
            ...location,
            features: [...location.features, feature],
          })
          localStorage.setItem(
            'geoJSON',
            JSON.stringify([...location.features, feature]),
          )
        } else {
          const arr = location
          const lastObj = arr.features[arr.features.length - 1]
          if (lastObj.geometry.type === 'LineString') {
            const lastLLObj = arr.features.pop()
            lastLLObj.geometry.coordinates.push([lng, lat])
            setLocation({
              ...location,
              features: [...arr.features, lastLLObj],
            })
            localStorage.setItem(
              'geoJSON',
              JSON.stringify([...arr.features, lastLLObj]),
            )
          } else {
            const feature = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [[lng, lat]],
              },
            }

            setLocation({
              ...location,
              features: [...location.features, feature],
            })
            localStorage.setItem(
              'geoJSON',
              JSON.stringify([...location.features], feature),
            )
          }
        }
      },
    })

    try {
      const data = fileUploadData.fileData
        ? isKML
          ? fileUploadData.fileData
          : JSON.parse(fileUploadData.fileData)
        : location
      let convertedData
      if (isKML) {
        const kmlObj = new DOMParser().parseFromString(data, 'text/xml')
        convertedData = kml(kmlObj)
      } else {
        convertedData = data
      }
      if (fileUploadData.fileData) {
        
        convertedData = {
          ...convertedData,
          features: [...convertedData.features, ...location.features],
        }
        localStorage.setItem(
          'geoJSON',
          JSON.stringify(convertedData.features),
        )

         
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
          {/* {selectedPosition.latitude !== 0 && isSelectedShape === 'Point' ? (
            <Marker
              key={`marker-selectedPosition[0]`}
              position={[selectedPosition.latitude, selectedPosition.longitude]}
            >
              <Popup>
                Marker Placed <br />
              </Popup>
            </Marker>
          ) : null} */}

          {/* CIRCLE */}
          {/* {selectedPosition.latitude !== 0 && isSelectedShape === 'Circle' ? (
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Circular Layer Selected</Popup>
              <Circle
                key={`circle-selectedPosition[0]`}
                center={[selectedPosition.latitude, selectedPosition.longitude]}
                radius={100000}
              />
            </FeatureGroup>
          ) : null} */}
          {/* {multiPolygon.length >= 2 && isSelectedShape === 'Line' ? (
            <Polyline
              pathOptions={{
                color: 'lime',
                weight: 2,
                opacity: 1,
              }}
              positions={multiPolygon}
            />
          ) : null} */}
        </>
      )
    } catch {
      toast('Invalid File Format,Refresh', { type: 'error' })
    }
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
          location={location}
        ></MapChildContainer>
      </MapContainer>


      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  )
}

export default MapDisplay
