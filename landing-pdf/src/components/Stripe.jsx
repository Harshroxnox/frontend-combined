
import React from "react";


function Stripe({ val }) {
  const textStyle = {
    fontFamily: 'Satoshi, sans-serif',
    fontSize: val.largeFontSize ? '25px' : '20px',
    color: 'White',
    textAlign: 'center', 
    fontWeight: 'bold', 
  };

  return (
      <div className="min-w-[20em] px-8 py-6 border-t-[1px] border-b-[1px] border-r-[1px] border-zinc-600 flex items-center justify-center ">
        {val.text ? (
        <span style={textStyle}>{val.text}</span>
      ) : (
        <img className="h-6" src={val.url} alt="" />
      )}
        
      </div>
  );
}

export default Stripe;
