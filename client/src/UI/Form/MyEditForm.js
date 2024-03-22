import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

import MyButton from '../Button/MyButton';
import MyInput from '../Input/MyInput';
import MyTextarea from '../MyTextarea/MyTextarea';

import './MyEditForm.css'

export default function MyEditForm({ title, url }) {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${url}/${title}`);
        setModel(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [title, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/${url}/${title}`, model);
      setSuccessMessage(`${title} успешно изменён`);
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
          <label htmlFor="title">Название:</label>
            <MyInput
              type="text"
              name="title"
              value={model.title}
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

