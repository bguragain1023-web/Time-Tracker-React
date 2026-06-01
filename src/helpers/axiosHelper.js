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