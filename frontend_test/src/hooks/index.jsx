import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { WSocketContext } from '../contexts/WScontext';

const useAuth = () => useContext(AuthContext);
const useWSocket = () => useContext(WSocketContext);

export { useAuth, useWSocket };
