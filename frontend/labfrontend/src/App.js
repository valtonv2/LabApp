import React, {useState} from 'react';
import MeasurementList from './Components/MeasurementList'



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


  const deleteMeasurement = (id) => () => {

    const newList = allMeasurements.filter(m => m.id !== id)

    setMeasurements(newList)

  }


  console.log(examples())
  return (
    <div>
      <h1>Measurement System</h1>

      <MeasurementList allmeasurements = {allMeasurements} delFunction = {deleteMeasurement}/>

    </div>
  )
}

export default App;
