import React, { Component } from "react";
import AddTask from "./Components/AddTask";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ViewTask from "./Components/ViewTask";

class App extends Component {
  render() {
    return(
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<AddTask />}> </Route>
              <Route path="/view" element={<ViewTask />}></Route>
          </Routes>
        </BrowserRouter>
    )
  }
}

export default App;
