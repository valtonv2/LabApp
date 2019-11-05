import React, {useState, useEffect} from 'react';
import MeasurementList from './Components/MeasurementList'
import  Notification from './Components/Notification'
import serverComm from './Services/Measurements'



const App = () => {



  const examples = () => {
    
    console.log('Printing examples')
    
    return ([

    {"id":1,
     "name":"Test",
     "healthyupper":5,
     "healthylower":3
    },
    {"id":2,
     "name":"Test2",
     "healthyupper":365,
     "healthylower":200
    }
  
  ])}

  const [allMeasurements, setMeasurements] = useState(examples())
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const [newName, setNewName] = useState('')
  const [newUpper, setNewUpper] = useState('')
  const [newLower, setnewLower] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleUpper = (event) => setNewUpper(event.target.value)
  const handleLower = (event) => setNewLower(event.target.value)

  useEffect(() => serverComm.getData().then(d => setMeasurements(d)))

  const sendMessage = (message, isError) => {

    setMessage(message)
    setTimeout(()=>setMessage(''), 3000)
    
    if(isError){
      setError(true)
      setTimeout(()=>setError(false), 3000)
    }

  }

  const getId = () => allMeasurements.length + 1

 

  const deleteMeasurement = (id) => () => {

    const target = allMeasurements.find(m => m === id)

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

    if(newName, newUpper, newLower && !allMeasurements.includes(m => m.name === newName)){

      const newId = getId()

      const dataObj = {
        id:newId,
        name:newName,
        healthyupper:newUpper,
        healthylower:newLower
      }

      serverComm.postData(dataObj).then(response => {

        setMeasurements(allMeasurements.concat(response))
        sendMessage('Measurement added', false)

        }
      }).catch(error => sendMessage(error.response.data.error))

    }else if(newName, newUpper, newLower, window.confirm("A measurement with this name already exists. Do you want to update it?")){
     
      const oldId = allmeasurements.find(m => m.name === newName).id
      const dataObj = {
        id: oldId,
        name:newName,
        healthyupper:newUpper,
        healthylower:newLower
      }

      serverComm.updateData(dataObj).then(response => {

        setMeasurements(allMeasurements.map(m => m.id !== oldId ? m:dataObj))
        sendMessage('Measurement updated succesfully', false)

      }).catch(error => sendMessage(error.response.data.error)

    }else{

      sendMessage('Add cancelled', true)
    }
  
  }




  
  return (
    <div>
      <h1>Measurement System</h1>
      <Notification msg={message} isError={error}/>
      <MeasurementList allmeasurements = {allMeasurements} delFunction = {deleteMeasurement}/>

    </div>
  )
}

export default App;
