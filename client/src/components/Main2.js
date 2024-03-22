import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TechnicalServiceFilters from "../Filters/TechnicalServiceFilters";
import MachineList from '../components/MachineList';
import MachineService from '../API/MachineService';

import ComplaintFilters from "../Filters/ComlaintFilters";
import { useDispatch } from 'react-redux';
import { choiceMachineOff } from '../authReducer';

import MyButton from "../UI/Button/MyButton";

import '../styles/Main.css'

export default function Main2() {
    const [activeTab, setActiveTab] = useState('TechnicalServiceList')
    const factoryNumMachine = useSelector(state => state.auth.factoryNumMachine);
    const [filteredMachines, setfilteredMachines] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleOutClick = () => {
        dispatch(choiceMachineOff());
    };

    useEffect(() => {
    async function fetchData() {
        try {
            const response = await MachineService.getWithSearch(factoryNumMachine);

            const data = response.data;
            if (data.length > 0) {
                setfilteredMachines(data);
                setErrorMessage('');
             } else {
                setfilteredMachines('');
                setErrorMessage('Данных нет');
             }
        } catch (error) {
            setfilteredMachines('');
            setErrorMessage('Ошибка запроса');
        }
      }
      fetchData();
    }, []);

    return (
        <div className="main">
            <h1>Детальная информация о машине с заводским номером {factoryNumMachine}</h1>
            <div className="main-buttons">
                <MyButton
                    onClick={() => handleTabClick("MachineList")}
                    style={{
                        border: activeTab === "MachineList" ? "2px solid #D20A11" : "2px solid #163E6C",
                        background: activeTab === "MachineList" ? "#EBE6D6" : "#f5d7bf",
                    }}
                >
                    Общая информация
                </MyButton>
                <MyButton
                    onClick={() => handleTabClick("TechnicalServiceList")}
                    style={{
                        border: activeTab === "TechnicalServiceList" ? "2px solid #D20A11" : "2px solid #163E6C",
                        background: activeTab === "TechnicalServiceList" ? "#EBE6D6" : "#f5d7bf",
                    }}
                >
                    Техническое обслуживание
                </MyButton>
                <MyButton
                    onClick={() => handleTabClick("ReclamationList")}
                    style={{
                        border: activeTab === "ReclamationList" ? "2px solid #D20A11" : "2px solid #163E6C",
                        background: activeTab === "ReclamationList" ? "#EBE6D6" : "#f5d7bf",
                    }}
                >
                    Рекламации
                </MyButton>
            </div>
            <hr />
            {activeTab === "MachineList" && <MachineList filteredMachines={filteredMachines} />} 
            {activeTab === "TechnicalServiceList" && <TechnicalServiceFilters />}
            {activeTab === "ReclamationList" && <ComplaintFilters />}

            <MyButton
                    onClick={() => handleOutClick()}
                >
                    Выход
                </MyButton>
 
        </div>
    )
}

 