import Navbar from "./Navbar";
import Footer from "./Footer";
import React from 'react'

const Layout = ({children}:any) => {
    return (
        <div className="content">
          <Navbar />
          {children}
          <Footer />
        </div>
      );
}

export default Layout