import logo from './logo.svg';
import './App.css';
import {RouterProvider} from 'react-router-dom';
import Router from './router/AppRouter';

function App() {
  return (
      <RouterProvider router={Router}/>
  );
}

export default App;
