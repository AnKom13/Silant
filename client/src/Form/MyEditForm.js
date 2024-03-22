import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/MyTextarea/MyTextarea';

import './MyEditForm.css'

export default function MyEditForm({ name, url }) {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${url}/${name}`);
        setModel(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/${url}/${name}`, model);
      setSuccessMessage(`${name} успешно изменён`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>{successMessage}</h3>
      <form onSubmit={handleSubmit}>
        <div className='edit-form'>
          <h3>{!successMessage && 'Редактирование записи'}</h3>
          <label htmlFor="name">Название:</label>
            <MyInput
              type="text"
              name="name"
              value={model.name}
              onChange={handleInputChange}
            />
          <label htmlFor="description">Описание:</label>
            <MyTextarea
              type="text"
              name="description"
              value={model.description}
              onChange={handleInputChange}
            />
          <MyButton type="submit">Сохранить</MyButton>
        </div>
      </form>
    </div>
  );
}

