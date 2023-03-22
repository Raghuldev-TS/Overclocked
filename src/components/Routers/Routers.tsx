import { Routes, Route, Link } from "react-router-dom";
import Boilerplate from "../Boilerplate/Boilerplate";
import Users from "../Users/Users";
import Applications from "../Applications/Applications";

const Routers = () => (
  <Routes>
    <Route path="/" element={<Boilerplate />}>
      <Route
        path=""
        element={
          <>
            <h2>Welcome to Dashboard</h2>
            <Link to="/user">Click here navigate to user section</Link>
          </>
        }
      />
      <Route path="user" element={<Users />} />
      <Route path="applications" element={<Applications />} />
    </Route>
  </Routes>
);

export default Routers;
