import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { currentChannelSelector } from '../../../slices/channelsSlice.js';

const UserChannel = ({
  channel,
  handleCurrenChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();
  const currentChannel = useSelector(currentChannelSelector);

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        type="button"
        variant={channel.id === currentChannel.id ? 'secondary' : ''}
        key={channel.id}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={handleCurrenChannel}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        className="flex-grow-0"
        variant={channel.id === currentChannel.id ? 'secondary' : ''}
      >
        <span className="visually-hidden">{t('menu')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel}>
          {t('delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserChannel;
