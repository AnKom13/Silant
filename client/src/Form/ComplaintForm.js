import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axiosConfig';

import SelectListService from '../API/SelectListService';
import MachineService from '../API/MachineService';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MySelect from '../UI/Select/MySelect';

import './MyCreateForm.css'

export default function ComplaintForm() {

    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({
        refusalDate: '',
        operatingHours: '',
        nodeRefusal: '',
        descriptionRefusal: '',
        recoveryMethod: '',
        sparePartsUsed: '',
        recoveryDate: '',
        factoryNumMachine: '',
        serviceCompany: '',
    });

    const [nodeRefusals, setNodeRefusals] = useState([]);
    const [recoveryMethods, setRecoveryMethods] = useState([]);
    const [serviceCompanies, setServiceCompany] = useState([]);
    const [factoryNumMachines, setfactoryNumMachine] = useState([]);

    useEffect(() => {
        fetchDictionaries();
    }, []);

    const fetchDictionaries = async () => {
        try {
            const nodeRefusalsResponse = await SelectListService.getNodeRefusal();
            setNodeRefusals(nodeRefusalsResponse.data);

            const recoveryMethodsResponse = await SelectListService.getRecoveryMethod();
            setRecoveryMethods(recoveryMethodsResponse.data);

            const serviceCompanyResponse = await SelectListService.getServiceCompany();
            setServiceCompany(serviceCompanyResponse.data);

            const factoryNumMachineResponse = await MachineService.getAll();
            setfactoryNumMachine(factoryNumMachineResponse.data);

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
            await axios.post('/reclamation/', {
                refusalDate: data.refusalDate,
                operatingHours: data.operatingHours,
                nodeRefusal: data.nodeRefusal,
                descriptionRefusal: data.descriptionRefusal,
                recoveryMethod: data.recoveryMethod,
                sparePartsUsed: data.sparePartsUsed,
                recoveryDate: data.recoveryDate,
                factoryNumMachine: data.factoryNumMachine,
                serviceCompany: data.serviceCompany,
            });

            setSuccessMessage(`Рекламация успешно добавлена`);
            setData({ ...data, refusalDate: '' });
            setData({ ...data, operatingHours: '' });
            setData({ ...data, nodeRefusal: '' });
            setData({ ...data, descriptionRefusal: '' });
            setData({ ...data, recoveryMethod: '' });
            setData({ ...data, sparePartsUsed: '' });
            setData({ ...data, recoveryDate: '' });
            setData({ ...data, factoryNumMachine: '' });
            setData({ ...data, serviceCompany: '' });

        } catch (error) {
            setSuccessMessage('Вы ввели неверные данные');
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
                    <div className='create-form'>
                        <h3>{!successMessage && 'Добавление новой Рекламации'}</h3>

                        <label>Наработка, м/час </label>
                        <MyInput
                            type="text"
                            name="operatingHours"
                            value={data.operatingHours}
                            onChange={handleChange}
                        />

                        <label>Описание отказа: </label>
                        <MyInput
                            type="text"
                            name="descriptionRefusal"
                            value={data.descriptionRefusal}
                            onChange={handleChange}
                        />

                        <label>Запасные части: </label>
                        <MyInput
                            type="text"
                            name="sparePartsUsed"
                            value={data.sparePartsUsed}
                            onChange={handleChange}
                        />

                        <label>Дата отказа:</label>
                        <MyInput
                            type="date"
                            name="refusalDate"
                            value={data.refusalDate}
                            onChange={handleChange}
                        />

                        <label>Дата восстановления: </label>
                        <MyInput
                            type="date"
                            name="recoveryDate"
                            value={data.recoveryDate}
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Узел отказа"
                            name="nodeRefusal"
                            value={data.nodeRefusal}
                            options={nodeRefusals}
                            field="name"
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Способ восстановления"
                            name="recoveryMethod"
                            value={data.recoveryMethod}
                            options={recoveryMethods}
                            field="name"
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Машина"
                            name="factoryNumMachine"
                            value={data.factoryNumMachine}
                            options={factoryNumMachines}
                            field="factoryNumMachine"
                            onChange={handleChange}
                        />

                            <MySelect
                                label="Сервисная компания"
                                name="serviceCompany"
                                value={data.serviceCompany}
                                options={serviceCompanies}
                                field="name"
                                onChange={handleChange}
                            /> 

                        <MyButton type="submit">Создать</MyButton>
                    </div>
                </form>
            </div>
        </>
    );
};

