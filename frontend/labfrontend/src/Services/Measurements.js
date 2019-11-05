import axios from 'axios'

const baseUrl = 'api/measurements'



const getData = () => {

    return(axios.get(baseUrl).then(response => response.data))

}

const postData = (data) => {

    return(axios.post(baseUrl, data).then(response => response.data)) 

}

const deleteData = (id) => {

    return(axios.delete(`${baseUrl}/${id}`).then(response => response.data))

}

const updateData = (newdata) => {

    return(axios.put(`${baseUrl}/${newData.id}`, newData).then(response => response.data))

}

export default{getData, postData, deleteData, updateData}