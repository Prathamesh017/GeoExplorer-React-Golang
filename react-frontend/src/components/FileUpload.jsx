import { useState } from 'react'
import axios from "axios";
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';

function FileUpload({ setFileUploadData }) {
  const [fileType, setFileType] = useState("null")
  const [fileData, setFileData] = useState(null)
  const [error, setError] = useState(false)

  function handleSubmit() {
    if (!fileData || !fileType) {
      setError(true)
      return
    }
    setError(false)
    setFileUploadData({ fileData, fileType})
    setFileType("null")
    setFileData(null);
    document.getElementById("file-upload").value=""
  }
  async function handleSave() {
    try {
    const data = JSON.parse(localStorage.getItem('geoJSON'))
    const  token = JSON.parse(localStorage.getItem('token'))
     let config = {
       headers: { Authorization: `Bearer ${token}` },
     }
      await axios.post(
       `${process.env.REACT_APP_API_URL}/user`,
       data,
       config,
     )
     toast('File Upload ,Successfull', { type: 'success' })
    } catch (error) {
      console.log(error);
     toast('Couldnt Upload File,Refresh', { type: 'error' })
      
    }
 }
 



  
  async function handleUpload(e) {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = e.target.result
      setFileData(data)
    }
    reader.readAsText(e.target.files[0])
  }
  return (
    <div className="file-upload flex flex-col px-2">
      <h1 className="text-[#00cc99] text-xl">Upload GeoJSON/KML Files</h1>
      <select
        className="mt-2 p-1"
        onChange={(e) => {
          setFileType(e.target.value)
        }}
        value={fileType}
      >
        <option value="null" disabled selected>Select File Type</option>
        <option value="geoJSON">GEO JSON</option>
        <option value="KMLFiles">KML Files</option>
      </select>
      <div className="flex flex-col mt-2">
        <input
          type="file"
          id="file-upload"
          accept=".json,.kml,.kmz"
          onChange={(e) => {
            handleUpload(e)
          }}
        />
        <button
          onClick={handleSubmit}
          className="bg-[#00cc99]  text-slate-200 hover:text-slate-900 px-1 py-2 mt-2"
        >
          Upload
        </button>
        <button
              onClick={handleSave}
              className="w-full self-center mt-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-center  text-slate-200 hover:text-slate-900 px-1 py-2 mt-2"
            >
              Save Data
            </button>
      </div>
      {error && (
        <p className="text-red-700">Please Select Type and Upload Data</p>
     )}  
         <ToastContainer position="bottom-right" theme="colored" />
    </div>
  )
}

export default FileUpload
