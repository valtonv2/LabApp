import React from 'react'
import MeasurementCard from './MeasurementCard'


const MeasurementList = ({allmeasurements, delFunction}) => {

    return(

        <div>
        {allmeasurements.map(m => <MeasurementCard measurement = {m} deleteFunction = {delFunction} key = {m.id}/>)}
        </div>

    )



}

export default MeasurementList