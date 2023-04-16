import React, { createContext, useReducer } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import Logout from "./components/Logout";
// eslint-disable-line no-unused-vars
import EditAbout from "./components/EditAbout";
import { initialState, reducer } from './components/Reducer/useReducer';

export const userContext = createContext();

const Routing = () => {
  return (
    <div>

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/editAbout" element={<EditAbout />} />

        <Route path="*" element={<Error />} />
      </Routes>

    </div>
  );
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <userContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
      </userContext.Provider>
    </>
  );
}

export default App;
