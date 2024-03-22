import React, { useState } from 'react';
import axios from "../axiosConfig";
import  {API_DJANGO}  from '../api/config'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux'; //это hook, который позволяет отправлять действия в хранилище Redux.
import { login, updatePermissions } from '../authReducer'; //импорт функций login и updatePermission из редьюсера


import MyInput from '../UI/Input/MyInput';
import MyButton from '../UI/Button/MyButton';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); //получаю ссылку на функцию по отправке данных в хранилище напрямую

  //функция на нажатие кнопки в форме
  const handleLogin = async (e) => {
    e.preventDefault(); // отменяет отправку значениий в полях формы и позволяет обработать => код

    try {
//отправляет логин и пароль. Получает словарь из токенов refresh  и access
//axios - константа из axiosConfig
      const response = await axios.post('/token/', {
        username: username,
        password: password,
      });

      const data = response.data; // считываю словарь ответа
      const token = data.access; //забираю токен access

//отправляю данные токена access. Получаю в ответ словарь  вида {"username": "admin", "client": true, "company": true,"manager": false}
// отправка идет через get-user - это путь обрабатывается в urls.py строкой     path('get-user', GetUserAPIView.as_view()),
//View работает через serialaizers.py сериалайзер UserSerializer  (в нем ищется в таблицах client, manager, company этот юзер)
//В итоге формируется json объект вида ( имя и нахождение в таблицах)
//{
//  'username': 'admin',
//  'client': true,
//  'manager': true,
//  'company': true
//}

          try {
            const response = await axios.post(`${API_DJANGO}get-user`, {
              access: token
            });

            const permission = response.data;

//отправляю данные с помощью функции dispatch меняю состояние(state). Данные получены с помощью функции  updatePermissions из редьюсера,
//в качестве входных данных полученный словарь
//в редьюсере эта функция устанавливает (помещает) данные в хранилище и возвращает обновленный ГЛОБАЛЬНЫЙ state
            dispatch(updatePermissions(permission))
          } catch (error) {
            console.error(error);
          }
//схема та же, но в этот раз отправляю токены. А возвращаю state c токенами и с флагом isAuthenticated: true
        dispatch(login(data));
      } catch (error) {
        toast.error('Неверный пароль или логин. '); //вывожу всплывающее окошко при ошибке
      }
    };

    return (
//Форма ввода с двумя полями
//Компонент ToastContainer позволяет отобразить текст перехваченной "ошибки"
      <form className="login" onSubmit={handleLogin}>
        <label>
          Имя пользователя:
          <MyInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Пароль:
          <MyInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <MyButton type="submit">Вход</MyButton>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </form>
    );
  }
  
  