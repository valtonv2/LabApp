import React from 'react'

const MeasurementForm = (props) => {

    return(
    <div>
        <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>
        <form onSubmit={props.addFunction}>
        <div className = "form-control">
            <p>Name</p>
            <input value={props.currentName} onChange={props.nameHandler}/>
            <p>Healthy upper</p>
            <input value={props.currentUpper} onChange={props.upperHandler}/>
            <p>Healthy lower</p>
            <input value={props.currentLower} onChange={props.lowerHandler}/>
            <p>Unit</p>
            <input value={props.currentUnit} onChange={props.unitHandler}/>

            <div>
                <button type="submit">Send</button>
            </div>
        </div>
        </form>


    </div>
    )


}

export default MeasurementForm