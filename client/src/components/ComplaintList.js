import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from './AddListsObjects.js'

import '../styles/GetTable.css'

export default function ComplaintList({ filteredComplaints }) {
    const isManager = useSelector(state => state.auth.manager);

    const [complaints, setComplaint] = useState([]);
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedNodeRefusal, setSelectedNodeRefusal] = useState('');
    const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState('');
    const [selectedServiceCompany, setSelectedServiceCompany] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        setComplaint(filteredComplaints);
    }, [filteredComplaints]);

    useEffect(() => {
        if (selectedNodeRefusal) {
            ListService.getNodeRefusal(selectedNodeRefusal)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedNodeRefusal]);

    useEffect(() => {
        if (selectedRecoveryMethod) {
            ListService.getRecoveryMethod(selectedRecoveryMethod)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedRecoveryMethod]);


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

    const handleNodeRefusalClick = (complaint) => {
        setSelectedNodeRefusal(complaint);
    };

    const handleRecoveryMethodClick = (complaint) => {
        setSelectedRecoveryMethod(complaint);
    };

    const handleServiceCompanyClick = (machine) => {
        setSelectedServiceCompany(machine);
    };

    const closeModal = () => {
        setSelectedNodeRefusal('');
        setSelectedRecoveryMethod('');
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

    const sortedComplaints = complaints && complaints.length ? complaints.sort((a, b) => {
        if (sortColumn === 'refusalDate') {
            return sortDirection === 'asc' ? a.refusalDate.localeCompare(b.refusalDate) : b.refusalDate.localeCompare(a.refusalDate);
        } else if (sortColumn === 'operatingHours') {
            return sortDirection === 'asc' ? a.operatingHours - b.operatingHours : b.operatingHours - a.operatingHours;
        } else if (sortColumn === 'nodeRefusal') {
            return sortDirection === 'asc' ? a.refusalDate.localeCompare(b.nodeRefusal) : b.nodeRefusal.localeCompare(a.nodeRefusal);
        } else if (sortColumn === 'descriptionRefusal') {
            return sortDirection === 'asc' ? a.descriptionRefusal.localeCompare(b.descriptionRefusal) : b.descriptionRefusal.localeCompare(a.descriptionRefusal);
        } else if (sortColumn === 'recoveryMethod') {
            return sortDirection === 'asc' ? a.recoveryMethod.localeCompare(b.recoveryMethod) : b.recoveryMethod.localeCompare(a.recoveryMethod);
        } else if (sortColumn === 'sparePartsUsed') {
            return sortDirection === 'asc' ? a.sparePartsUsed.localeCompare(b.sparePartsUsed) : b.sparePartsUsed.localeCompare(a.sparePartsUsed);
        } else if (sortColumn === 'recoveryDate') {
            return sortDirection === 'asc' ? a.recoveryDate.localeCompare(b.recoveryDate) : b.recoveryDate.localeCompare(a.recoveryDate);
        } else if (sortColumn === 'downtime') {
            return sortDirection === 'asc' ? a.downtime - b.downtime : b.downtime - a.downtime;
        } else if (sortColumn === 'factoryNumMachine') {
        //     return sortDirection === 'asc' ? a.factoryNumMachine.localeCompare(b.factoryNumMachine) : b.factoryNumMachine.localeCompare(a.factoryNumMachine);
            return sortDirection === 'asc' ? a.factoryNumMachine - b.factoryNumMachine : b.factoryNumMachine - a.factoryNumMachine; //так тоже работает поле текст(содержит только цифры) 
        } else if (sortColumn === 'serviceCompany') {
            return sortDirection === 'asc' ? a.serviceCompany.localeCompare(b.serviceCompany) : b.serviceCompany.localeCompare(a.serviceCompany);
        }
        return 0;
    }) : [];


    return (
        <div className='authorizate-body'>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о рекламациях</h1>
            </div>
            {!isManager ? null :
                <div className="list-buttons">
                    <AddListsObjects url={'node-refusal'} label={'Добавить Узел отказа'} />
                    <AddListsObjects url={'recovery-method'} label={'Добавить Способ восстановления'} />
                </div>}
            {complaints.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('refusalDate')}>
                                    Дата отказа
                                    {sortColumn === 'refusalDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('operatingHours')}>
                                    Наработка, м/час
                                    {sortColumn === 'operatingHours' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('nodeRefusal')}>
                                    Узел отказа
                                    {sortColumn === 'nodeRefusal' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('descriptionRefusal')}>
                                    Описание отказа
                                    {sortColumn === 'descriptionRefusal' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('recoveryMethod')}>
                                    Способ восстановления
                                    {sortColumn === 'recoveryMethod' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('sparePartsUsed')}>
                                    Запасные части
                                    {sortColumn === 'sparePartsUsed' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('recoveryDate')}>
                                    Дата восстановления
                                    {sortColumn === 'recoveryDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('downtime')}>
                                    Время простоя техники
                                    {sortColumn === 'downtime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
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
                            {sortedComplaints.map(complaint => (
                                <tr key={complaint.id}>
                                    <td>{complaint.refusalDate}</td>
                                    <td>{complaint.operatingHours}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleNodeRefusalClick(complaint.nodeRefusal)}>
                                        {complaint.nodeRefusal}
                                    </td>
                                    <td>{complaint.descriptionRefusal}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleRecoveryMethodClick(complaint.recoveryMethod)}>
                                        {complaint.recoveryMethod}
                                    </td>
                                    <td>{complaint.sparePartsUsed}</td>
                                    <td>{complaint.recoveryDate}</td>
                                    <td>{complaint.downtime}</td>
                                    <td>{complaint.factoryNumMachine}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleServiceCompanyClick(complaint.serviceCompany)}>
                                        {complaint.serviceCompany}
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 style={{ color: '#D20A11', textAlign: 'center' }}>Рекламации с выбранными параметрами отсутствуют</h3>
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
    )
}

