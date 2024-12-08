const FailModal = ({ setFail }) => {
  return (
    <>
      <div className='dark-bg'>
        <div className='normal-bg'>
          <span>Game Over</span>
          <button onClick={() => setFail(false)}>X</button>
        </div>
      </div>
    </>
  );
};

export default FailModal;
