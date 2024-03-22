import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Modal from 'react-modal'

import SelectListService from '../API/SelectListService';
import MachineService from '../API/MachineService';

import MachineList from '../components/MachineList';
import MachineForm from '../Form/MachineForm'

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

import './Filters.css'
import '../styles/GetTable.css';

export default function MachineFilters() {
    const [filterValues, setFilterValues] = useState({
        modelMachine: '',
        modelEngine: '',
        modelTransmission: '',
        modelDrivingBridge: '',
        modelControlledBridge: '',
    });

    const [filteredMachines, setfilteredMachines] = useState('');
    const [modelMachines, setModelMachines] = useState([]);
    const [modelEngines, setModelEngines] = useState([]);
    const [modelTransmissions, setModelTransmissions] = useState([]);    
    const [modelDrivingBridges, setModelDrivingBridges] = useState([]);
    const [modelControlledBridges, setModelControlledBridges] = useState([]);
    const [resetValues, setResetValues] = useState(false);
    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
    const isManager = useSelector(state => state.auth.manager);

    useEffect(() => {
        if (filteredMachines === '') {
            MachineService.getAll().then(resp => { setfilteredMachines(resp.data) })
        }
    }, [filteredMachines])

    useEffect(() => {
        async function fetchData() {
            try {
                const modelMachineResponse = await SelectListService.getMachineModel();
                setModelMachines(modelMachineResponse.data);

                const engineModelResponse = await SelectListService.getEngineModel();
                setModelEngines(engineModelResponse.data);

                const transmissionModelResponse = await SelectListService.getTransmissionModel();
                setModelTransmissions(transmissionModelResponse.data);

                const drivingBridgeModelResponse = await SelectListService.getDrivingBridgeModel();
                setModelDrivingBridges(drivingBridgeModelResponse.data);

                const controlledBridgeModelResponse = await SelectListService.getControlledBridgeModel();
                setModelControlledBridges(controlledBridgeModelResponse.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (resetValues) {
            setFilterValues({
                modelMachine: '',
                modelEngine: '',
                modelTransmission: '',
                modelDrivingBridge: '',
                modelControlledBridge: '',
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
            const response = await MachineService.getWithFilters(filterValues);
            setfilteredMachines(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilters = () => {
        setfilteredMachines('')
        setResetValues(true);
    };

    const handleCreateObject = () => {
        setModalCreateIsOpen(true)
    }

    const closeCreateModal = () => {
        setModalCreateIsOpen(false)
        setfilteredMachines('')
        setResetValues(true);
    }

    return (
        <div className='filters'>
            <form className='filters-form' onSubmit={handleFilterSubmit}>
                <div className="select">
                    <MySelect
                        label="Модель оборудования"
                        name="modelMachine"
                        value={filterValues.modelMachine}
                        options={modelMachines}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Модель двигателя"
                        name="modelEngine"
                        value={filterValues.modelEngine}
                        options={modelEngines}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Модель трансмиссии"
                        name="modelTransmission"
                        value={filterValues.modelTransmission}
                        options={modelTransmissions}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Модель ведущего моста"
                        name="modelDrivingBridge"
                        value={filterValues.modelDrivingBridge}
                        options={modelDrivingBridges}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Модель управляемого моста"
                        name="modelControlledBridge"
                        value={filterValues.modelControlledBridge}
                        options={modelControlledBridges}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                </div>
                <div className="button">
                    <MyButton type="submit">Применить фильтры</MyButton>
                    <MyButton onClick={handleResetFilters}>Сбросить все фильтры</MyButton>
                    {!isManager ? null :
                        <MyButton onClick={handleCreateObject}>Добавить Машину</MyButton>}
                </div>
            </form> 
            <Modal
                className="modal-create"
                isOpen={modalCreateIsOpen}
                onRequestClose={closeCreateModal}
                contentLabel="Object Create Modal"
            >
                <MachineForm />
                <hr />
                <MyButton onClick={closeCreateModal}>Закрыть</MyButton>
            </Modal> 

            <MachineList filteredMachines={filteredMachines} />
        </div>
    )
}

