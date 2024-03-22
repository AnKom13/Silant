import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux';

import MachineService from '../API/MachineService';
import SelectListService from '../API/SelectListService';
import TechnicalService from '../API/TechnicalService';

import TechnicalServiceList from '../components/TechnicalServiceList';
import TechnicalServiceForm from '../Form/TechnicalServiceForm'

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

import './Filters.css'
import '../styles/GetTable.css';

export default function TechnicalServiceFilters() {
    const [filteredTechnicalServices, setfilteredTechnicalServices] = useState('');

    const [typeTechnicalServices, setTypeTechnicalServices] = useState([]);
    const [factoryNumMachines, setfactoryNumMachines] = useState([]);
    const [serviceCompanies, setServiceCompanies] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

    const isCompany = useSelector(state => state.auth.company);
    const factoryNumMachine = useSelector(state => state.auth.factoryNumMachine);
    const factoryNumMachineId = useSelector(state => state.auth.factoryNumMachineId);

    const [filterValues, setFilterValues] = useState({
        typeTechnicalService: '',
        factoryNumMachine: factoryNumMachineId,
        serviceCompany: '',
    });

    useEffect(() => {
        if (filteredTechnicalServices === '') {
        TechnicalService.getWithFilters(filterValues).then(resp => { setfilteredTechnicalServices(resp.data) })
        }
    }, [filteredTechnicalServices])

    useEffect(() => {
        async function fetchData() {
            try {
                const typeTechnicalServiceResponse = await SelectListService.getTypeTechnicalService();
                setTypeTechnicalServices(typeTechnicalServiceResponse.data);

                const machineResponse = await MachineService.getAll();
                setfactoryNumMachines(machineResponse.data);

                const serviceCompanyResponse = await SelectListService.getServiceCompany();
                setServiceCompanies(serviceCompanyResponse.data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect((factoryNumMachineId) => {
        if (resetValues) {
            setFilterValues({
                typeTechnicalService: '',
                factoryNumMachine: factoryNumMachineId,
                serviceCompany: '',
            });
            setResetValues(false);
        }
    }, [resetValues]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterValues({ ...filterValues, [name]: value });
    };

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('submit  '+filterValues)
            const response = await TechnicalService.getWithFilters(filterValues);
            setfilteredTechnicalServices(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilters = () => {
        setfilteredTechnicalServices('')
        setResetValues(true);
    };

    const handleCreateObject = () => {
        setModalCreateIsOpen(true)
    }

    const closeCreateModal = () => {
        setModalCreateIsOpen(false)
        setfilteredTechnicalServices('')
        setResetValues(true);
    }

    return (
        <div className='filters'>
            {factoryNumMachine ?
                    null:  
            <form className='filters-form' id='MyForm' onSubmit={handleFilterSubmit}>
                <div className="select">
                    <MySelect
                        label="Вид ТО"
                        name="typeTechnicalService"
                        value={filterValues.typeTechnicalService}
                        options={typeTechnicalServices}
                        field={'name'}
                        onChange={handleFilterChange}
                    />
 
                    <MySelect
                        label="Машина"
                        name="factoryNumMachine"
                        value={filterValues.factoryNumMachine}
                        options={factoryNumMachines}
                        field={'factoryNumMachine'}
                        onChange={handleFilterChange}
                    />

                    {!isCompany ?
                        <MySelect
                            label="Сервисная компания"
                            name="serviceCompany"
                            value={filterValues.serviceCompany}
                            options={serviceCompanies}
                            field={'name'}
                            onChange={handleFilterChange}
                        /> 
                        : null} 

                </div>
                <div className="button" >
                    <MyButton type="submit">Применить фильтры</MyButton>
                    <MyButton onClick={handleResetFilters}>Сбросить все фильтры</MyButton>
                    <MyButton onClick={handleCreateObject}>Добавить информацию о ТО</MyButton>
                </div>
            </form>}
            <Modal
                className="modal-create"
                isOpen={modalCreateIsOpen}
                onRequestClose={closeCreateModal}
                contentLabel="Object Crate Modal"
            >
                <TechnicalServiceForm />
                
                <MyButton onClick={closeCreateModal}>Закрыть</MyButton>
            </Modal>

            <TechnicalServiceList filteredTechnicalService={filteredTechnicalServices} />

        </div>
    )
}

