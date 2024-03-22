import axios from "../axiosConfig";

export default class MachineService {
    static async getAll() {
        const response = await axios.get('/machine/')
        return response
    }
    static async getWithFilters(props) {
        const response = await axios.get('/machine/', {params: props})
        return response
    }
    static async getWithSearch(props) {
        const response = await axios.get('/machine/', {params: {search: props}})
        return response
    }

    static async getDetail(props) {
        const response = await axios.get('/machine/', {params: props})
        return response
    }
}
