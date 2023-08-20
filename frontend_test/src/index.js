import './styles.scss';
import 'bootstrap';

import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import reportWebVitals from './reportWebVitals';
import init from './init';

const socket = io();
// const socket = io().connect("http://localhost:3000");

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socket));
};

app();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
