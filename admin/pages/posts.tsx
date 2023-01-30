import React, { useEffect, useState } from "react";
import axios from "axios";
const posts = () => {
  const [post, setPost] = useState([]);
  console.log(post);

  useEffect(() => {
    axios
      .get("http://localhost:5001/posts")
      .then((response) => setPost(response.data))
      .catch((err) => console.log(err));
  }, []);
 
  const deletePost = (post_id) => {
    if (confirm("Are you sure you want to delete this user?")){
    axios.delete(`http://localhost:5001/posts/${post_id}`)
      .then((response) => {
        console.log(response);
      window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }};
 
 
  return (
    <center>
      <div className="col-lg-8 col-md-6 mt-5">
        <div className="card shadow-xs border">
          <div className="card-header border-bottom pb-0">
            <div className="d-sm-flex align-items-center mb-3">
              <div>
                <h6 className="font-weight-semibold text-lg mb-0">Posts</h6>
                <p className="text-sm mb-sm-0 mb-2">
                  These are details about the Posts
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
                   Type
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    DepartCountry
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    DepartTime
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    ArriveCountry
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    ArriveTime
                    </th>
                  
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    Content
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    PaymentWays
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    AcceptedItems
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    Weight
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    PostTime
                    </th>
                    <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                    PosterId
                  </th>
                  <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                  FlightId
                  </th>
                  <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                  Delete
                  </th>
                  </tr>
                </thead>
                <tbody>
                  {post.map((e, i) => (
                    <>
                      <tr>
                        <td>
                          <div className="d-flex px-2">
                           
                            <div className="my-auto">
                              <h6 className="mb-0 text-sm">{e.type}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                        <span className="text-sm font-weight-normal">
                            {e.departCountry }
                          </span>
                        </td>
                        <td className="align-middle">
                          <span className="text-sm font-weight-normal">
                            {e.departTime}
                          </span>
                        </td>
                     
                        <td className="align-middle">
                          <span className="text-sm font-weight-normal">
                            {e.arriveCountry}
                          </span>
                        </td>
                        
                        <td className="align-middle">
                          <div className="d-flex">
                            <div className="ms-2">
                              <p className="text-sm font-weight-normal mb-0">
                                {e.arriveTime}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.content }
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.paymentWays}
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.acceptedItems}
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.weight }
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.postTime }
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.poster_id }
                          </p>
                        </td>
                        <td className="align-middle">
                          <p className="text-sm font-weight-normal mb-0">
                            {e.flight_id }
                          </p>
                        </td>
                       
                        <td className="align-middle ">
  <button className="btn btn-outline-danger btn-sm" onClick={() => deletePost(e.post_id)}>
    DELETE
  </button>
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

export default posts;
