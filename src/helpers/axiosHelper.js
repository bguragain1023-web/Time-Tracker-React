import axios from "axios"

const apiEp = "http://localhost:8000/api/v1/tasks"

export const postTask = async(data)=>{
    try {
        const response = await axios.post(apiEp, data);
        console.log(response);
        return response.data;
    } catch (error) {
        return{
            status: "error",
            message:error.message

        }
    }
}

export const fetchAllTasks = async () =>{
    try {
        const response = await axios.get(apiEp)
        return response.data
        
    } catch (error) {

         return{
            status: "error",
            message:error.message
         }

        
    }
}

export const updateTask = async (data) =>{
    try {
        const response = await axios.patch(apiEp, data);
        return response.data
        
    } catch (error) {

         return{
            status: "error",
            message:error.message
         }

        
    }
}

// export const deleteTask = async(data)=>{
//     try {
//         const response = await axios.delete(apiEp+`/:_id`, data)
//         return response.data;
//     } catch (error) {
//         return{
//             status: "error",
//             message:error.message
//          }
//     }
// }