import Countries from "./components/Countries";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SingleCountry } from "./components/SingleCountry";
import React from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function App() {
  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <div className="dark:bg-gray-800 dark:text-white">
        <button className="" onClick={() => darkModeHandler()}>
          {dark && <IoSunny />}
          {!dark && <IoMoon />}
        </button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Countries />}></Route>
          <Route path="/:name" exact element={<SingleCountry />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
