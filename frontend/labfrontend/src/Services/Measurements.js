import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/measurements/'



const getData = () => {

    return(axios.get(baseUrl).then(response => response.data))

}

const postData = (data) => {

    return(axios.post(baseUrl, data).then(response => response.data)) 

}

const deleteData = (id) => {

    return(axios.delete(`${baseUrl}/${id}`).then(response => response.data))

}

const updateData = (newData) => {

    return(axios.put(`${baseUrl}/${newData.id}`, newData).then(response => response.data))

}

export default{getData, postData, deleteData, updateData}