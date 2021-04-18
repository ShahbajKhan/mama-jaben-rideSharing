import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddVehicles from "./components/Admin/AddVehicles/AddVehicles";
import MakeAdmin from "./components/Admin/MakeAdmin/MakeAdmin";
import ManageVehicles from "./components/Admin/ManageVehicles/ManageVehicles";
import OrderList from "./components/Admin/OrderList/OrderList";
import Home from "./components/Home/Home/Home";
import Login from "./components/Shared/Login/Login";
import PrivateRoute from "./components/Shared/PrivateRoute/PrivateRoute";
import Book from "./components/User/Book/Book";
import BookingList from "./components/User/BookingList/BookingList";
import Review from "./components/User/Review/Review";
import User from "./components/User/User/User";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute exact path="/admin/addVehicle">
            <AddVehicles></AddVehicles>
          </PrivateRoute>
          <PrivateRoute exact path="/admin/addAdmin">
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>
          <PrivateRoute exact path="/admin/manageVehicles">
            <ManageVehicles></ManageVehicles>
          </PrivateRoute>
          <PrivateRoute path="/admin/orderList">
            <OrderList></OrderList>
          </PrivateRoute>
          <Route exact path="/user">
            <User></User>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/bookVehicle/:id">
            <Book></Book>
          </PrivateRoute>
          <PrivateRoute path="/bookingsList">
            <BookingList></BookingList>
          </PrivateRoute>
          <PrivateRoute path="/addReview">
            <Review></Review>
          </PrivateRoute>
          
          
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
