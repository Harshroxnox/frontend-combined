import "./basiclayout.css";

function BasicLayout() {
  
  return (
    <div className="container">
      <div className="leftsection">
      <div className="left">Left Section</div>
      <div className="left2">Left Section 2</div>
      </div>
      <div className="rightsection">
      <div className="right2">Right Section 2</div>
      <div className="right">Right Section </div>
      </div>
    </div>
  );
}
export default BasicLayout;