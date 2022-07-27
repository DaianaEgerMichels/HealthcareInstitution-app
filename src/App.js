
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "toastr/build/toastr.min.js";
import "bootswatch/dist/cerulean/bootstrap.css";
import "./App.css";
import 'toastr/build/toastr.css'

function App() {
  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;
