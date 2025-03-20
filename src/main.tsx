import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react";
import { store } from './redux/store';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);

