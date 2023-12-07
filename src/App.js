import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState(0);
  const [namesInSpace, setNamesInSpace] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();

    setPeopleInSpace(data.number);

    const names = data.people.map((person) => person.name);
    setNamesInSpace(names);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> 🚀 People in Space = {peopleInSpace} 🚀 </h1>
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
