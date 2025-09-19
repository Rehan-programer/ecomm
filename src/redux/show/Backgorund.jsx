import React from 'react'

const Background = () => {
  return (
    <div>
      <div className="flex flex-col py-10 justify-center items-center bg-[#F3EAD8] mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800"> Cart</h2>
          <p className="text-[#747691] text-sm flex gap-x-2">
            <a href="/" className="hover:underline">
              Home
            </a>
            <span>/</span>
            <span>Cart</span>
          </p>
        </div>
    </div>
  )
}

export default Background
