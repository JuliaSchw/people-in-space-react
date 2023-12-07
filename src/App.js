import React, { useState } from "react";
import "./App.css";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState(0);

  const fetchData = async () => {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    setPeopleInSpace(data.number);
  };

  fetchData();

  return (
    <div className="App">
      <header className="App-header">
        <h1> 🚀 People in Space = {peopleInSpace} 🚀 </h1>
      </header>
    </div>
  );
}

export default App;
