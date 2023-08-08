import { Route, Routes } from "react-router-dom";
import UserList from "./component/UserList";
import CreateUser from "./component/CreateUser";
import UpdateUser from "./component/UpdateUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
      </Routes>
    </>
  );
}

export default App;
