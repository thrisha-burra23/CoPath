import React from 'react'
import RideCard from './RideCard'

const RidesList = () => {
  return (
    <div className="border flex gap-3"> 
    <h1>AvailableRides List</h1>
    <br/>
      <RideCard/>
      <RideCard/><RideCard/><RideCard/><RideCard/><RideCard/>
    </div>
  )
}

export default RidesList