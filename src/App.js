import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/button/button.css";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState(0);
  const [namesInSpace, setNamesInSpace] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();

    setPeopleInSpace(data.number);

    const names = data.people.map((person) => person.name);
    setNamesInSpace(names);

    const craft = data.people.map((person) => person.craft);
    console.log(craft);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (buttonId) => {
    console.log(` ${buttonId} clicked`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> 🚀 People in Space = {peopleInSpace} 🚀 </h1>
        <div className="button-row">
          <button
            id="1"
            className="button"
            onClick={() => handleButtonClick("ALL")}
          >
            ALL
          </button>
          <button
            id="2"
            className="button"
            onClick={() => handleButtonClick("ISS")}
          >
            ISS
          </button>
          <button
            id="3"
            className="button"
            onClick={() => handleButtonClick("Tiangong")}
          >
            Tiangong
          </button>
        </div>
        <ul>
          {namesInSpace.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
