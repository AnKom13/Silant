import React, { useState } from 'react';
import axios from "../../axiosConfig";

import MyTextarea from '../MyTextarea/MyTextarea';
import MyButton from '../Button/MyButton';
import MyInput from '../Input/MyInput';

import './MyCreateForm.css'

export default function MyCreateForm({url}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/${url}/`, {
        title: title,
        description: description
      });
      setSuccessMessage(`${title} успешно добавлен`);
      setTitle('')
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
            <label htmlFor="title">Название:</label>
            <MyInput
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

