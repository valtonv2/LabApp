import React, {useState, useEffect} from 'react';
import MeasurementList from './Components/MeasurementList'
import  Notification from './Components/Notification'
import serverComm from './Services/Measurements'
import MeasurementForm from './Components/MeasurementForm'

const uuidv1 = require('uuid/v1')




const App = () => {


  const [allMeasurements, setMeasurements] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

  const [newName, setNewName] = useState('')
  const [newUpper, setNewUpper] = useState('')
  const [newLower, setNewLower] = useState('')
  const [newUnit, setNewUnit] = useState('')


  const handleName = (event) => setNewName(event.target.value)
  const handleUpper = (event) => setNewUpper(event.target.value)
  const handleLower = (event) => setNewLower(event.target.value)
  const handleUnit = (event) => setNewUnit(event.target.value)

  useEffect(() => {

    serverComm.getData().then(response => {

      setMeasurements(response)

    })

  }, [])

  
  const sendMessage = (message, isError) => {

    setMessage(message)
    setTimeout(()=>setMessage(''), 3000)
    
    if(isError){
      setError(true)
      setTimeout(()=>setError(false), 3000)
    }

  }


  const deleteMeasurement = (id) => () => {

    const target = allMeasurements.find(m => m.id === id)

    if(window.confirm(`Do you want to delete ${target.name}`)){

      serverComm.deleteData(id).then(_data => {

      const newList = allMeasurements.filter(m => m.id !== id)

      setMeasurements(newList)
      sendMessage('Deletion successful', false)

      })
    }else sendMessage('Delete cancelled', false)
  }

 
 
  const addMeasurement = (event) => {

    event.preventDefault()

    if(newName && newUnit && newUpper && newLower && !allMeasurements.map(m => m.name).includes(newName)){
      console.log("Add branch called")
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

        }).catch(error => sendMessage(error.response.data.error))
      
      }else if(newName && newUnit && newUpper && newLower && window.confirm("A measurement with this name already exists. Do you want to update it?")){
     
        console.log("Update branch called")
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

      }).catch(error => sendMessage(error.response.data.error))

    }else{

      sendMessage('Add cancelled', true)
    }
  
  }




  
  return (
    <div>
      <h1>Measurement System</h1>
      <Notification msg={message} isError={error}/>
      
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
  )
}

export default App;
