import axios from "../axiosConfig";

export default class SelectListService {
    static async getMachineModel() {
        const response = await axios.get('/machine-model/')
        return response
    }

    static async getEngineModel() {
        const response = await axios.get('/engine-model/')
        return response
    }

    static async getTransmissionModel() {
        const response = await axios.get('/transmission-model/')
        return response
    }

    static async getDrivingBridgeModel() {
        const response = await axios.get('/driving-bridge-model/')
        return response
    }

    static async getControlledBridgeModel() {
        const response = await axios.get('/controlled-bridge-model/')
        return response
    }

    static async getTypeTechnicalService() {
        const response = await axios.get('/type-technical-service/')
        return response
    }

    static async getClient() {
        const response = await axios.get('/client/')
        return response
    }

    static async getServiceCompany() {
        const response = await axios.get('/service-company/')
        return response
    }

    static async getNodeRefusal() {
        const response = await axios.get('/node-refusal/')
        return response
    }

    static async getRecoveryMethod() {
        const response = await axios.get('/recovery-method/')
        return response
    }
}
