import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routers from './routes';
import './App.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Router>
        <Routes>
          {routers.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;

