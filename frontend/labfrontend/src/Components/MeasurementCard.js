import React from 'react'


const MeasurementCard = ({measurement, deleteFunction}) => {

    const normalView = () => {

        return(
    <>
        <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>

        <div className="row">
        <div className="col col-lg-3">
            <div className="card">

                <h3 className="card-title">{measurement.name}</h3>

                <p>Healthy upper limit: {measurement.healthyupper}</p>

                <p>Healthy lower limit: {measurement.healthylower}</p>

                <p>Unit: {measurement.unit}</p>

                <button className = "button-danger" onClick={deleteFunction(measurement.id)}>Delete</button> 
            </div>
        </div>
        </div>
    </>
    )}

   return(normalView())





}

export default MeasurementCard