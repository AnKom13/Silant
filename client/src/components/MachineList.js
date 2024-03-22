import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from './AddListsObjects.js'

import '../styles/GetTable.css'
import { useDispatch } from 'react-redux'; //это hook, который позволяет отправлять действия в хранилище Redux.
import { choiceMachineOn, choiceMachineOff } from '../authReducer'; //импорт функций choiceMachineOn и choiceMachineOff из редьюсера

export default function MachineList({ filteredMachines }) {
    const dispatch = useDispatch(); //получаю ссылку на функцию по отправке данных в хранилище напрямую
    const isManager = useSelector(state => state.auth.manager);

    const [machines, setMachines] = useState([])
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [selectedModelMachine, setSelectedModelMachine] = useState('');
    const [selectedModelEngine, setSelectedModelEngine] = useState('');
    const [selectedModelTransmission, setSelectedModelTransmission] = useState('');
    const [selectedModelDrivingBridge, setSelectedModelDrivingBridge] = useState('');
    const [selectedModelControlledBridge, setSelectedModelControlledBridge] = useState('');

    const [selectedClient, setSelectedClient] = useState('');
    const [selectedServiceCompany, setSelectedServiceCompany] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');


    useEffect(() => {
        setMachines(filteredMachines);
    }, [filteredMachines]);

    useEffect(() => {
          if (selectedModelMachine) {    
                ListService.getMachineModel(selectedModelMachine)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
         }
    }, [selectedModelMachine]);

    useEffect(() => {
            if (selectedModelEngine) {
                ListService.getEngineModel(selectedModelEngine)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedModelEngine]);

    useEffect(() => {
        if (selectedModelTransmission) {
            ListService.getTransmissionModel(selectedModelTransmission)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedModelTransmission]);

    useEffect(() => {
        if (selectedModelDrivingBridge) {
            ListService.getDrivingBridgeModel(selectedModelDrivingBridge)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedModelDrivingBridge]);

    useEffect(() => {
        if (selectedModelControlledBridge) {
            ListService.getControlledBridgeModel(selectedModelControlledBridge)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedModelControlledBridge]);

    useEffect(() => {
        if (selectedClient) {
            ListService.getClient(selectedClient)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedClient]);

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

    const handleModelMachineClick = (machine) => {
        setSelectedModelMachine(machine);
    };

    const handlemodelEngineClick = (machine) => {
        setSelectedModelEngine(machine);
    };

    const handlemodelTransmissionClick = (machine) => {
        setSelectedModelTransmission(machine);
    };

    const handlemodelDrivingBridgeClick = (machine) => {
        setSelectedModelDrivingBridge(machine);
    };

    const handlemodelControlledBridgeeClick = (machine) => {
        setSelectedModelControlledBridge(machine);
    };

    const handleClientClick = (machine) => {
        setSelectedClient(machine);
        
    };

    const handleServiceCompanyClick = (machine) => {
        setSelectedServiceCompany(machine);
    };

    const handleMachineClick = (factoryNumMachine, id) => {
          dispatch(choiceMachineOn({factoryNumMachine, id}));
      };

    const closeModal = () => {
        setSelectedModelMachine('');
        setSelectedModelEngine('');
        setSelectedModelTransmission('');
        setSelectedModelDrivingBridge('');
        setSelectedModelControlledBridge('');
        setSelectedClient('');
        setSelectedServiceCompany('');
        setModalIsOpen(false);
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedMachines = machines && machines.length ? machines.sort((a, b) => {
        if (sortColumn === 'factoryNumMachine') {
            return sortDirection === 'asc' ? a.factoryNumMachine.localeCompare(b.factoryNumMachine) : b.factoryNumMachine.localeCompare(a.factoryNumMachine);
        } else if (sortColumn === 'modelMachine') {
            return sortDirection === 'asc' ? a.modelMachine.localeCompare(b.modelMachine) : b.modelMachine.localeCompare(a.modelMachine);
        } else if (sortColumn === 'modelEngine') {
            return sortDirection === 'asc' ? a.modelEngine.localeCompare(b.modelEngine) : b.modelEngine.localeCompare(a.modelEngine);
        } else if (sortColumn === 'factoryNumEngine') {
            return sortDirection === 'asc' ? a.factoryNumEngine.localeCompare(b.factoryNumEngine) : b.factoryNumEngine.localeCompare(a.factoryNumEngine);
        } else if (sortColumn === 'modelTransmission') {
            return sortDirection === 'asc' ? a.modelTransmission.localeCompare(b.modelTransmission) : b.modelTransmission.localeCompare(a.modelTransmission);
        } else if (sortColumn === 'factoryNumTransmission') {
            return sortDirection === 'asc' ? a.factoryNumTransmission.localeCompare(b.factoryNumTransmission) : b.factoryNumTransmission.localeCompare(a.factoryNumTransmission);
        } else if (sortColumn === 'modelDrivingBridge') {
            return sortDirection === 'asc' ? a.modelDrivingBridge.localeCompare(b.modelDrivingBridge) : b.modelDrivingBridge.localeCompare(a.modelDrivingBridge);
        } else if (sortColumn === 'factoryNumDrivingBridge') {
            return sortDirection === 'asc' ? a.factoryNumDrivingBridge.localeCompare(b.factoryNumDrivingBridge) : b.factoryNumDrivingBridge.localeCompare(a.factoryNumDrivingBridge);
        } else if (sortColumn === 'modelControlledBridge') {
            return sortDirection === 'asc' ? a.modelControlledBridge.localeCompare(b.modelControlledBridge) : b.modelControlledBridge.localeCompare(a.modelControlledBridge);
        } else if (sortColumn === 'factoryNumControlledBridge') {
            return sortDirection === 'asc' ? a.factoryNumControlledBridge.localeCompare(b.factoryNumControlledBridge) : b.factoryNumControlledBridge.localeCompare(a.factoryNumControlledBridge);
        } else if (sortColumn === 'deliveryAgreementData') {
            return sortDirection === 'asc' ? a.deliveryAgreementData.localeCompare(b.deliveryAgreementData) : b.deliveryAgreementData.localeCompare(a.deliveryAgreementData);
        } else if (sortColumn === 'shipmentDate') {
            return sortDirection === 'asc' ? a.shipmentDate.localeCompare(b.shipmentDate) : b.shipmentDate.localeCompare(a.shipmentDate);
        } else if (sortColumn === 'reciver') {
            return sortDirection === 'asc' ? a.reciver.localeCompare(b.reciver) : b.reciver.localeCompare(a.reciver);
        } else if (sortColumn === 'deliveryAddress') {
            return sortDirection === 'asc' ? a.deliveryAddress.localeCompare(b.deliveryAddress) : b.deliveryAddress.localeCompare(a.deliveryAddress);
        } else if (sortColumn === 'equipment') {
            return sortDirection === 'asc' ? a.equipment.localeCompare(b.equipment) : b.equipment.localeCompare(a.equipment);
        } else if (sortColumn === 'client') {
            return sortDirection === 'asc' ? a.client.localeCompare(b.client) : b.client.localeCompare(a.client);
        } else if (sortColumn === 'serviceCompany') {
            return sortDirection === 'asc' ? a.serviceCompany.localeCompare(b.serviceCompany) : b.serviceCompany.localeCompare(a.serviceCompany);
        };

        return 0;
    }) : [];

    return (
        <div className='authorizate-body'>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о комплектации и технических характеристиках</h1>
            </div>
            {!isManager ? null :
                <div className="list-buttons">
                    <AddListsObjects url={'machine-model'} label={'Справочник: модели техники'} />
                    <AddListsObjects url={'engine-model'} label={'Справочник: модели двигателя'} />
                    <AddListsObjects url={'transmission-model'} label={'Справочник: модели трансмиссии'} />
                    <AddListsObjects url={'driving-bridge-model'} label={'Справочник: модели ведущего моста'} />
                    <AddListsObjects url={'controlled-bridge-model'} label={'Справочник: управляемого моста'} />
                </div>}
            {machines.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('factoryNumMachine')}>
                                    Зав. № машины
                                    {sortColumn === 'factoryNumMachine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('modelMachine')}>
                                    Модель техники
                                    {sortColumn === 'modelMachine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('modelEngine')}>
                                    Модель двигателя
                                    {sortColumn === 'modelEngine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('factoryNumEngine')}>
                                    Зав. № двигателя
                                    {sortColumn === 'factoryNumEngine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('modelTransmission')}>
                                    Модель трансмиссии
                                    {sortColumn === 'modelTransmission' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('factoryNumTransmission')}>
                                    Зав. № трансмиссии
                                    {sortColumn === 'factoryNumTransmission' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('modelDrivingBridge')}>
                                    Модель ведущего моста
                                    {sortColumn === 'modelDrivingBridge' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('factoryNumDrivingBridge')}>
                                    Зав. № ведущего моста
                                    {sortColumn === 'factoryNumDrivingBridge' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('modelControlledBridge')}>
                                    Модель управляемого моста
                                    {sortColumn === 'modelControlledBridge' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('factoryNumControlledBridge')}>
                                    Зав. № управляемого моста
                                    {sortColumn === 'factoryNumControlledBridge' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('deliveryAgreementData')}>
                                    Договор поставки №, дата
                                    {sortColumn === 'deliveryAgreementData' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('shipmentDate')}>
                                    Дата отгрузки с завода
                                    {sortColumn === 'shipmentDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('reciver')}>
                                    Грузополучатель
                                    {sortColumn === 'reciver' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('deliveryAddress')}>
                                    Адрес поставки
                                    {sortColumn === 'deliveryAddress' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('equipment')}>
                                    Комплектация
                                    {sortColumn === 'equipment' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('client')}>
                                    Клиент
                                    {sortColumn === 'client' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('serviceCompany')}>
                                    Сервисная компания
                                    {sortColumn === 'serviceCompany' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMachines.map(machine => (
                                <tr key={machine.id}>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleMachineClick(machine.factoryNumMachine, machine.id)}>
                                        {machine.factoryNumMachine}
                                    </td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleModelMachineClick(machine.modelMachine)}>
                                        {machine.modelMachine}
                                    </td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handlemodelEngineClick(machine.modelEngine)}>
                                        {machine.modelEngine}
                                    </td>
                                    <td>{machine.factoryNumEngine}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handlemodelTransmissionClick(machine.modelTransmission)}>
                                        {machine.modelTransmission}
                                    </td>
                                    <td>{machine.factoryNumTransmission}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handlemodelDrivingBridgeClick(machine.modelDrivingBridge)}>
                                        {machine.modelDrivingBridge}
                                    </td>
                                    <td>{machine.factoryNumDrivingBridge}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handlemodelControlledBridgeeClick(machine.modelControlledBridge)}>
                                        {machine.modelControlledBridge}
                                    </td>
                                    <td>{machine.factoryNumControlledBridge}</td>
                                    <td>{machine.deliveryAgreementData}</td>
                                    <td>{machine.shipmentDate}</td>
                                    <td>{machine.reciver}</td>
                                    <td>{machine.deliveryAddress}</td>
                                    <td
                                        style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                                        {machine.equipment}
                                    </td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleClientClick(machine.client)}>
                                        {machine.client}
                                        </td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleServiceCompanyClick(machine.serviceCompany)}>
                                        {machine.serviceCompany}
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 style={{ color: '#D20A11', textAlign: 'center' }}>Машины с выбранными параметрами отсутствуют</h3>
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

