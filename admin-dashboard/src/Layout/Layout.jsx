import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop/BackToTop";

function Layout({ isShowHeader, Page }) {
    return (
        isShowHeader ? (
            <>
              <Header />
              <SideBar />
              <Page />
              <Footer />
              <BackToTop />
            </>
          ) :
           (
            <Page />
          )
    );
}

export default Layout;
