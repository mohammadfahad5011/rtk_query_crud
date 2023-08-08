import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  useCreateUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../App/Api/ApiSlice";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: allUsers, isSuccess: findSuccess } = useGetAllUserQuery();

  const [userWhichUpdate, setUserWhichUpdate] = useState(null);

  useEffect(() => {
    if (findSuccess && allUsers) {
      const userToUpdate = allUsers.find((user) => user.id == id);
      setUserWhichUpdate(userToUpdate);
    }
  }, [allUsers, findSuccess, id]);

  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();

  // Initialize the input state after data is available
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (findSuccess && userWhichUpdate) {
      setInput({
        name: userWhichUpdate.name,
        email: userWhichUpdate.email,
        password: userWhichUpdate.password,
      });
    }
  }, [userWhichUpdate, findSuccess]);

  // handleInput
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // handle form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // handleUpdate
  const handleUpdate = () => {
    if (userWhichUpdate && userWhichUpdate.id) {
      updateUser({ id: userWhichUpdate.id, Data: input });
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      navigate("/");
    }
  }, [updateSuccess]);

  return (
    <>
      <h1>Update User</h1>

      {findSuccess && (
        <>
          <form action="#" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={handleInput}
            />
            <br />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
            <br />
            <br />

            <button type="submit" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default UpdateUser;
