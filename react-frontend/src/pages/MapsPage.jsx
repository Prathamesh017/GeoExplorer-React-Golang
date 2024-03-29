import React, { useEffect, useState } from 'react'
// import Map from '../components/MapDisplay'
import MapDisplay from '../components/MapDisplay'
import MapController from '../components/MapController'
// import MapController from '../components/MapController'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

function ImagePage() {
  const [isSelectedShape, setSelectedShape] = useState('')
  const [fileUploadData, setFileUploadData] = useState({
    fileType: '',
    fileData: '',
  })
  // const navigate=useNavigate();
  // const [user,setUser]=useState("");
  // const [imgs,setImgs]=useState([]);

  const getMaps = async () => {
    try {
      //   let user=JSON.parse(localStorage.getItem("user"));
      //   if(!user){
      //    navigate("/");
      //    return;
      // }
      // setUser(user);
      // let config = {
      //   headers: { Authorization: `Bearer ${user.meta.access_token}` },
      // }
      // const response = await axios.get(
      //   `${process.env.REACT_APP_API_URL}/api/image/${user.data.id}`,
      //   config,
      // )
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMaps()
  }, [])
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

export default ImagePage
