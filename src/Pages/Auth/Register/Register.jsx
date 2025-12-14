import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const districtsData = useLoaderData();

  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilasInfo.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data);
      });
  }, []);
  // console.log(upazilas);

  const districts = districtsData.map((d) => d.name);
  //   console.log(districts);

  const selectedDistrict = watch("district");

  const getDistrictId = (name) => {
    const found = districtsData.find((d) => d.name === name);
    return found ? found.id : null;
  };

  const upazilasByDistrict = selectedDistrict
    ? upazilas.filter((u) => u.district_id === getDistrictId(selectedDistrict))
    : [];

  const handleRegister = (data) => {
    console.log(data);

    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        // console.log(res.user);

        const formData = new FormData();
        formData.append("image", profileImg);

        const image_api_url = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_image_api
        }`;

        axios.post(image_api_url, formData).then((imgRes) => {
          // console.log("image upload", imgRes.data);
          const imageUrl = imgRes.data.data.url;
          const donorInfo = {
            name: data.name,
            email: data.email,
            image: imageUrl,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,
            role: "donor",
            status: "active",
            createdAt: new Date(),
          };

          axiosSecure.post("/donors", donorInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("donor created");
            }
          });

          const updateProfile = {
            displayName: data.name,
            photoURL: imageUrl,
          };

          updateUser(updateProfile)
            .then(() => {
              console.log("user profile updated");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
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
          {/* name */}
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
          {/* email */}
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
          {/* image */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          {/* blood group */}
          <label className="label">Blood Group</label>
          <select
            defaultValue="Select Blood Group"
            {...register("bloodGroup", { required: true })}
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
          {/* district */}
          <label className="label">District</label>
          <select
            defaultValue="Select Your District"
            {...register("district", { required: true })}
            className="select appearance-none w-full"
          >
            <option disabled={true}>Select Your District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          {/* upazila */}
          <label className="label">Upazila</label>
          <select
            defaultValue="Select Your Upazila"
            {...register("upazila", { required: true })}
            className="select appearance-none w-full"
          >
            <option disabled={true}>Select Your Upazila</option>
            {upazilasByDistrict.map((u, i) => (
              <option key={i} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {/* password */}
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
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="input w-full"
            placeholder="Confirm Your Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-700">{errors.confirmPassword.message}</p>
          )}

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
