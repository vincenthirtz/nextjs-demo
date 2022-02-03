import React from "react";
import Footer from "./Footer";

export default function Layout({ preview, children }) {
  return (
    <>
      <div className="min-h-screen mb-[200px]">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
