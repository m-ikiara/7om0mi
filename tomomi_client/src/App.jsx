import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import CreateTaskPage from './pages/CreateTask';
import UpdateTaskPage from './pages/UpdateTask';
import DeleteTaskPage from './pages/DeleteTask';

function App() {
  return (
    <>
      <div className='min-h-full h-screen flex items-center justify-center py-4 px-12 sm:px-6 lg:px-8'>
        <div className='max-w-full w-full space-y-8'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/register' element={<SignupPage />} />
              <Route path='/tasks/create' element={<CreateTaskPage />} />
              <Route path='/tasks/update' element={<UpdateTaskPage />} />
              <Route path='/tasks/delete' element={<DeleteTaskPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
