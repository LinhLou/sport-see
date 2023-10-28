import { RouterProvider } from "react-router-dom";
import router from "./App/routes";
import GlobalStyles from "./Styles/GlobalStyles.styled";
function App() {
  return (
    <> 
    <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
