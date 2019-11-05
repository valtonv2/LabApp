import React, {useState} from 'react';
import MeasurementList from './Components/MeasurementList'
import  Notification from './Components/Notification'



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

  const sendMessage = (message, isError) => {

    setMessage(message)
    setTimeout(()=>setMessage(''), 3000)
    
    if(isError){
      setError(true)
      setTimeout(()=>setError(false), 3000)
    }

  }


  const deleteMeasurement = (id) => () => {

    const newList = allMeasurements.filter(m => m.id !== id)

    setMeasurements(newList)
    sendMessage('Deletion successful', true)

  }


  console.log(examples())
  return (
    <div>
      <h1>Measurement System</h1>
      <Notification msg={message} isError={error}/>
      <MeasurementList allmeasurements = {allMeasurements} delFunction = {deleteMeasurement}/>

    </div>
  )
}

export default App;
