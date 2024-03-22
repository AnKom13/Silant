import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

import SelectListService from '../API/SelectListService';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/MyTextarea/MyTextarea';
import MySelect from '../UI/Select/MySelect';

import './MyCreateForm.css'

export default function MachineForm() {

    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({
        factoryNumMachine: '',
        modelMachine: '',
        modelEngine: '',
        factoryNumEngine: '',
        modelTransmission: '',
        factoryNumTransmission: '',
        modelDrivingBridge: '',
        factoryNumDrivingBridge: '',
        modelControlledBridge: '',
        factoryNumControlledBridge: '',
        deliveryAgreementData: '',
        shipmentDate: '',
        reciver: '',
        deliveryAddress: '',
        equipment: '',
        client: '',
        serviceCompany: '',
    });

    const [modelMachines, setModelMachines] = useState([]);
    const [modelEngines, setModelEngines] = useState([]);
    const [modelTransmissions, setModelTransmissions] = useState([]);
    const [modelDrivingBridges, setModelDrivingBridges] = useState([]);
    const [modelControlledBridges, setModelControlledBridges] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [client, setClient] = useState([]);

    useEffect(() => {
        fetchDictionaries();
    }, []);

    const fetchDictionaries = async () => {
        try {
            const modelMachineResponse = await SelectListService.getMachineModel();
            setModelMachines(modelMachineResponse.data);

            const modelEngineResponse = await SelectListService.getEngineModel();
            setModelEngines(modelEngineResponse.data);

            const modelTransmissionResponse = await SelectListService.getTransmissionModel();
            setModelTransmissions(modelTransmissionResponse.data);

            const modelDrivingBridgeResponse = await SelectListService.getDrivingBridgeModel();
            setModelDrivingBridges(modelDrivingBridgeResponse.data);

            const modelControlledBridgeResponse = await SelectListService.getControlledBridgeModel();
            setModelControlledBridges(modelControlledBridgeResponse.data);

            const serviceCompanyResponse = await SelectListService.getServiceCompany();
            setServiceCompany(serviceCompanyResponse.data);

            const clientResponse = await SelectListService.getClient();
            setClient(clientResponse.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/machine/', {
                factoryNumMachine: data.factoryNumMachine,
                modelMachine: data.modelMachine,
                modelEngine: data.modelEngine,
                factoryNumEngine: data.factoryNumEngine,
                modelTransmission: data.modelTransmission,
                factoryNumTransmission: data.factoryNumTransmission,
                modelDrivingBridge: data.modelDrivingBridge,
                factoryNumDrivingBridge: data.factoryNumDrivingBridge,
                modelControlledBridge: data.modelControlledBridge,
                factoryNumControlledBridge: data.factoryNumControlledBridge,
                deliveryAgreementData: data.deliveryAgreementData,
                shipmentDate: data.shipmentDate,
                reciver: data.reciver,
                deliveryAddress: data.deliveryAddress,
                equipment: data.equipment,
                client: data.client,
                serviceCompany: data.serviceCompany,
            });

            setSuccessMessage(`Машина № ${data.factoryNumMachine} успешно добавлена`);
            setData({ ...data, factoryNumMachine: '' });
            setData({ ...data, modelMachine: '' });
            setData({ ...data, modelEngine: '' });
            setData({ ...data, factoryNumEngine: '' });
            setData({ ...data, modelTransmission: '' });
            setData({ ...data, factoryNumTransmission: '' });
            setData({ ...data, modelDrivingBridge: '' });
            setData({ ...data, factoryNumDrivingBridge: '' });
            setData({ ...data, modelControlledBridge: '' });
            setData({ ...data, factoryNumControlledBridge: '' });
            setData({ ...data, deliveryAgreementData: '' });
            setData({ ...data, shipmentDate: '' });
            setData({ ...data, reciver: '' });
            setData({ ...data, deliveryAddress: '' });
            setData({ ...data, equipment: '' });
            setData({ ...data, client: '' });
            setData({ ...data, serviceCompany: '' });

        } catch (error) {
            setSuccessMessage({ ...data, successMessage: 'Вы ввели неверные данные' });
        }
    };

    return (
        <>
            <div>
                <h3 style={{ textAlign: 'center' }}>
                    <span className={successMessage === 'Вы ввели неверные данные' ? 'error-message' : ''}>
                        {successMessage}
                    </span>
                </h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>{!successMessage && 'Добавление новой Машины'}</h3>

                        <div className="form-container">
                            <div className="input-container">
                                <label>Зав. № машины:</label>
                                <MyInput
                                    type="text"
                                    name="factoryNumMachine"
                                    value={data.factoryNumMachine}
                                    onChange={handleChange}
                                />

                                <label>Зав. № двигателя: </label>
                                <MyInput
                                    type="text"
                                    name="factoryNumEngine"
                                    value={data.factoryNumEngine}
                                    onChange={handleChange}
                                />

                                <label>Зав. № трансмиссии: </label>
                                <MyInput
                                    type="text"
                                    name="factoryNumTransmission"
                                    value={data.factoryNumTransmission}
                                    onChange={handleChange}
                                />

                                <label>Зав. № ведущего моста: </label>
                                <MyInput
                                    type="text"
                                    name="factoryNumDrivingBridge"
                                    value={data.factoryNumDrivingBridge}
                                    onChange={handleChange}
                                />

                                <label>Зав. № управляемого моста: </label>
                                <MyInput
                                    type="text"
                                    name="factoryNumControlledBridge"
                                    value={data.factoryNumControlledBridge}
                                    onChange={handleChange}
                                />

                                <label>Договор поставки №, дата: </label>
                                <MyInput
                                    type="text"
                                    name="deliveryAgreementData"
                                    value={data.deliveryAgreementData}
                                    onChange={handleChange}
                                />

                                <label>Грузополучатель: </label>
                                <MyInput
                                    type="text"
                                    name="reciver"
                                    value={data.reciver}
                                    onChange={handleChange}
                                />

                                <label>Адрес поставки: </label>
                                <MyInput
                                    type="text"
                                    name="deliveryAddress"
                                    value={data.deliveryAddress}
                                    onChange={handleChange}
                                />

                                <label>Дата отгрузки с завода: </label>
                                <MyInput
                                    type="date"
                                    name="shipmentDate"
                                    value={data.shipmentDate}
                                    onChange={handleChange}
                                />

                                <label>Комплектация: </label>
                                <MyTextarea
                                    type="text"
                                    name="equipment"
                                    value={data.equipment}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="select-container">
                                <MySelect
                                    label="Модель техники"
                                    name="modelMachine"
                                    value={data.modelMachine}
                                    options={modelMachines}
                                    field="name"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель двигателя"
                                    name="modelEngine"
                                    value={data.modelEngine}
                                    options={modelEngines}
                                    field="name"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель трансмиссии"
                                    name="modelTransmission"
                                    value={data.modelTransmission}
                                    options={modelTransmissions}
                                    field="name"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель ведущего моста"
                                    name="modelDrivingBridge"
                                    value={data.modelDrivingBridge}
                                    options={modelDrivingBridges}
                                    field="name"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель управляемого моста:"
                                    name="modelControlledBridge"
                                    value={data.modelControlledBridge}
                                    options={modelControlledBridges}
                                    field="name"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Клиент"
                                    name="client"
                                    value={data.client}
                                    options={client}
                                    field="name"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Сервисная компания"
                                    name="serviceCompany"
                                    value={data.serviceCompany}
                                    options={serviceCompany}
                                    field="name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <MyButton type="submit">Создать</MyButton>
                    </div>
                </form>
            </div>
        </>
    );
};

