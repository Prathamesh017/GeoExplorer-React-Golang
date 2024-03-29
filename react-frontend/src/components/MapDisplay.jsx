import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  FeatureGroup,
  Circle,
  Polyline,
  useMap,
} from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { kml } from '@tmcw/togeojson'
import { GeoJSON } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MapDisplay({ isSelectedShape, fileUploadData,setFileUploadData }) {
  let isKML = fileUploadData.fileType
    ? fileUploadData.fileType === 'geoJSON'
      ? false
      : true
    : false
  const defaultGeoJSON = {
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
  }

  function MapChildContainer({ isSelectedShape }) {
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
    const [selectedPosition, setSelectedPosition] = useState({
      latitude: 0,
      longitude: 0,
    })
    const [multiPolygon, setMultiPolygon] = useState([])
  

    useMapEvents({
      click: (location) => {
        const { lat, lng } = location.latlng
        setMultiPolygon((existing) => [...existing, [lat, lng]])
        setSelectedPosition({ latitude: lat, longitude: lng })
      },
    })

    try {
      const data = fileUploadData.fileData
        ? isKML
          ? fileUploadData.fileData
          : JSON.parse(fileUploadData.fileData)
        : defaultGeoJSON 
      let convertedData
      if (isKML) {
        const kmlObj = new DOMParser().parseFromString(data, 'text/xml')
        convertedData = kml(kmlObj)
      } else {
        convertedData = data
      }
      // if(data!==defaultGeoJSON && fileUploadData){
      //   toast('File Upload Successfull', { type: 'success' })
      // }

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
                Marker Placed <br />
              </Popup>
            </Marker>
          ) : null}

          {/* CIRCLE */}
          {selectedPosition.latitude !== 0 && isSelectedShape === 'Circle' ? (
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Circular Layer Selected</Popup>
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
        ></MapChildContainer>
      </MapContainer>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  )
}

export default MapDisplay
