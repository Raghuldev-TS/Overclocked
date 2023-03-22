import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./components/Routers/Routers";
import store from "./confiq/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
