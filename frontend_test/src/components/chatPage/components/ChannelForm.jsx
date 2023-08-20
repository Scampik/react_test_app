import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import {
  actions as channelsActions,
  selectors,
  currentChannelSelector,
} from '../../../slices/channelsSlice.js';
import { isOpen } from '../../../slices/modalsSlice.js';
import ModalForm from '../modals/index.jsx';
import UserChannel from './UserChannel.jsx';

const ChannelForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentChannel = useSelector(currentChannelSelector);
  const channels = useSelector(selectors.selectAll);

  const handleAddChannel = () => {
    dispatch(isOpen({ type: 'adding', extraData: '' }));
  };

  const handleCurrenChannel = (channel) => () => {
    dispatch(channelsActions.setCurrentChannel(channel));
  };

  const handleRemoveChannel = (channel) => () => {
    dispatch(isOpen({ type: 'removing', extraData: channel }));
  };

  const handleRenameChannel = (channel) => () => {
    dispatch(isOpen({ type: 'renaming', extraData: channel }));
  };

  const renderMainChannels = (channel) => (
    <Button
      type="button"
      variant={channel.id === currentChannel.id ? 'secondary' : ''}
      className="w-100 rounded-0 text-start"
      onClick={handleCurrenChannel(channel)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );

  const renderUsersChannels = (channel) => (
    <UserChannel
      handleCurrenChannel={handleCurrenChannel(channel)}
      handleRemoveChannel={handleRemoveChannel(channel)}
      handleRenameChannel={handleRenameChannel(channel)}
      channel={channel}
    />
  );

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleAddChannel}
        >
          <PlusSquare width="22" height="22" />
          <span className="visually-hidden">+</span>
        </button>
        <ModalForm />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {!channel.removable
              ? renderMainChannels(channel)
              : renderUsersChannels(channel)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelForm;
