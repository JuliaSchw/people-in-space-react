import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/button/button.css";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState(0);
  const [namesInSpace, setNamesInSpace] = useState([]);
  const [craftsInSpace, setCraftsInSpace] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("ALL");

  const fetchData = async () => {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();

    setPeopleInSpace(data.number);

    const names = data.people.map((person) => person.name);
    setNamesInSpace(names);

    const crafts = data.people.map((person) => person.craft);
    setCraftsInSpace(crafts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredNames =
    currentFilter === "ALL"
      ? namesInSpace
      : namesInSpace.filter((name, index) => {
          console.log(index); // Log index here
          return craftsInSpace[index] === currentFilter;
        });

  //         Explanation:

  // The code starts with a condition: currentFilter === "ALL". This checks if the current filter is set to "ALL".
  // If the condition is true, it assigns the value of namesInSpace directly to filteredNames. This means if the filter is "ALL," you want to display all names.
  // If the condition is false, it means the filter is not "ALL." In this case, it uses the filter method on the namesInSpace array.
  // The filter method is used to create a new array with all elements that pass the test implemented by the provided function.
  // The callback function (name, index) => {...} is called for each element in namesInSpace. The function receives the name of the person and its index in the array.
  // Inside the callback function, there's a console.log(index); statement logging the index.
  // The return craftsInSpace[index] === currentFilter; line checks if the craft at the current index in craftsInSpace is equal to the current filter value. If it is, the person's name is included in the filtered array.

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
          {filteredNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
