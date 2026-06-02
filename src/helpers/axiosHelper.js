import axios from "axios"

const apiEp = "http://localhost:8000/api/v1/tasks"

const apiProcssor = async ({method, data})=>{
    try {
        const response = await axios({
            method,
            url:apiEp,
            data,
        })
        return response.data;
        
    } catch (error) {
        return{
            status: "error",
            message:error.message

        }
    }
}



export const postTask = async(data)=>{
  const obj = {
    method: "post",
    data,
  };
  return apiProcssor(obj);
}

export const fetchAllTasks = async () =>{
  const obj = {
    method: "get"
  };
  return apiProcssor(obj);
}

export const updateTask = async (data) =>{
    const obj = {
    method: "patch",
    data,
  };
  return apiProcssor(obj);
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