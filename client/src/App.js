import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Request from "./components/Request";
import "./App.css";

const App = () => {
  return (
    <div className="main-container">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Request} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
