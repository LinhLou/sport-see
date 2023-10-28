import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Profil from '../Pages/Profil';
import Layout from '../Components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route
        path= '/'
        element={<Profil />}
      />
    </Route>
  )
);

export default router;