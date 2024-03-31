import React, { useEffect, useState } from 'react'
import MapDisplay from '../components/MapDisplay'
import MapController from '../components/MapController'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MapsPage() {
  const [isSelectedShape, setSelectedShape] = useState('')
  const [fileUploadData, setFileUploadData] = useState({
    fileType: '',
    fileData: '',
  })
  return (
    <div className="h-screen w-screen grid grid-cols-2">
      <MapDisplay
        isSelectedShape={isSelectedShape}
        fileUploadData={fileUploadData}
      ></MapDisplay>
      <MapController
        isSelectedShape={isSelectedShape}
        setSelectedShape={setSelectedShape}
        setFileUploadData={setFileUploadData}
      ></MapController>
    </div>
  )
}

export default MapsPage;
