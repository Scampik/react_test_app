import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { isClose } from '../../../slices/modalsSlice.js';
import {
  selectors,
  actions as channelsActions,
} from '../../../slices/channelsSlice.js';
import { useWSocket } from '../../../hooks/WScontext.jsx';

export const getValidationSchema = (channelsName) => Yup.object().shape({
  name: Yup
    .string()
    .trim()
    .required('modal.required')
    .min(3, 'modal.min')
    .max(20, 'modal.max')
    .notOneOf(channelsName, 'modal.notoneof'),
});

const AddChannel = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const wsocket = useWSocket();
  const { t } = useTranslation();

  const channelsData = useSelector(selectors.selectAll);
  const channels = channelsData.map((el) => el.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    dispatch(isClose());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async (values) => {
      try {
        const cleanName = filter.clean(values.name);
        getValidationSchema(channels, t).validateSync({ name: cleanName });
        const data = await wsocket.emitAddChannel(cleanName);
        await dispatch(channelsActions.setCurrentChannel(data));
        formik.values.name = '';
        toast.success(t('toast.createChannel'));
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
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              required
              ref={inputRef}
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
              <Button variant="primary" type="submit">
                {t('send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
