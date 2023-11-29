import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Profil, { userInfosLoader } from '../Pages/Profil';
import Acceuil from '../Pages/Acceuil';
import Reglage from '../Pages/Reglage';
import Communaute from '../Pages/Communaute';
import Error from '../Pages/Error';
import Layout from '../Components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route
        path= '/'
        element={<Acceuil />}
      />
      <Route
        path= '/user/:id'
        loader={userInfosLoader}
        element={<Profil />}
        errorElement = {<Error />}
      />
      <Route
        path= 'reglage'
        element={<Reglage />}
      />
      <Route
        path= 'communaute'
        element={<Communaute />}
      />

    </Route>
  )
);

export default router;