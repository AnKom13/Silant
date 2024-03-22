import React, { useState } from 'react'

import MachineService from '../API/MachineService';

import MyInput from '../UI/Input/MyInput';
import MyButton from '../UI/Button/MyButton';

import '../styles/GetTable.css'

export default function SearchMachines() {
    const [serialNumber, setSerialNumber] = useState('');
    const [machineData, setMachineData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

//процедура на кнопку найти
    const handleSerialNumberChange = (event) => {
        setSerialNumber(event.target.value);
    };

// удаляет лишние пробелы с начала и конца и очищает данные 
    const handleSearch = async () => {
        if (serialNumber.trim() === '') {
            setMachineData('')
            setErrorMessage('')
            return;
        }
    
        try {
            const response = await MachineService.getWithSearch(serialNumber);
            const data = response.data;
            if (data.length > 0) {
                setMachineData(data[0]);
                setErrorMessage('');
             } else {
                 setMachineData('');
                 setErrorMessage('Данных нет');
             }
        } catch (error) {
            setMachineData('');
            setErrorMessage('Ошибка запроса');
        }
    };

    return (
        <div className='unauthorizate-body'>
            <div className='info'>
                <h1 style={{ color: '#163E6C' }}>Проверьте комплектацию и технические характеристики техники Силант</h1>
            </div>
            <div className="search-wrapper">
            <MyInput
                type="text"
                placeholder="Введите серийный № машины"
                value={serialNumber}
                onChange={handleSerialNumberChange}
            />
            <MyButton onClick={handleSearch}>Найти</MyButton>
            </div>
            {machineData && (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead style={{color: '#163E6C',}}>
                            <tr>
                                <th>Зав. № машины</th>
                                <th>Модель техники</th>
                                <th>Модель двигателя</th>
                                <th>Зав. № двигателя</th>
                                <th>Модель трансмиссии</th>
                                <th>Зав. № трансмиссии</th>
                                <th>Модель ведущего моста</th>
                                <th>Зав. № ведущего моста</th>
                                <th>Модель управляемого моста</th>
                                <th>Зав. № управляемого моста</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={machineData.id}>
                                <td>{machineData.factoryNumMachine}</td>
                                <td>{machineData.modelMachine}</td>
                                <td>{machineData.modelEngine}</td>
                                <td>{machineData.factoryNumEngine}</td>
                                <td>{machineData.modelTransmission}</td>
                                <td>{machineData.factoryNumTransmission}</td>
                                <td>{machineData.modelDrivingBridge}</td>
                                <td>{machineData.factoryNumDrivingBridge}</td>
                                <td>{machineData.modelControlledBridge}</td>
                                <td>{machineData.factoryNumControlledBridge}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {errorMessage && (
                <h3 style={{ textAlign: 'center' }}>{errorMessage}</h3>
            )}
        </div>
    );
}

