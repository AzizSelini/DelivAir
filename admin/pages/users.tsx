import React, { useEffect, useState } from "react";
import axios from "axios";
const users = () => {
  const [user, setUser] = useState([]);
  console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:5001/users")
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);
  const ban = (user_id:Number,para:boolean) => {
    if (confirm("Are you sure you want to ban this user?")){
    axios
      .put(`http://localhost:5001/users/ban/${user_id}`,{ban:para})
      .then((res) =>{
console.log(res);
window.location.reload();

      })
      .catch((err) => console.log(err));
  }};
  const Verify = (id:any) => {
    axios
      .put(`http://localhost:5001/users/verify/${id}`, { verified: true })
      .then((res) => console.log("succ"))
      
      .catch((err) => console.log(err));
  };
  const Search = () => {
    //search function
  };
  
  return (
    <center>
      <div className="col-lg-8 col-md-6 mt-5">
        <div className="card shadow-xs border">
          <div className="card-header border-bottom pb-0">
            <div className="d-sm-flex align-items-center mb-3">
              <div>
                <h6 className="font-weight-semibold text-lg mb-0">Users</h6>
                <p className="text-sm mb-sm-0 mb-2">
                  These are details about the users
                </p>
              </div>
              <div className="ms-auto d-flex"></div>
            </div>
            <div className="pb-3 d-sm-flex align-items-center">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradiotable"
                  id="btnradiotable1"
                  autoComplete="off"
                  defaultChecked=""
                />
                <label
                  className="btn btn-white px-3 mb-0"
                  htmlFor="btnradiotable1"
                >
                  All
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradiotable"
                  id="btnradiotable2"
                  autoComplete="off"
                />
                <label
                  className="btn btn-white px-3 mb-0"
                  htmlFor="btnradiotable2"
                >
                  Verified
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradiotable"
                  id="btnradiotable3"
                  autoComplete="off"
                />
                <label
                  className="btn btn-white px-3 mb-0"
                  htmlFor="btnradiotable3"
                >
                  Not Verified
                </label>
              </div>
              <div className="input-group w-sm-25 ms-auto">
                <span className="input-group-text text-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="card-body px-0 py-0">
            <div className="table-responsive p-0">
              <table className="table align-items-center justify-content-center mb-0">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7">
                      User
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                      Verified
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                      Location
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                      Phone Number
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                      Email
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                      Rating
                    </th>{" "}
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((e: object, i) => (
                    <>
                      <tr>
                        <td>
                          <div className="d-flex px-2">
                            <div>
                              <img
                                className="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2"
                                src={e.image}
                                alt="spotify"
                                style={{ width: "60px", height: "60px" }}
                              />
                            </div>
                            <div className="my-auto">
                              <h6 className="mb-0 text-sm">{e.userName}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.verified ? "yes" : "no"}
                          </p>
                        </td>
                        <td className="align-middle">
                          <span className="text-sm font-weight-normal">
                            {e.location}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex">
                            <div className="ms-2">
                              <p className="text-dark text-sm mb-0">
                                {e.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex">
                            <div className="ms-2">
                              <p className="text-sm font-weight-normal mb-0">
                                {e.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.ratings}
                          </p>
                        </td>
                        <td className="align-middle ">
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => Verify(e.user_id)}
                          >
                            verify
                          </button>
                          {!e.banned && (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => ban(e.user_id, true)}
                            >
                              ban
                            </button>
                          )}
                          {e.banned && (
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => ban(e.user_id, false)}
                            >
                              rmve ban
                            </button>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default users;
