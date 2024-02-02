import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Profil, { userInfosLoader } from '../Pages/Profil';
import Acceuil from '../Pages/Acceuil';
import Reglage from '../Pages/Reglage';
import Communaute from '../Pages/Communaute';
import Error from '../Pages/Error';
import Layout from '../Components/Layout';
import { useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  let error = useRouteError();
  return <Error message={error.message}/>
}

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
        errorElement = {<ErrorBoundary />}
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