import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { User, UserApiResponse } from "./types/types";
import { API_ENDPOINTS } from "./utils/constants";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(API_ENDPOINTS.GET_ALL_USERS);
      const data: UserApiResponse[] = await response.json();
      console.log({ data });
      const users: User[] = data.map((user) => ({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        city: user.address.city,
        company: user.company.name,
      }));
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/add-user"
            element={<AddUser users={users} setUsers={setUsers} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
