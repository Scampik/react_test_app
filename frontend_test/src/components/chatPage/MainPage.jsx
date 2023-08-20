import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import ChannelForm from './components/ChannelForm.jsx';
import ChatForm from './components/ChatForm.jsx';
import { getChannels, selectors } from '../../slices/channelsSlice.js';
import { getAuthHeader, useAuth } from '../../hooks/AuthContext.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectors.selectAll);
  const auth = useAuth();

  useEffect(() => {
    const authHeader = getAuthHeader(auth.userName);
    dispatch(getChannels(authHeader));
  }, [auth.userName, dispatch]);

  return (
    <>
      {!data ? (
        <div className="d-flex justify-content-center h-100 align-items-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelForm />
            <ChatForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
