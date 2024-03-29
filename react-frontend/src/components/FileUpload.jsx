import { useState } from 'react'

function FileUpload({ setFileUploadData }) {
  const [fileType, setFileType] = useState("null")
  const [fileData, setFileData] = useState(null)
  const [error, setError] = useState(false)

  function handleSubmit() {
    if (fileData === '' || fileType === '') {
      setError(true)
  
      return
    }
    setError(false)
    setFileUploadData({ fileData, fileType})
    setFileType("null")
    document.getElementById("file-upload").value=""
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
      </div>
      {error && (
        <p className="text-red-700">Please Select Type and Upload Data</p>
      )}
      
    </div>
  )
}

export default FileUpload
