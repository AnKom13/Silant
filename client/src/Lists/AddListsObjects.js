import React, { useState } from 'react';
import Modal from 'react-modal';
import Axios from '../axiosConfig';

import MyCreateForm from '../UI/Form/MyCreateForm';
import MyEditForm from '../UI/Form/MyEditForm';
import MyButton from "../UI/Button/MyButton";

import '../styles/GetTable.css';

export default function AddListsObjects({url, label}) {
  const [modalListOpen, setModalListOpen] = useState(false);
  const [equipmentModels, setEquipmentModels] = useState([]);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedModel, setDeletedModel] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editModel, setEditModel] = useState(null);

  const handleListClick = async () => {
    try {
      const response = await Axios.get(`/${url}/`);
      setEquipmentModels(response.data);
      setModalListOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setCreateFormOpen(true);
  };

  const handleEditClick = (equipmentModel) => {
    setEditModel(equipmentModel);
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

  const handleDeleteClick = (equipmentModel) => {
    setDeletedModel(equipmentModel);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await Axios.delete(`/${url}/${deletedModel.title}`);
      setEquipmentModels(equipmentModels.filter(model => model.title !== deletedModel.title));
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
            <MyEditForm title={editModel.title} url={url}/>
            <hr />
            <div className="buttons">
              <MyButton onClick={closeListModal}>Закрыть</MyButton>
              <MyButton onClick={handleEditFormClose}>Назад</MyButton>
            </div>
          </div>
        ) : deleteConfirmation ? (
          <div className="delete-confirmation">
            <h3>Вы действительно хотите удалить {deletedModel.title}?</h3>
            <div className="buttons">
              <MyButton onClick={handleConfirmDelete}>Удалить</MyButton>
              <MyButton onClick={handleCancelDelete}>Отменить</MyButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="modal-list-container">
              <ul className='modal-li'>
                {equipmentModels.map((equipmentModel) => (
                  <li key={equipmentModel.id}>
                    <div className="list-item">
                      <span className="modal-title">{equipmentModel.title}</span>
                      <div className="actions">
                        <MyButton onClick={() => handleEditClick(equipmentModel)}>Изменить</MyButton>
                        <MyButton onClick={() => handleDeleteClick(equipmentModel)}>Удалить</MyButton>
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

