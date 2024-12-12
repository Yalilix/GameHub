const Modal = ({ setFail, text }) => {
  return (
    <>
      <div className="dark-bg">
        <div className="normal-bg">
          <span>{text}</span>
          <button onClick={() => setFail(false)}>X</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
