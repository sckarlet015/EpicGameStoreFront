import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/home/Home.jsx";
import CreateVideogame from "./components/createVideogame/CreateVideogame.jsx";
import Detail from "./components/detail/Detail.jsx";
import About from "./components/about/About.jsx";
import './App.css';
axios.defaults.baseURL = `https://deployvideogames-production-e09f.up.railway.app/`;


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = "/" component = { LandingPage } />
        <Route path = "/home/:id" component = { Detail }/>
        <Route path = "/home" component = { Home }/>
        <Route path = "/videogame" component = { CreateVideogame }/>
        <Route path = "/about" component = { About }/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
