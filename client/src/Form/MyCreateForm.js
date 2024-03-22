import React, { useState } from 'react';
import axios from "../axiosConfig";

import MyTextarea from '../UI/MyTextarea/MyTextarea';
import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';

import './MyCreateForm.css'

export default function MyCreateForm({url}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/${url}/`, {
        name: name,
        description: description
      });
      setSuccessMessage(`${name} успешно добавлен`);
      setName('')
      setDescription('')
    } catch (error) {
      setSuccessMessage('Вы ввели неверные данные');
    }
  };

  return (
    <>
      <div>
        <h3 style={{ textAlign: 'center' }}>
          <span className={successMessage === 'Вы ввели неверные данные' ? 'error-message' : ''}>
            {successMessage}
          </span>
        </h3>
        <form onSubmit={handleSubmit}>
          <div className='create-form'>
            <h3>{!successMessage && 'Создание записи'}</h3>
            <label htmlFor="name">Название:</label>
            <MyInput
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description">Описание:</label>
            <MyTextarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <MyButton type="submit">Сохранить</MyButton>
          </div>
        </form>
      </div>
    </>
  )
};

