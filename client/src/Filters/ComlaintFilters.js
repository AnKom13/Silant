import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Modal from 'react-modal'

import SelectListService from '../API/SelectListService';
import ComplaintService from '../API/ComplaintService';

import ComplaintList from '../components/ComplaintList';
import ComplaintForm from '../Form/ComplaintForm'

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

import './Filters.css'
import '../styles/GetTable.css';

export default function ComplaintFilters() {

    const [filteredComplaints, setFilteredComplaints] = useState('');

    const [nodeRefusals, setNodeRefusals] = useState([]);
    const [recoveryMethods, setRecoveryMethods] = useState([]);
    const [serviceCompanies, setServiceCompanies] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

    const isClient = useSelector(state => state.auth.client);

    const factoryNumMachine = useSelector(state => state.auth.factoryNumMachine);
    const factoryNumMachineId = useSelector(state => state.auth.factoryNumMachineId);

    const [filterValues, setFilterValues] = useState({
        nodeRefusal: '',
        recoveryMethod: '',
        serviceCompany: '',
        factoryNumMachine: factoryNumMachineId,
    });

    useEffect(() => {
        if (filteredComplaints === '') {
            ComplaintService.getWithFilters(filterValues).then(resp => { setFilteredComplaints(resp.data) })
        }
    }, [filteredComplaints])

    useEffect(() => {
        async function fetchData() {
            try {
                const nodeRefusalResponse = await SelectListService.getNodeRefusal();
                setNodeRefusals(nodeRefusalResponse.data);

                const recoveryMethodResponse = await SelectListService.getRecoveryMethod();
                setRecoveryMethods(recoveryMethodResponse.data);

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
                nodeRefusal: '',
                recoveryMethod: '',
                serviceCompany: '',
                factoryNumMachine: factoryNumMachineId,
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
            const response = await ComplaintService.getWithFilters(filterValues);
            setFilteredComplaints(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilters = () => {
        setFilteredComplaints('')
        setResetValues(true);
    };

    const handleCreateObject = () => {
        setModalCreateIsOpen(true)
    }

    const closeCreateModal = () => {
        setModalCreateIsOpen(false)
        setFilteredComplaints('')
    }

    return (
        <div className='filters'>
            {factoryNumMachine ?
                    null:  
            <form className='filters-form' onSubmit={handleFilterSubmit}>
                <div className="select">
                    <MySelect
                        label="Узел отказа"
                        name="nodeRefusal"
                        value={filterValues.nodeRefusal}
                        options={nodeRefusals}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Способ восстановления"
                        name="recoveryMethod"
                        value={filterValues.recoveryMethod}
                        options={recoveryMethods}
                        field={'name'}
                        onChange={handleFilterChange}
                    />

                    <MySelect
                        label="Сервисная компания"
                        name="serviceCompany"
                        value={filterValues.serviceCompany}
                        options={serviceCompanies}
                        field={'name'}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="button">
                    <MyButton type="submit">Применить фильтры</MyButton>
                    <MyButton onClick={handleResetFilters}>Сбросить все фильтры</MyButton>
                    {!isClient ? 
                    <MyButton onClick={handleCreateObject}>Добавить рекламацию</MyButton> : null}
                </div>
            </form >}
            <Modal
                className="modal-create"
                isOpen={modalCreateIsOpen}
                onRequestClose={closeCreateModal}
                contentLabel="Object Crate Modal"
            >
                <ComplaintForm />
                <hr />
                <MyButton onClick={closeCreateModal}>Закрыть</MyButton>
            </Modal>
            <ComplaintList filteredComplaints={filteredComplaints} />
        </div >
    )
}

