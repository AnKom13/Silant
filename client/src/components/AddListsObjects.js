import React, { useState } from 'react';
import Modal from 'react-modal';
import Axios from '../axiosConfig';

import MyCreateForm from '../Form/MyCreateForm';
import MyEditForm from '../Form/MyEditForm';
import MyButton from "../UI/Button/MyButton";

import '../styles/GetTable.css';

export default function AddListsObjects({url, label}) {
  const [modalListOpen, setModalListOpen] = useState(false);
  const [modelMachines, setModelMachines] = useState([]);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedModel, setDeletedModel] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editModel, setEditModel] = useState(null);

  const handleListClick = async () => {
    try {
      const response = await Axios.get(`/${url}/`);
      setModelMachines(response.data);
      setModalListOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setCreateFormOpen(true);
  };

  const handleEditClick = (item) => {
    setEditModel(item);
    setEditFormOpen(true);
  };

  const handleAddFormClose = () => {
    setCreateFormOpen(false)
    setModalListOpen(false)
    handleListClick()
  }

  const handleEditFormClose = () => {
    setEditFormOpen(false)
    setModalListOpen(false)
    handleListClick()
  }

  const handleDeleteClick = (item) => {
    setDeletedModel(item);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await Axios.delete(`/${url}/${deletedModel.name}`);
      setModelMachines(modelMachines.filter(model => model.name !== deletedModel.name));
      setDeleteConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };

  const closeListModal = () => {
    setModalListOpen(false);
    setCreateFormOpen(false);
    setDeleteConfirmation(false);
    setEditFormOpen(false);
  };


  return (
    <>
      <MyButton onClick={handleListClick}>{label}</MyButton>
      <Modal
        className="list-modal"
        isOpen={modalListOpen}
        onRequestClose={closeListModal}
      >
        {createFormOpen ? (
          <div>
            <MyCreateForm url={url}/>
            <hr />
            <div className="buttons">
              <MyButton onClick={closeListModal}>Закрыть</MyButton>
              <MyButton onClick={handleAddFormClose}>Назад</MyButton>
            </div>
          </div>
        ) : editFormOpen ? (
          <div>
            <MyEditForm name={editModel.name} url={url}/>
            <hr />
            <div className="buttons">
              <MyButton onClick={closeListModal}>Закрыть</MyButton>
              <MyButton onClick={handleEditFormClose}>Назад</MyButton>
            </div>
          </div>
        ) : deleteConfirmation ? (
          <div className="delete-confirmation">
            <h3>Вы действительно хотите удалить {deletedModel.name}?</h3>
            <div className="buttons">
              <MyButton onClick={handleConfirmDelete}>Удалить</MyButton>
              <MyButton onClick={handleCancelDelete}>Отменить</MyButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="modal-list-container">
              <ul className='modal-li'>
                {modelMachines.map((item) => (
                  <li key={item.id}>
                    <div className="list-item">
                      <span className="modal-name">{item.name}</span>
                      <div className="actions">
                        <MyButton onClick={() => handleEditClick(item)}>Изменить</MyButton>
                        <MyButton onClick={() => handleDeleteClick(item)}>Удалить</MyButton>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr/>
            <div className="buttons">
              <MyButton onClick={handleAddClick}>Добавить</MyButton>
              <MyButton onClick={closeListModal}>Закрыть</MyButton>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

