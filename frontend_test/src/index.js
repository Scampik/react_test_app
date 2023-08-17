import './styles.scss';
import 'bootstrap';

import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';

// const socket = io();
const socket = io().connect('http://localhost:3000');

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socket));
};

app();
