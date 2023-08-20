import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';

import { isClose, modalSelector } from '../../../slices/modalsSlice.js';
import { selectors } from '../../../slices/channelsSlice.js';
import { useWSocket } from '../../../hooks/WScontext.jsx';
import { getValidationSchema } from './AddChannel.jsx';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const wsocket = useWSocket();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const { extraData } = useSelector(modalSelector);
  const channelsData = useSelector(selectors.selectAll);
  const channels = channelsData.map((el) => el.name);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.select();
    }, 0);
  }, []);

  const handleClose = () => {
    dispatch(isClose());
  };

  const formik = useFormik({
    initialValues: {
      name: extraData?.name || '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async (values) => {
      try {
        const cleanName = filter.clean(values.name);
        getValidationSchema(channels, t).validateSync({ name: cleanName });
        await wsocket.emitRenameChannel(extraData.id, cleanName);
        formik.values.name = '';
        toast.info(t('toast.renameChannel'));
        handleClose();
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.name}
              // onBlur={formik.handleBlur}
              name="name"
              id="name"
              required
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <label className="visually-hidden" htmlFor="name">
              {t('nameChannel')}
            </label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
