import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as Yup from 'yup';

import { selectors } from '../../../slices/messagesSlice.js';
import { useAuth } from '../../../hooks/AuthContext.jsx';
import { currentChannelSelector } from '../../../slices/channelsSlice.js';
import { useWSocket } from '../../../hooks/WScontext.jsx';

const ChatForm = () => {
  const auth = useAuth();
  const inputRef = useRef(null);
  const wsocket = useWSocket();
  const { t } = useTranslation();

  const currentChannel = useSelector(currentChannelSelector);
  const allMessages = useSelector(selectors.selectAll);
  const messages = allMessages.filter((el) => el.channelId === currentChannel.id);
  const userId = auth.userName;

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel, allMessages]);

  const validationSchema = Yup.object().shape({
    body: Yup.string().trim().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanBody = filter.clean(values.body);
      wsocket.emitNewMessage({
        body: cleanBody,
        channelId: currentChannel.id,
        username: userId.username,
      });
      formik.values.body = '';
    },
  });

  return (
    <>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                {'# '}
                {currentChannel.name}
              </b>
            </p>
            <span className="text-muted">
              {t('messages.counter.count', { count: messages.length })}
            </span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {messages.map((mess) => (
              <div key={mess.id} className="text-break mb-2">
                <b>{mess.username}</b>
                :
                {' '}
                {mess.body}
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 py-3">
            <Form
              onSubmit={formik.handleSubmit}
              noValidate
              className="py-1 border rounded-2"
            >
              <Form.Group className="input-group has-validation">
                <Form.Control
                  className="border-0 p-0 ps-2"
                  onChange={formik.handleChange}
                  value={formik.values.body}
                  name="body"
                  aria-label="Новое сообщение"
                  ref={inputRef}
                  onBlur={formik.handleBlur}
                  placeholder="Введите сообщение..."
                />
                <Button type="submit" variant="group-vertical" disabled="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fillRule="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    />
                  </svg>
                  <span className="visually-hidden">{t('send')}</span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatForm;
