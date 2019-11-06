import React from 'react'

const MeasurementForm = (props) => {

    return(
    <div>
        <form onSubmit={props.addFunction}>
            <p>Name</p>
            <input value={props.currentName} onChange={props.nameHandler}/>
            <p>Healthy upper</p>
            <input value={props.currentUpper} onChange={props.upperHandler}/>
            <p>Healthy lower</p>
            <input value={props.currentLower} onChange={props.lowerHandler}/>

            <div>
                <button type="submit">Send</button>
            </div>
            
        </form>


    </div>
    )


}

export default MeasurementForm