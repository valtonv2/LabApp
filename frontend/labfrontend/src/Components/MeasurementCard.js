import React from 'react'


const MeasurementCard = ({measurement, deleteFunction}) => {

    const normalView = () => {

        return(
    <>
        <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>

        <div class="row">
        <div class="col col-lg-6">
            <div class="card">

                <h3 class="card-title">{measurement.name}</h3>

                <p>Healthy upper limit: {measurement.healthyupper}</p>

                <p>Healthy lower limit: {measurement.healthylower}</p>

                <button class = "button-danger" onClick={deleteFunction(measurement.id)}>Delete</button> 
            </div>
        </div>
        </div>
    </>
    )}

   return(normalView())





}

export default MeasurementCard