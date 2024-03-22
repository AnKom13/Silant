import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axiosConfig';

import SelectListService from '../API/SelectListService';
import MachineService from '../API/MachineService';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MySelect from '../UI/Select/MySelect';

export default function TechnicalServiceForm() {

    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({
        typeTechnicalService: '',
        technicalServiceDate: '',
        operatingHours: '',
        orderNum: '',
        orderDate: '',
        factoryNumMachine: '',
        serviceCompany: '',
    });

    const [typeTechnicalServices, setTypeTechnicalServices] = useState([]);
    const [serviceCompanies, setServiceCompanies] = useState([]);
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        fetchEquipmentModels();
    }, []);

    const fetchEquipmentModels = async () => {
        try {
            const typesResponse = await SelectListService.getTypeTechnicalService();
            setTypeTechnicalServices(typesResponse.data);

            const serviceCompanyResponse = await SelectListService.getServiceCompany();
            setServiceCompanies(serviceCompanyResponse.data);

            const machineResponse = await MachineService.getAll();
            setMachines(machineResponse.data);

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
            await axios.post('/technical-service/', {
                typeTechnicalService: data.typeTechnicalService,
                technicalServiceDate: data.technicalServiceDate,
                operatingHours: data.operatingHours,
                orderNum: data.orderNum,
                orderDate: data.orderDate,
                factoryNumMachine: data.factoryNumMachine,
                serviceCompany: data.serviceCompany,
            });

            setSuccessMessage(`Информация о новом ТО успешно добавлена`);
            setData({ ...data, typeTechnicalService: '' });
            setData({ ...data, technicalServiceDate: '' });
            setData({ ...data, operatingHours: '' });
            setData({ ...data, orderNum: '' });
            setData({ ...data, orderDate: '' });
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
                        <h3>{!successMessage && 'Добавление информации о новом ТО'}</h3>

                        <label>Наработка, м/час: </label>
                        <MyInput
                            type="text"
                            name="operatingHours"
                            value={data.operatingHours}
                            onChange={handleChange}
                        />

                        <label>№ заказ-наряда: </label>
                        <MyInput
                            type="text"
                            name="orderNum"
                            value={data.orderNum}
                            onChange={handleChange}
                        />

                        <label>Дата заказ-наряда: </label>
                        <MyInput
                            type="date"
                            name="orderDate"
                            value={data.orderDate}
                            onChange={handleChange}
                        />

                        <label>Дата проведения ТО: </label>
                        <MyInput
                            type="date"
                            name="technicalServiceDate"
                            value={data.technicalServiceDate}
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Вид ТО"
                            name="typeTechnicalService"
                            value={data.typeTechnicalService}
                            options={typeTechnicalServices}
                            field="name"
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Машина"
                            name="factoryNumMachine"
                            value={data.factoryNumMachine}
                            options={machines}
                            field={'factoryNumMachine'}
                            onChange={handleChange}
                        />

                            <MySelect
                                label="Сервисная компания"
                                name="serviceCompany"
                                value={data.serviceCompany}
                                options={serviceCompanies}
                                field={'name'}
                                onChange={handleChange}
                             /> 

                        <MyButton type="submit">Создать</MyButton>
                    </div>
                </form>
            </div>
        </>
    );
};

