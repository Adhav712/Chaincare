import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
// import query from'../../Server/hosp1apollo_server_files/query.js'

function App(){
  
  const [block, setblock] = useState("");

  const renderblock = () => {
    console.log("worked");
    setblock("Vanakada mapla motherboard la irudhu!!!!");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h1> Hey this is Adhav </h1>
          Click here to query the Block
        </p>
        <p

          type = "button"
          className="App-link"
          onClick = {renderblock}
        >
          Query Lasted Block
        </p>
        <p>{block}</p>
      </header>
    </div>
  );
}

export default App;
