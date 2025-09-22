"use client"
import React from 'react'
import CategoriesCard from "../Categories/categoriesCard"
import YouLikeData from "../You May Like/YouLikeData"


const YouLike = () => {
    
  return (
    <div>
      <CategoriesCard data={YouLikeData} />
    </div>
  )
}

export default YouLike
