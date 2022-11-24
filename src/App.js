import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
   <>
   <AuthWrapper >

   <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="*" element={<Error/>} />    
      </Routes>
    </BrowserRouter>
   
   </AuthWrapper>
   </>
  );
}

export default App;
