import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light row">
    <a className="navbar-brand col-1" href="home">
     DelivAir
    </a>
    
    <div className="collapse navbar-collapse col-11 row" id="navbarSupportedContent">
      <div className='col-9'>
      <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
          <a className="nav-link" href="users">
            Users
          </a>
        </li>  
        <li className="nav-item active">
          <a className="nav-link" href="posts">
           Posts
          </a>
        </li>
        {/* <li className="nav-item active">
          <a className="nav-link" href="reclamation">
            Reclamation
          </a>
          
        </li> */}
        {/* <li className="nav-item active">
          <a className="nav-link" href="transaction">
            Transactions
          </a>
        </li> */}
     
        
        <li className="nav-item active">
          <a className="nav-link" href="#">
          Logout
          </a>
        </li>
  
{/*         
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </li>
         */}
      </ul>
      </div>
     <div className='col-3 row'>
        <input 
          className="form-control col me-2 rounded border border-dark "
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn col-3 p-1 btn-outline-dark " style={{"borderRadius":"28px","border":"1px solid #000000"}} >
          Search
        </button>
      </div>
    </div>
  </nav>
  
  
  )
}

export default Navbar