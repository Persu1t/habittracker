import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import "./tailwind.css"
import Days from './pages/Days';
// importing Provider from react-redux
import { Provider } from 'react-redux';
// importing store in App.jsx
import { store } from './app/store';
// import ToastContainer from react-toastify
import { ToastContainer } from 'react-toastify';
// importing toast css
import 'react-toastify/dist/ReactToastify.css';
function App() {
  // routing using createBroweserRouter
  const router = createBrowserRouter([{
    path: "/",
    children:[
      {index: "true", element: <Home/>},
      {path: "/calander/:id", element:<Days/>}
    ]
  }])
  return (
    <div className="App">
      {/* Providing store to app */}
      <Provider store={store}>
        {/* providing routes */}
        <RouterProvider router={router}/>
        {/* ToastContainer for notification */}
        <ToastContainer/>
      </Provider>
      
    </div>
  );
}

export default App;
