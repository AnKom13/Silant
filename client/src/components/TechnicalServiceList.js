import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from './AddListsObjects.js'

import '../styles/GetTable.css'

export default function TechnicalServiceList({ filteredTechnicalService }) {
    const isManager = useSelector(state => state.auth.manager);

    const [technicalServices, setTechnicalServices] = useState([]);
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedServiceCompany, setSelectedServiceCompany] = useState('');
    const [selectedTechnicalServiceLogin, setSelectedTechnicalServiceLogin] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        setTechnicalServices(filteredTechnicalService);
    }, [filteredTechnicalService]);

    useEffect(() => {
        if (selectedType) {
            ListService.getTypeTechnicalServices(selectedType)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedType]);

    useEffect(() => {
        if (selectedTechnicalServiceLogin) {
            ListService.getServiceCompany(selectedTechnicalServiceLogin)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedTechnicalServiceLogin]);
    
    useEffect(() => {
        if (selectedServiceCompany) {
            ListService.getServiceCompany(selectedServiceCompany)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedServiceCompany]);   
    
    const handleTypeClick = (technicalService) => {
        setSelectedType(technicalService);
    };

    const handleServiceCompanyClick = (item) => {
        setSelectedServiceCompany(item);
    };

    const closeModal = () => {
        setSelectedType('');
        setSelectedTechnicalServiceLogin('');
        setSelectedServiceCompany('');
        setModalIsOpen(false)
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedTechnicalServices = technicalServices && technicalServices.length ? technicalServices.sort((a, b) => {
        if (sortColumn === 'typeTechnicalService') {
            return sortDirection === 'asc' ? a.typeTechnicalService.localeCompare(b.typeTechnicalService) : b.typeTechnicalService.localeCompare(a.typeTechnicalService);
        } else if (sortColumn === 'technicalServiceDate') {
            return sortDirection === 'asc' ? a.technicalServiceDate.localeCompare(b.technicalServiceDate) : b.technicalServiceDate.localeCompare(a.technicalServiceDate);
        } else if (sortColumn === 'operatingHours') {
            return sortDirection === 'asc' ? a.operatingTime - b.operatingTime : b.operatingTime - a.operatingTime;
        } else if (sortColumn === 'orderNum') {
            return sortDirection === 'asc' ? a.workOrder.localeCompare(b.workOrder) : b.workOrder.localeCompare(a.workOrder);
        } else if (sortColumn === 'orderDate') {
            return sortDirection === 'asc' ? a.orderDate.localeCompare(b.orderDate) : b.orderDate.localeCompare(a.orderDate);
        } else if (sortColumn === 'factoryNumMachine') {
            return sortDirection === 'asc' ? a.factoryNumMachine.localeCompare(b.factoryNumMachine) : b.factoryNumMachine.localeCompare(a.factoryNumMachine);
        } else if (sortColumn === 'serviceCompany') {
            return sortDirection === 'asc' ? a.serviceCompany.localeCompare(b.serviceCompany) : b.serviceCompany.localeCompare(a.serviceCompany);
        }
        return 0;
    }) : [];

    return (
        <div className='authorizate-body'> 
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о проведённых ТО</h1>
            </div>
            {!isManager ? null :
                <div className="list-buttons">
                    <AddListsObjects url={'type-technical-service'} label={'Добавить Вид ТО'} />
                </div>}
            {technicalServices.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('typeTechnicalService')}>
                                    Вид ТО
                                    {sortColumn === 'typeTechnicalService' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('technicalServiceDate')}>
                                    Дата проведения ТО
                                    {sortColumn === 'technicalServiceDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('operatingTime')}>
                                    Наработка, м/час
                                    {sortColumn === 'operatingTime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('workOrder')}>
                                    № заказ-наряда
                                    {sortColumn === 'workOrder' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('orderDate')}>
                                    Дата заказ-наряда
                                    {sortColumn === 'orderDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>

                                <th onClick={() => handleSort('factoryNumMachine')}>
                                    Зав. № машины
                                    {sortColumn === 'factoryNumMachine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('serviceCompany')}>
                                    Сервисная компания
                                    {sortColumn === 'serviceCompany' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTechnicalServices.map(technicalService => (
                                <tr key={technicalService.id}>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleTypeClick(technicalService.typeTechnicalService)}>
                                        {technicalService.typeTechnicalService}
                                    </td>
                                    <td>{technicalService.technicalServiceDate}</td>
                                    <td>{technicalService.operatingHours}</td>
                                    <td>{technicalService.orderNum}</td>
                                    <td>{technicalService.orderDate}</td>
                                    <td>{technicalService.factoryNumMachine}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleServiceCompanyClick(technicalService.serviceCompany)}>
                                        {technicalService.serviceCompany}
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            ) : (
                <h3 style={{ color: '#D20A11', textAlign: 'center' }}>ТО с выбранными параметрами отсутствуют</h3>
            )}
            <Modal
                className="modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Object Info Modal"
            >
                <div className="info">
                    <h2>Наименование: {objectInfo.name}</h2>
                    Детальная информация
                    <hr></hr>
                    <p>{objectInfo.description}</p>
                </div>
                <MyButton onClick={closeModal}>Закрыть</MyButton>
            </Modal>
        </div>
    );
}

