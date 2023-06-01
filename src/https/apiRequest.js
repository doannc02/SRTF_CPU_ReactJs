import axios from "axios";
import { fetchApiSucess } from "./processSlice";
export const fetchApi = async (dispatch) =>{
    try {
        const res = await axios.get('db.json');
        dispatch(fetchApiSucess(res.data.process))
        console.log(res.data.process)
    } catch (error) {
        console.log(error.response)
    }
}

export const postApi = async (newPro) =>{
    try {
        const res = await axios.post('db.json', newPro)
        
    } catch (error) {
        
    }
}