import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { motion } from "framer-motion";
import searchImg from "../../assets/search.jpeg";

const SearchDonors = () => {
  const { register, handleSubmit, watch } = useForm();
  const axiosInstance = useAxios();
  const [search, setSearch] = useState([]);
  const districtsData = useLoaderData();
  const districts = districtsData.map((d) => d.name);

  const [upazilas, setUpazilas] = useState([]);
  const selectedDistrict = watch("district");

  useEffect(() => {
    fetch("/upazilasInfo.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const getDistrictId = (name) => {
    const found = districtsData.find((d) => d.name === name);
    return found ? found.id : null;
  };

  const upazilasByDistrict = selectedDistrict
    ? upazilas.filter((u) => u.district_id === getDistrictId(selectedDistrict))
    : [];

  const handleSearch = (data) => {
    const { bloodGroup, district, upazila } = data;

    axiosInstance
      .get("/donors/search", {
        params: {
          bloodGroup: bloodGroup || "",
          district: district || "",
          upazila: upazila || "",
        },
      })
      .then((res) => setSearch(res.data));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-red-50 p-4 md:p-10 my-26 mx-20 rounded-2xl">
      {/* Page Title */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-red-700">
          Search for Blood Donors
        </h1>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
          Find registered blood donors by blood group, district, or upazila. Use
          the search form below to filter donors.
        </p>
      </header>

      {/* Search Form Section with Image */}
      <section className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Form */}
          <div className="w-full lg:w-1/2 p-6 md:p-10">
            <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">
              <div>
                <label className="label font-semibold text-gray-700">
                  Blood Group
                </label>
                <select
                  defaultValue=""
                  {...register("bloodGroup")}
                  className="select select-bordered w-full border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  District
                </label>
                <select
                  defaultValue=""
                  {...register("district")}
                  className="select select-bordered w-full border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"
                >
                  <option value="">Select Your District</option>
                  {districts.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  Upazila
                </label>
                <select
                  defaultValue=""
                  {...register("upazila")}
                  className="select select-bordered w-full border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"
                >
                  <option value="">Select Your Upazila</option>
                  {upazilasByDistrict.map((u, i) => (
                    <option key={i} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn bg-red-600 hover:bg-red-700 text-white w-full mt-4 transition-all">
                Search
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 p-10">
            <img
              src={searchImg}
              alt="Blood Donation"
              className="w-[90%] h-full mx-auto object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Donor Results Section */}
      {search.length > 0 ? (
        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-700">
            Search Results
          </h2>

          {/* Cards for mobile/tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            {search.map((donor, index) => (
              <motion.div
                key={donor._id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-red-200 transition-all"
              >
                <img
                  src={donor.image}
                  alt={donor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-red-700">
                    {donor.name}
                  </h3>
                  <p className="mt-1">
                    <span className="font-semibold text-gray-700">
                      Blood Group:
                    </span>{" "}
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                      {donor.bloodGroup}
                    </span>
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                    {donor.email}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-gray-700">
                      District:
                    </span>{" "}
                    {donor.district}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-gray-700">
                      Upazila:
                    </span>{" "}
                    {donor.upazila}
                  </p>
                  <p className="mt-2">
                    <span
                      className={`px-2 py-1 rounded font-semibold text-white ${
                        donor.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {donor.status === "active" ? "Active" : "Blocked"}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table view for large screens */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full border border-red-200 rounded-xl overflow-hidden">
              <thead className="bg-red-100">
                <tr className="text-left">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Blood Group</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">District</th>
                  <th className="px-4 py-2">Upazila</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {search.map((donor, index) => (
                  <motion.tr
                    key={donor._id}
                    custom={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.05 },
                    }}
                    className="hover:bg-red-50 border-b border-red-200 transition-all"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={donor.image}
                        alt={donor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-700">
                      {donor.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-4 py-3">{donor.email}</td>
                    <td className="px-4 py-3">{donor.district}</td>
                    <td className="px-4 py-3">{donor.upazila}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded font-semibold text-white ${
                          donor.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {donor.status === "active" ? "Active" : "Blocked"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        // No Results Found
        <div className="max-w-3xl mx-auto mt-6">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg">No donors found!</p>
            <p className="text-sm">
              Try adjusting your search criteria or check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
