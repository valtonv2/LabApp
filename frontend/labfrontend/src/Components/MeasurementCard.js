import React from 'react'

const MeasurementCard = ({measurement, deleteFunction}) => {

    const normalView = () => {

        return(
        
        <div>
            <h3>{measurement.name}</h3>

            <p>Healthy upper limit: {measurement.healthyupper}</p>

            <p>Healthy lower limit: {measurement.healthylower}</p>

            <button class = "button-primary" onClick={deleteFunction(measurement.id)}>Delete</button> 


        </div>

    )}

   return(normalView())





}

export default MeasurementCard