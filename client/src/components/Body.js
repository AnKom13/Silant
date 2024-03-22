import React from 'react';
import { useSelector } from 'react-redux';

import Main from "./Main";
import SearchMachines from "./SearchMachines";
import Main2 from "./Main2"

import "../styles/Body.css";

export default function Body() {
  const isUserAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const factoryNumMachine = useSelector(state => state.auth.factoryNumMachine);
  return (
    <div className='body'>
            {isUserAuthenticated&factoryNumMachine ? <Main2 /> : isUserAuthenticated ? <Main/> : <SearchMachines />}
    </div>
  );
}
