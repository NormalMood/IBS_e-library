import ReactDOM from 'react-dom/client';
import App from './App';

const main = ReactDOM.createRoot(
  document.getElementById('wrapper') as HTMLElement
);
main.render(
  <App />
);
