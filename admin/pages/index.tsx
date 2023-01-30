import React from 'react'


const login = () => {
  return (

    <div className="wrapper "  >
      <div className='col-3' ></div><div className='col'>
    <div className="logo">
      <img
        src="https://res.cloudinary.com/duqxezt6m/image/upload/v1672318843/Minimal_World_Travel_Blog_Suitcase_Logo_yskunz.png"
        alt=""/>
    </div>
    <div className="text-center mt-4 name">Welcome Admin !</div>
    <div className='row'><div className='col-3'></div><div className='col'>
    <form className="p-3 mt-3">
      <div className="form-field d-flex align-items-center">
        <span className="far fa-user" />
        <input  className='border border-dark' type="text" name="userName" id="userName" placeholder="Username" />
      </div>
      <div className="form-field d-flex align-items-center">
        <span className="fas fa-key" />
        <input  className='border border-dark' type="password" name="password" id="pwd" placeholder="Password" />
      </div>
      <div className='row'><div className='col-2'></div><div className='col-10 btn mt-3' onClick={()=>window.location.href='users'}>
      Login
      </div>
      </div>
    </form></div>
    </div>
    <div className="text-center fs-6">
      <a href="#">Forget password?</a> 
    </div></div>
  </div>
  
  )
}
export default login