/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'

//Element for the form that handles adding and updating measurements
const MeasurementForm = (props) => {

  return(
    <>
      <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>
      <div className="panel">
        <div className="panel-body">
          <form onSubmit={props.addFunction}>
            <div className = "form-control">

              <p>Name</p>
              <input value={props.currentName} onChange={props.nameHandler}/>
              <p>Healthy upper</p>
              <input type="number" value={props.currentUpper} onChange={props.upperHandler}/>
              <p>Healthy lower</p>
              <input type="number" value={props.currentLower} onChange={props.lowerHandler}/>
              <p>Unit</p>
              <input value={props.currentUnit} onChange={props.unitHandler}/>

              <div>
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )


}

export default MeasurementForm