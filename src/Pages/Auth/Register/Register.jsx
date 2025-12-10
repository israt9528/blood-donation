import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        const formData = new FormData();
        formData.append("image", profileImg);
        const image_api_url = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.Vite_image_api
        }`;
        axios.post(image_api_url, formData).then((res) => {
          console.log("image upload", res.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0">
      <div className="mx-5">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="font-medium text-accent">Register with ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-700">Name is a required field</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Your Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700">Email is a required field</p>
          )}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          <label className="label">Blood Group</label>

          <select
            defaultValue="Select Blood Group"
            className="select appearance-none w-full"
          >
            <option disabled={true}>Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700">password is a required field</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700">
              Password must be 6 characters long or larger
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-700">
              Password must have at least one uppercase and lowercase, one
              special character and a number
            </p>
          )}

          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register("confirm-password", {})}
            className="input w-full"
            placeholder="Confirm Your Password"
          />

          <button className="btn btn-primary text-black mt-4">Register</button>
        </fieldset>
        <p className="text-accent">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/auth/login"
            className="text-primary link link-hover"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
