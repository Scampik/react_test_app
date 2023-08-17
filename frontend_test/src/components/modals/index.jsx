import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const getModal = ({ type }) => {
  if (!type) {
    return null;
  }
  const Component = modals[type];
  return <Component />;
};
export default getModal;
