import React from 'react'
import Cicle from '../shapes/circle'
import Line from '../shapes/line'
import Point from '../shapes/point'
import FileUpload from './FileUpload'
import { useNavigate } from 'react-router-dom'

function MapController({
  isSelectedShape,
  setSelectedShape,
  setFileUploadData,
}) {
  const navigate = useNavigate()
  function shapeOnClick(shape) {
    shape === isSelectedShape ? setSelectedShape('') : setSelectedShape(shape)
  }

  function Logout() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="w-full  flex flex-row gap-2 bg-gradient-to-br  from-gray-200 to-gray-300">
      <div className="w-full  flex-1  mt-10">
        <h1 className="text-center text-xl text-[#00cc99]">
          Choose Shapes To Add
        </h1>

        <div className="flex justify-between  gap-4 mt-4">
          <button
            onClick={() => {
              shapeOnClick('Circle')
            }}
            className={`border  flex items-center p-2 ${
              isSelectedShape === 'Circle' ? 'border-sky-700' : ''
            }`}
          >
            <Cicle></Cicle>
          </button>
          <button
            onClick={() => {
              shapeOnClick('Line')
            }}
            className={`border  flex items-center  ${
              isSelectedShape === 'Line' ? 'border-sky-700' : ''
            }`}
          >
            <Line></Line>
          </button>
          <button
            onClick={() => {
              shapeOnClick('Point')
            }}
            className={`border  flex items-center p-2 ${
              isSelectedShape === 'Point' ? 'border-sky-700' : ''
            }`}
          >
            <Point></Point>
          </button>
        </div>
        {isSelectedShape && (
          <div className="flex w-full flex-col">
            <p className="text-center text-[#00cc99] mt-5 text-lg">
              {isSelectedShape === 'Point'
                ? 'Point Marker On Map'
                : isSelectedShape === 'Line'
                ? 'Choose Points On Map to Make Polygons'
                : 'Add A Circular Layer'}
            </p>
          </div>
        )}
        <div className='w-full flex justify-center'>
        <button
          onClick={Logout}
          className="w-1/2  my-8  mx-2 bg-[#FFA500] hover:bg-[#FF8C00] text-center  text-slate-200 hover:text-slate-900 px-1 py-2 mt-2"
        >
          Logout
        </button>
        </div>
      </div>

      <div className="flex-1  mt-10">
        <FileUpload setFileUploadData={setFileUploadData}></FileUpload>
      </div>
    </div>
  )
}

export default MapController
