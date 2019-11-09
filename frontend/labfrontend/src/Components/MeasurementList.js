/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import MeasurementCard from './MeasurementCard'


const MeasurementList = ({ allmeasurements, delFunction }) => {

  return(
    <>
      <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>
      <div className="col">

        {allmeasurements.map(m => <MeasurementCard measurement = {m} deleteFunction = {delFunction} key = {m.id}/>)}

      </div>
    </>

  )

}

export default MeasurementList