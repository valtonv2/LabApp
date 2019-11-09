/* eslint-disable linebreak-style */
import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/measurements/'

//These methods handle communication with the server

//Gets all measurements
const getData = () => {

  return(axios.get(baseUrl).then(response => response.data))

}

//Posts single measurement
const postData = (data) => {

  return(axios.post(baseUrl, data).then(response => response.data))

}

//Deletes single measurement by id
const deleteData = (id) => {

  return(axios.delete(`${baseUrl}/${id}`).then(response => response.data))

}

//Updates single measurement
const updateData = (newData) => {

  return(axios.put(`${baseUrl}/${newData.id}`, newData).then(response => response.data))

}

export default{ getData, postData, deleteData, updateData }