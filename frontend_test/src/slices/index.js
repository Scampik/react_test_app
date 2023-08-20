import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalsSlice';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';

// export {};
export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modalInfo: modalReducer,
  },
});
