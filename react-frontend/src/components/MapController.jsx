import React from 'react'
import Cicle from '../shapes/circle'
import Line from '../shapes/line'
import Point from '../shapes/point'

function MapController({isSelectedShape, setSelectedShape}) {
  function shapeOnClick(shape) {
    shape===isSelectedShape?setSelectedShape(""):setSelectedShape(shape)
  }
  return (
    <div className="w-full bg-gradient-to-br from-gray-200 to-gray-300">
      <h1 className="text-center mt-10 text-xl text-[#00cc99]">Add Shapes</h1>

      <div className="w-full  flex justify-center gap-4 mt-4">
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
          className={`border  flex items-center p-2 ${
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
        <p className="text-center text-[#00cc99] mt-5 text-lg">
          Choose Location On Map
        </p>
      )}
    </div>
  )
}

export default MapController
