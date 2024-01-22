import { useState } from 'react';

const useModal = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = content => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { modalContent, openModal, closeModal, isModalOpen };
};

export default useModal;
