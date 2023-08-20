import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { isClose, modalSelector } from '../../../slices/modalsSlice.js';
import { useWSocket } from '../../../hooks/WScontext.jsx';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const wsocket = useWSocket();
  const { t } = useTranslation();

  const { extraData } = useSelector(modalSelector);

  const handleClose = () => {
    dispatch(isClose());
  };

  const handleRemove = async () => {
    try {
      wsocket.emitRemoveChannel(extraData.id);
      dispatch(isClose());
      toast.warn(t('toast.removeChannel'));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
          <button
            className="btn btn-danger"
            variant="primary"
            type="submit"
            onClick={handleRemove}
          >
            {t('delete')}
          </button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
