/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'

//Element that contains single measurement data
const MeasurementCard = ({ measurement, deleteFunction }) => {

  const normalView = () => {

    return(
      <>
        <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>

        <div className="panel col">

          <h3>{measurement.name}</h3>

          <p>Upper reference limit: {measurement.healthyupper}</p>

          <p>Lower reference limit: {measurement.healthylower}</p>

          <p>Unit: {measurement.unit}</p>

          <button className = "button-danger" onClick={deleteFunction(measurement.id)}>Delete</button>

        </div>
      </>
    )}

  return(normalView())





}

export default MeasurementCard