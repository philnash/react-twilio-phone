import React, { useState, useEffect, useRef } from "react";
import { Device } from "twilio-client";
import Dialler from "./Dialler";

const Phone = ({ token }) => {
  const [status, setStatus] = useState("Connecting");
  const [number, setNumber] = useState("");
  const deviceRef = useRef(null);

  useEffect(() => {
    const device = new Device();
    deviceRef.current = device;

    device.setup(token, { debug: true });

    device.on("ready", () => {
      setStatus("Ready");
    });

    return () => {
      device.destroy();
      deviceRef.current = null;
      setStatus("Offline");
    };
  }, [token]);

  const handleCall = () => {
    deviceRef.current.connect({ To: number });
  };

  return (
    <div>
      <Dialler number={number} setNumber={setNumber}></Dialler>
      <button onClick={handleCall}>Call</button>
      <p className="status">{status}</p>
    </div>
  );
};

export default Phone;
