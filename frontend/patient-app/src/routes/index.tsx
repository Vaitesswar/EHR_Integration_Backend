import * as React from 'react';
import Homepage from '../components/homepage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import PrivateRoute from '../helpers/privateRoute';
import PrivateRoute2 from '../helpers/privateRoute2';

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/getAppt" element={<PrivateRoute />} />
            <Route path="/createAppt" element={<PrivateRoute2 />} />
        </Routes>
    </BrowserRouter>
  )
}
