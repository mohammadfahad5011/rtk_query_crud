import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
} from "../App/Api/ApiSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [input, setInput] = useState({
    name: " ",
    email: " ",
    password: "",
  });
  const navigate = useNavigate();
  //get All user
  // const { data, isLoading, isError, isSuccess, error } = useGetAllUserQuery();

  //Get single User
  // const { data, isLoading, isError, isSuccess } = useGetSingleUserQuery(1);

  //Create a User

  const [createUser, { isLoading, isError, isSuccess, error }] =
    useCreateUserMutation();

  //handel form Submit

  const handelSubmit = (e) => {
    e.preventDefault();
    createUser(input);
    navigate("/");
  };

  //handelInput

  const handelInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Create User</h1>
      <form action="#" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handelInput}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={input.email}
          onChange={handelInput}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={handelInput}
        />
        <br />
        <br />

        <button type="submit">Create User</button>
      </form>
    </>
  );
};

export default CreateUser;
