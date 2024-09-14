import React from "react";
import Button from "./Button";

function Navbar() {
  return (
    <div className="max-w-screen-xl mx-auto py-6 flex items-center justify-between border-b-[1px] border-zinc-700">
      <div className="nleft w-full flex items-center">
        <div className="links flex gap-14 ml-2">
          <img
            className="mr-12 h-5"
            src=""
            alt="logo"
          />
          {["Home", "Work", "Careers", "", "Details"].map((elem, index) =>
            elem.length === 0 ? (
              <span key={index} className="w-[2px] h-6 bg-zinc-700"></span>
            ) : (
              <a key={index}
                className="font-regular text-sm flex items-center gap-2"
                href="#"
              >
                {index === 1 && (
                  <span
                    style={{ boxShadow: "0 0 0.55em #00FF19" }}
                    className="inline-block w-[5px] h-[5px] rounded-full bg-green-600"
                  ></span>
                )}
                {elem}
              </a>
            )
          )}
        </div>
        
        
      </div>
      <div>
        <Button />
        </div>
      
    </div>
  );
}

export default Navbar;
