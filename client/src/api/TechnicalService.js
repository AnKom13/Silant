import axios from "../axiosConfig";

export default class TechnicalService {
    static async getAll() {
        const response = await axios.get('/technical-service/')
        return response
    }
    static async getWithFilters(props) {
        const response = await axios.get('/technical-service/', {params: props})
        return response
    }
}
