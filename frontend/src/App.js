import React, { Component } from "react";
import AddTask from "./Components/AddTask";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ViewTask from "./Components/ViewTask";
import UpdateTask from "./Components/UpdateTask";
import DeleteTask from "./Components/DeleteTask";

class App extends Component {
  render() {
    return(
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<AddTask />}> </Route>
              <Route path="/view" element={<ViewTask />}></Route>
              <Route path="/update" element={<UpdateTask />}></Route>
              <Route path="/delete" element={<DeleteTask />}></Route>
          </Routes>
        </BrowserRouter>
    )
  }
}

export default App;
