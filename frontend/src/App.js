import React, { Component } from "react";
import AddTask from "./Components/AddTask";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ViewTask from "./Components/ViewTask";
import UpdateTask from "./Components/UpdateTask";
import DeleteTask from "./Components/DeleteTask";
import SideDrawer from "./Components/SideDrawer";

class App extends Component {
  render() {
    return(
        <BrowserRouter>
            <SideDrawer />
          <Routes>
              <Route path="/" element={<ViewTask />}></Route>
              <Route path="/add" element={<AddTask />}> </Route>
              <Route path="/update" element={<UpdateTask />}></Route>
              <Route path="/delete" element={<DeleteTask />}></Route>
          </Routes>
        </BrowserRouter>
    )
  }
}

export default App;
