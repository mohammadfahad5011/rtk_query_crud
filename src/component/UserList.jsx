import React from "react";
import { useDeleteUserMutation, useGetAllUserQuery } from "../App/Api/ApiSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const {
    data: Users,
    isError: UsersError,
    isLoading: UsersLoading,
    isSuccess: UsersSuccess,
  } = useGetAllUserQuery();

  const [deleteUser] = useDeleteUserMutation();

  // handleDelete
  const handleDelete = (id) => {
    deleteUser(id);
  };

  let content = "";

  if (UsersLoading) {
    content = <h1>Loading...</h1>;
  }
  if (UsersError) {
    content = <h1>{UsersError}</h1>;
  }
  if (UsersSuccess) {
    content = Users.map((user) => {
      return (
        <React.Fragment key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
          <Link to={`/update/${user.id}`}>
            <button>Update</button>
          </Link>
        </React.Fragment>
      );
    });
  }
  return (
    <>
      {content}
      <br />
      <br />
      <br />
      <Link to="/create">
        <button>Add User</button>
      </Link>
    </>
  );
};

export default UserList;
