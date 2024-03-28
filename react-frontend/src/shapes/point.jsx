import React from 'react'

function Point() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="2 2 48 48"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="#007bff"
          stroke="#000000"
          strokeWidth="2"
        />
        <path
          d="M12 34s-6-9.5-6-13a6 6 0 0 1 12 0c0 3.5-6 13-6 13z"
          fill="#ffffff"
          transform="translate(10, -2)"
        />
      </svg>
    </div>
  )
}

export default Point
