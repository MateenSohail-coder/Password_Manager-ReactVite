import React, { useContext } from "react";
import { DataContext } from "../context/context";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Add from "./Add";
export default function Main() {
  const defaultColor = "primary:#545454,secondary:#848484";
  const goldColor = "primary:gold,secondary:gold";
  const clipboard = useRef();
  const [editingItem, setEditingItem] = useState(null); // the item being edited
  const [editForm, setEditForm] = useState({}); // form data for editing
  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({ ...item }); // pre-fill form
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
const handleEditSubmit = async (e) => {
  e.preventDefault();

  const { _id, ...payload } = editForm; // remove _id

  console.log("PUT request ID:", _id);
  console.log("Data being sent:", payload);

  try {
    const response = await fetch(`http://localhost:3000/passwords/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.success) {
      setFavourites((prev) =>
        prev.map((item) => (item._id === _id ? { ...item, ...payload } : item))
      );
      setEditingItem(null);
    } else {
      console.error("Update failed:", data.message);
    }
  } catch (err) {
    console.error("Error updating item:", err);
  }
};



  const { dataList } = useContext(DataContext);

  const [favourites, setFavourites] = useState([]);
  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let password = await req.json();
    if (password) {
      setFavourites((prev) => [
        ...prev,
        ...(Array.isArray(password) ? password : [password]),
      ]);
      console.log(password);
    } else {
      console.log("error");
    }
  };

  const deletePassword = async (id) => {
    try {
      let res = await fetch(`http://localhost:3000/passwords/${id}`, {
        method: "DELETE",
      });

      let data = await res.json();

      if (data.success) {
        // Remove from local state
        setFavourites((prev) => prev.filter((item) => item._id !== id));
        console.log("Deleted successfully");
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting password:", err);
    }
  };

  useEffect(() => {
    getpasswords();
  }, []);

  useEffect(() => {
    if (dataList.length > 0) {
      const withIds = dataList.map((item) => ({
        ...item,
      }));

      setFavourites((prev) => [...prev, ...withIds]);
    }
  }, [dataList]);

  useEffect(() => {
    console.log("dataList changed:", dataList);
  }, [dataList]);

  useEffect(() => {
    console.log("favourites updated:", favourites);
  }, [favourites]);

  // ✅ Toggle favourite status
  const toggleBookmark = async (id) => {
    setFavourites((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
    try {
      let res = await fetch(`http://localhost:3000/passwords/${id}/favourite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      let data = await res.json();

      if (data.success) {
        setFavourites((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, isFavourite: data.updated.isFavourite }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error toggling favourite:", err);
    }
  };
  const Copytoclipboard = (text) => {
    // ✅ copy text
    navigator.clipboard.writeText(text).then(() => {
      // ✅ show notification (slide down)
      clipboard.current.classList.remove("-translate-y-[200%]");
      clipboard.current.classList.add("translate-y-[0%]");

      // ✅ hide notification after 1.5s
      setTimeout(() => {
        clipboard.current.classList.remove("translate-y-[0%]");
        clipboard.current.classList.add("-translate-y-[200%]");
      }, 1500);
    });
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col md:flex-row">
            <div
              ref={clipboard}
              className="clipboard transition-all duration-500 delay-100 absolute h-10 w-[230px] bg-[#222831] text-white transform -translate-y-[200%] font-bold top-1 left-1 flex items-center justify-center"
            >
              ✔ Copied to Clipboard !
            </div>
            <Sidebar />

            <main className="md:w-[85vw] w-screen h-[80.8vh]  md:h-[89.9vh] overflow-x-hidden">
              <div className="overflow-x-hidden">
                <div className="w-full">
                  {favourites.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-center py-8 font-semibold text-2xl text-gray-300">
                        There are no passwords here{" "}
                      </div>
                      <NavLink to="/Add">
                        <button className="p-3 pl-5 hover:bg-neutral-700 cursor-pointer active:scale-[0.96] transform transition-all pr-5 bg-[#222831] text-white font-bold  rounded-4xl mx-auto">
                          Add +
                        </button>
                      </NavLink>
                    </div>
                  ) : (
                    // Table
                    <table className="hidden md:table w-full border-0 bg-[#6E89B1]/22 rounded-lg shadow-md">
                      <thead className="bg-[#5F6877]">
                        <tr className="text-white">
                          <th className="px-6 py-3 text-left text-sm font-bold">
                            Site
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold">
                            Password
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {favourites.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b text-[#222831] hover:bg-[#6E89B1]/21 border-b-[#000000]/26 font-sans text-[16px] font-medium"
                          >
                            {/* Site */}
                            <td className="px-6 py-4 align-top flex">
                              <a
                                className="block max-w-[200px] break-all hover:underline whitespace-normal text-blue-600"
                                href={item.site}
                              >
                                {item.site}
                              </a>
                              <button
                                className="ml-2 inline-block align-middle"
                                onClick={() => Copytoclipboard(item.site)}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/tsrgicte.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:#545454,secondary:green"
                                  className="w-5 h-5"
                                ></lord-icon>
                              </button>
                            </td>

                            {/* Username */}
                            <td className="px-6 py-4">
                              <span>{item.username}</span>
                              <button
                                className="ml-2"
                                onClick={() => Copytoclipboard(item.username)}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/tsrgicte.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:#545454,secondary:green"
                                  className="w-5 h-5"
                                ></lord-icon>
                              </button>
                            </td>

                            {/* Password */}
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <input
                                  type="password"
                                  value={item.password}
                                  readOnly
                                  className="w-auto max-w-[100px] border-none focus:ring-0 font-mono bg-transparent text-center"
                                />
                                <button
                                  onClick={() => Copytoclipboard(item.password)}
                                  className="ml-1 p-0 flex items-center"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/tsrgicte.json"
                                    trigger="click"
                                    stroke="bold"
                                    colors="primary:#545454,secondary:green"
                                    className="w-5 h-5"
                                  ></lord-icon>
                                </button>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 flex items-center space-x-2">
                              <button onClick={() => handleEditClick(item)}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fikcyfpp.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:blue,secondary:blue"
                                  className="w-7 h-7"
                                ></lord-icon>
                              </button>
                              <button
                                onClick={() => {
                                  deletePassword(item._id);
                                }}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/jzinekkv.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:red,secondary:red"
                                  className="w-7 h-7"
                                ></lord-icon>
                              </button>
                              <button onClick={() => toggleBookmark(item._id)}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/rrbmabsx.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors={
                                    item.isFavourite
                                      ? "primary:gold,secondary:gold"
                                      : "primary:#545454,secondary:#545454"
                                  }
                                  className="w-7 h-7"
                                ></lord-icon>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* ✅ Mobile Cards */}
                  <div className="md:hidden space-y-4 mt-3 mb-3">
                    {favourites.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-lg p-4 bg-[#6E89B1]/10 shadow-md text-[#222831]"
                      >
                        {/* Site */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-[#5F6877]">
                            Site
                          </p>
                          <div className="flex items-center justify-between">
                            <a
                              href={item.site}
                              className="font-medium text-blue-700 hover:underline break-words whitespace-normal break-all"
                            >
                              {item.site}
                            </a>
                            <button
                              onClick={() => Copytoclipboard(item.site)}
                              className="ml-2"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/tsrgicte.json"
                                trigger="click"
                                stroke="bold"
                                colors="primary:#545454,secondary:green"
                                className="w-5 h-5"
                              ></lord-icon>
                            </button>
                          </div>
                        </div>

                        {/* Username */}
                        <p className="text-1xl font-bold text-[#5F6877]">
                          Username
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <p>{item.username}</p>
                          <button
                            onClick={() => Copytoclipboard(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/tsrgicte.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:#545454,secondary:green"
                              className="w-5 h-5"
                            ></lord-icon>
                          </button>
                        </div>

                        {/* Password */}
                        <p className="text-1xl font-bold text-[#5F6877]">
                          Password
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="password"
                            readOnly
                            value={item.password}
                          />
                          <button
                            onClick={() => Copytoclipboard(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/tsrgicte.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:#545454,secondary:green"
                              className="w-5 h-5"
                            ></lord-icon>
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4 mt-4">
                          <button onClick={() => handleEditClick(item)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:blue,secondary:blue"
                              className="w-7 h-7"
                            ></lord-icon>
                          </button>
                          <button onClick={() => deletePassword(item._id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:red,secondary:red"
                              className="w-7 h-7"
                            ></lord-icon>
                          </button>
                          <button onClick={() => toggleBookmark(item._id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/rrbmabsx.json"
                              trigger="click"
                              stroke="bold"
                              colors={
                                item.isFavourite
                                  ? "primary:gold,secondary:gold"
                                  : "primary:#545454,secondary:#545454"
                              }
                              className="w-7 h-7"
                            ></lord-icon>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
            {editingItem && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <form
                  onSubmit={handleEditSubmit}
                  className="bg-white p-6 rounded-lg w-96 space-y-4"
                >
                  <h2 className="text-lg font-bold">Edit Password</h2>
                  <input
                    type="text"
                    name="site"
                    value={editForm.site}
                    onChange={handleEditChange}
                    placeholder="Site"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        }
      />
      <Route
        path="/Favourite"
        element={
          <div className="flex flex-col md:flex-row">
            <div
              ref={clipboard}
              className="clipboard transition-all duration-500 delay-100 absolute h-10 w-[230px] bg-[#222831] text-white transform -translate-y-[200%] font-bold top-1 left-1 flex items-center justify-center"
            >
              ✔ Copied to Clipboard !
            </div>
            <Sidebar />
            <main className="md:w-[85vw] w-screen h-[80.8vh]  md:h-[89.9vh] overflow-x-hidden">
              <div className="overflow-x-hidden">
                {favourites.filter((item) => item.isFavourite).length === 0 ? (
                  // Show this when there are no favourites
                  <div className="text-center py-8 font-semibold text-2xl text-gray-300">
                    No favourites found
                  </div>
                ) : (
                  <table className="hidden md:table w-full border-0 bg-[#fad5063d] rounded-lg shadow-md">
                    <thead className="bg-[#FAD506]">
                      <tr className="text-white">
                        <th className="px-6 py-3 text-left text-sm font-bold">
                          Site
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold">
                          Password
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-bold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {favourites
                        .filter((item) => item.isFavourite)
                        .map((item, i) => (
                          <tr
                            key={i}
                            className={`border-b transition duration-200 ${
                              item.isFavourite
                                ? "bg-yellow-50 hover:bg-yellow-100"
                                : "bg-white hover:bg-gray-50"
                            } text-[#222831] border-b-[#000000]/10 font-sans text-[16px] font-medium`}
                          >
                            {/* Site */}

                            <td className="px-6 py-4 align-top flex gap-1">
                              {item.isFavourite && (
                                <span
                                  className="bg-yellow-400 text-white text-xs font-bold  h-5 pl-2
                                  pr-2 rounded-full"
                                >
                                  ★ Favourite
                                </span>
                              )}
                              <a
                                className="block max-w-[200px] break-all hover:underline whitespace-normal text-blue-600"
                                href={item.site}
                              >
                                {item.site}
                              </a>
                              <button
                                className="ml-2 inline-block align-middle"
                                onClick={() => Copytoclipboard(item.site)}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/tsrgicte.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:#545454,secondary:green"
                                  className="w-5 h-5"
                                ></lord-icon>
                              </button>
                            </td>

                            {/* Username */}
                            <td className="px-6 py-4">
                              <span className="text-gray-700">
                                {item.username}
                              </span>
                              <button
                                className="ml-2"
                                onClick={() => Copytoclipboard(item.username)}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/tsrgicte.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:#545454,secondary:green"
                                  className="w-5 h-5"
                                ></lord-icon>
                              </button>
                            </td>

                            {/* Password */}
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <input
                                  type="password"
                                  value={item.password}
                                  readOnly
                                  className="w-auto max-w-[100px] border-none focus:ring-0 font-mono bg-transparent text-center"
                                />
                                <button
                                  onClick={() => Copytoclipboard(item.password)}
                                  className="ml-1 p-0 flex items-center"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/tsrgicte.json"
                                    trigger="click"
                                    stroke="bold"
                                    colors="primary:#545454,secondary:green"
                                    className="w-5 h-5"
                                  ></lord-icon>
                                </button>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 flex space-x-3">
                              <button onClick={() => handleEditClick(item)}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fikcyfpp.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:blue,secondary:blue"
                                  className="w-7 h-7"
                                ></lord-icon>
                              </button>

                              <button onClick={() => deletePassword(item._id)}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/jzinekkv.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors="primary:red,secondary:red"
                                  className="w-7 h-7"
                                ></lord-icon>
                              </button>

                              <button onClick={() => toggleBookmark(item._id)}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/rrbmabsx.json"
                                  trigger="click"
                                  stroke="bold"
                                  colors={
                                    item.isFavourite
                                      ? "primary:gold,secondary:gold"
                                      : "primary:#545454,secondary:#545454"
                                  }
                                  className="w-7 h-7"
                                ></lord-icon>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}

                {/* Mobile View (Cards) */}
                <div className="md:hidden space-y-4 mt-3 mb-3">
                  {favourites
                    .filter((item) => item.isFavourite)
                    .map((item, i) => (
                      <div
                        key={i}
                        className={`relative border rounded-xl p-5 shadow-lg transition-all duration-300 
    ${
      item.isFavourite
        ? "bg-yellow-50 border-yellow-400"
        : "bg-[#f8f9fa] border-gray-200"
    }`}
                      >
                        {/* Favourite Badge */}
                        {item.isFavourite && (
                          <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            ★ Favourite
                          </span>
                        )}

                        {/* Site */}

                        <div className="mb-4">
                          <p className="text-sm font-semibold text-[#5F6877]">
                            Site
                          </p>
                          <div className="flex items-center justify-between">
                            <a
                              href={item.site}
                              className="font-medium text-blue-700 hover:underline break-words whitespace-normal break-all"
                            >
                              {item.site}
                            </a>
                            <button
                              onClick={() => Copytoclipboard(item.site)}
                              className="ml-2"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/tsrgicte.json"
                                trigger="click"
                                stroke="bold"
                                colors="primary:#545454,secondary:green"
                                className="w-5 h-5"
                              ></lord-icon>
                            </button>
                          </div>
                        </div>

                        {/* Username */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-[#5F6877]">
                            Username
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-[#222831]">
                              {item.username}
                            </p>
                            <button
                              onClick={() => Copytoclipboard(item.username)}
                              className="ml-2"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/tsrgicte.json"
                                trigger="click"
                                stroke="bold"
                                colors="primary:#545454,secondary:green"
                                className="w-5 h-5"
                              ></lord-icon>
                            </button>
                          </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-[#5F6877]">
                            Password
                          </p>
                          <div className="flex items-center justify-between">
                            <input
                              type="password"
                              value={item.password}
                              readOnly
                            />
                            <button
                              onClick={() => Copytoclipboard(item.password)}
                              className="ml-2"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/tsrgicte.json"
                                trigger="click"
                                stroke="bold"
                                colors="primary:#545454,secondary:green"
                                className="w-5 h-5"
                              ></lord-icon>
                            </button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4 mt-4">
                          <button onClick={() => handleEditClick(item)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:blue,secondary:blue"
                              className="w-7 h-7"
                            ></lord-icon>
                          </button>
                          <button onClick={() => deletePassword(item._id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="click"
                              stroke="bold"
                              colors="primary:red,secondary:red"
                              className="w-7 h-7"
                            ></lord-icon>
                          </button>
                          <button onClick={() => toggleBookmark(item._id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/rrbmabsx.json"
                              trigger="click"
                              stroke="bold"
                              colors={
                                item.isFavourite
                                  ? "primary:gold,secondary:gold"
                                  : "primary:#545454,secondary:#545454"
                              }
                              className="w-7 h-7"
                            ></lord-icon>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </main>
          </div>
        }
      />
      <Route
        path="/Add"
        element={
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            <Add />
          </div>
        }
      />
    </Routes>
  );
}
