import React from "react";

const Incoming = ({ connection, device }) => {
  const acceptConnection = () => {
    connection.accept();
  };
  const rejectConnection = () => {
    connection.reject();
  };
  return (
    <>
      <button onClick={acceptConnection}>Accept</button>
      <button onClick={rejectConnection}>Reject</button>
    </>
  );
};

export default Incoming;
