import axios from "../axiosConfig";

export default class ListService {
    static async getMachineModel(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/machine-model/${encodedItem}`);
    };
    static async getEngineModel(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/engine-model/${encodedItem}`);
    };
    static async getTransmissionModel(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/transmission-model/${encodedItem}`);
    };
    static async getDrivingBridgeModel(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/driving-bridge-model/${encodedItem}`);
    };
    static async getControlledBridgeModel(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/controlled-bridge-model/${encodedItem}`);
    };

    static async getTypeTechnicalServices(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/type-technical-service/${encodedItem}`);
    };

    static async getServiceCompany(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/service-company/${encodedItem}`);
    };

    static async getClient(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/client/${encodedItem}`);
    };    

    static async getNodeRefusal(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/node-refusal/${encodedItem}`);
    };

    static async getRecoveryMethod(props) {
        const encodedItem = encodeURIComponent(props);
        return axios.get(`/recovery-method/${encodedItem}`);
    };
}