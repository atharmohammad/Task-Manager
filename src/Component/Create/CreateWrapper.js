import Create from "./Create";

const Wrapper = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "500",
        height: "40vh",
        width: "60%",
        left:'17%',
        top:"10%",
        padding: "15vh",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        transition: "all 0.3s ease-out",
      }}
    >
      <Create/>
    </div>
  );
};

export default Wrapper;
