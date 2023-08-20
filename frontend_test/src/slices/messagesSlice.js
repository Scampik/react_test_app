import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { getChannels, actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessage: messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        console.log('fetched data successfully!{messages}');
        const { messages } = payload;
        messagesAdapter.setMany(state, messages);
        return messages.messages;
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
