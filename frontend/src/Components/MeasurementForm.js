/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'

//Element for the form that handles adding and updating measurements
const MeasurementForm = (props) => {

  return(
    <>
      <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>
      <div>
        <div>
          <form onSubmit={props.addFunction}>
            <div className = "form-control">

              <p>
              <input value={props.currentName} onChange={props.nameHandler} placeholder='Name'/>
              </p>

              <p>
              <input value={props.currentUpper} onChange={props.upperHandler}  placeholder='Upper reference limit'/>
              </p>

              <p>
              <input value={props.currentLower} onChange={props.lowerHandler}  placeholder='Lower reference limit'/>
              </p>

              <p>
              <input value={props.currentUnit} onChange={props.unitHandler}  placeholder='Unit'/>
              </p>

              <div>
                <button type="submit" className='button-success'>Save</button>
              </div>

              <p>
              <input value={props.currentSearch} onChange={props.searchHandler}  placeholder='Search'/>
              </p>

            </div>
          </form>
        </div>
      </div>
    </>
  )


}

export default MeasurementForm