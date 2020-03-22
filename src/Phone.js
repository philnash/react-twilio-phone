import React, { useState, useEffect } from "react";
import { Device } from "twilio-client";
import Dialler from "./Dialler";
import KeypadButton from "./KeypadButton";
import Incoming from "./Incoming";
import "./Phone.css";

const Phone = ({ token }) => {
  const [status, setStatus] = useState("Connecting");
  const [number, setNumber] = useState("");
  const [conn, setConn] = useState(null);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const device = new Device();

    device.setup(token, { debug: true });

    device.on("ready", () => {
      setDevice(device);
      setStatus("Ready");
    });
    device.on("connect", () => {
      setStatus("On call");
    });
    device.on("disconnect", () => {
      setStatus("Ready");
      setConn(null);
    });
    device.on("incoming", connection => {
      setStatus("Incoming");
      setConn(connection);
      connection.on("reject", () => {
        setStatus("Ready");
        setConn(null);
      });
    });
    device.on("cancel", () => {
      setStatus("Ready");
      setConn(null);
    });
    device.on("reject", () => {
      setStatus("Ready");
      setConn(null);
    });

    return () => {
      device.destroy();
      setDevice(null);
      setStatus("Offline");
    };
  }, [token]);

  const handleMainButtonClick = () => {
    if (status === "On call") {
      device.disconnectAll();
    } else {
      device.connect({ To: number });
    }
  };

  let render;
  if (conn && status === "Incoming") {
    render = <Incoming device={device} connection={conn}></Incoming>;
  } else {
    render = (
      <>
        <Dialler number={number} setNumber={setNumber}></Dialler>
        <div className="call">
          <KeypadButton handleClick={handleMainButtonClick} color="green">
            {status === "On call" ? "Hang up" : "Call"}
          </KeypadButton>
        </div>
        <p className="status">{status}</p>
      </>
    );
  }
  return render;
};

export default Phone;
