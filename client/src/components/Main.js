import React, { useState } from "react";
import { useSelector } from "react-redux";

import MachineFilters from "../Filters/MachineFilters";
import TechnicalServiceFilters from "../Filters/TechnicalServiceFilters";

import ComplaintFilters from "../Filters/ComlaintFilters";

import MyButton from "../UI/Button/MyButton";
import '../styles/Main.css'

export default function Main() {
    const [activeTab, setActiveTab] = useState('MachineList')
    const user = useSelector(state => state.auth.username);
    const factoryNumMachine = useSelector(state => state.auth.factoryNumMachine);
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="main">
            <h1>Здравствуйте {user}</h1>
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
            {activeTab === "MachineList" && <MachineFilters />} 

            {activeTab === "TechnicalServiceList" && <TechnicalServiceFilters />}
            {activeTab === "ReclamationList" && <ComplaintFilters />}
        </div>
    )
}

