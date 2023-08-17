import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modalInfo: modalReducer,
  },
});
