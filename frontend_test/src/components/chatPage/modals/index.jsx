import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { isClose, modalSelector } from '../../../slices/modalsSlice.js';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const ModalForm = () => {
  const dispatch = useDispatch();

  const { isShow, type } = useSelector(modalSelector);

  const handleClose = () => {
    dispatch(isClose());
  };

  if (!type) {
    return null;
  }
  const Component = modals[type];
  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      dialogClassName="modal-dialog-centered"
    >
      <Component />
    </Modal>
  );
};
export default ModalForm;
