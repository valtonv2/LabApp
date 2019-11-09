/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import MeasurementList from './Components/MeasurementList'
import  Notification from './Components/Notification'
import serverComm from './Services/Measurements'
import MeasurementForm from './Components/MeasurementForm'

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1')




const App = () => {

  const [allMeasurements, setMeasurements] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

  //States for measurement form
  const [newName, setNewName] = useState('')
  const [newUpper, setNewUpper] = useState(0)
  const [newLower, setNewLower] = useState(0)
  const [newUnit, setNewUnit] = useState('')

  //Measurement form change handlers
  const handleName = (event) => setNewName(event.target.value)
  const handleUpper = (event) => setNewUpper(event.target.value)
  const handleLower = (event) => setNewLower(event.target.value)
  const handleUnit = (event) => setNewUnit(event.target.value)

  //Get all measurements from the server
  useEffect(() => {

    serverComm.getData().then(response => {

      setMeasurements(response)

    })
  }, [])

  //Utility method that makes a small message row pop up
  const sendMessage = (message, isError) => {

    setMessage(message)
    setTimeout(() => setMessage(''), 3000)

    if(isError){
      setError(true)
      setTimeout(() => setError(false), 3000)
    }

  }


  const deleteMeasurement = (id) => () => {

    const target = allMeasurements.find(m => m.id === id)

    if(window.confirm(`Do you want to delete ${ target.name }`)){

      serverComm.deleteData(id).then(() => {

        const newList = allMeasurements.filter(m => m.id !== id)

        setMeasurements(newList)
        sendMessage('Deletion successful', false)
      })

    }else sendMessage('Delete cancelled', false)
  }


  const addMeasurement = (event) => {

    event.preventDefault()

    if(newName && newUnit && newUpper && newLower && !allMeasurements.map(m => m.name).includes(newName)){
      console.log('Add branch called')

      const newId = uuidv1()

      const dataObj = {
        id:newId,
        name:newName,
        unit:newUnit,
        healthyupper:newUpper,
        healthylower:newLower
      }

      serverComm.postData(dataObj).then(response => {

        setMeasurements(allMeasurements.concat(response))
        sendMessage('Measurement added', false)
        console.log(allMeasurements)

      }).catch(error => sendMessage(error.response.data.errorMessage, true))

    }else if(newName && newUnit && newUpper && newLower && window.confirm('A measurement with this name already exists. Do you want to update it?')){

      console.log('Update branch called')
      const oldId = allMeasurements.find(m => m.name === newName).id

      const dataObj = {
        id: oldId,
        name:newName,
        unit:newUnit,
        healthyupper:newUpper,
        healthylower:newLower
      }

      serverComm.updateData(dataObj).then(response => {

        setMeasurements(allMeasurements.map(m => m.id !== oldId ? m:dataObj))
        console.log(allMeasurements)
        sendMessage('Measurement updated succesfully', false)

      }).catch(error => sendMessage(error.response.data.errorMessage, true))

    }else{
      sendMessage('Add cancelled', true)
    }
  }





  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css"/>
      <div style={ { backgroundColor:'darkgray' } }>

        <div className="align-center">
          <h1>Measurement System</h1>
          <Notification msg={message} isError={error}/>

          <p>Welcome to the measurement system! Use the form below to add and update measurements.</p>

          <MeasurementForm
            addFunction={addMeasurement}
            currentName={newName}
            currentUpper={newUpper}
            currentLower={newLower}
            currentUnit={newUnit}
            nameHandler={handleName}
            upperHandler={handleUpper}
            lowerHandler={handleLower}
            unitHandler={handleUnit}
          />

          <MeasurementList allmeasurements = {allMeasurements} delFunction = {deleteMeasurement}/>

        </div>
      </div>
    </>
  )
}

export default App
