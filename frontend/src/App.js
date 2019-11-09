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
  const [currentSearch, setSearch] = useState('')

  //States for measurement form
  const [newName, setNewName] = useState('')
  const [newUpper, setNewUpper] = useState('')
  const [newLower, setNewLower] = useState('')
  const [newUnit, setNewUnit] = useState('')

  //Handle current search
  const handleSearch = (event) => setSearch(event.target.value)

  //Measurement form change handlers
  const handleName = (event) => setNewName(event.target.value)
  const handleUpper = (event) => setNewUpper(event.target.value)
  const handleLower = (event) => setNewLower(event.target.value)
  const handleUnit = (event) => setNewUnit(event.target.value)

  //Get all measurements from the server
  useEffect(() => {

    serverComm.getData().then(response => {

      setMeasurements(response)

    }).catch(error => sendMessage('Could not get measurement data', true))
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

      }).catch(error => sendMessage('Adding measurement failed.', true))

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

      }).catch(error => sendMessage('Updating measurement failed.', true))

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

          <p>Welcome to the measurement system! Use the form below to add and update measurements.</p>

          <Notification msg={message} isError={error}/>

          <MeasurementForm
            addFunction={addMeasurement}
            currentName={newName}
            currentUpper={newUpper}
            currentLower={newLower}
            currentUnit={newUnit}
            currentSearch={currentSearch}
            nameHandler={handleName}
            upperHandler={handleUpper}
            lowerHandler={handleLower}
            unitHandler={handleUnit}
            searchHandler={handleSearch}
          />

          <MeasurementList 
          allmeasurements = {allMeasurements.filter(m => m.name.toLowerCase().includes(currentSearch.toLowerCase()))} 
          delFunction = {deleteMeasurement}
          />

        </div>
      </div>
    </>
  )
}

export default App
