import React, { useState, useEffect } from "react";
import { Device } from "twilio-client";
import Dialler from "./Dialler";
import KeypadButton from "./KeypadButton";
import Incoming from "./Incoming";
import "./Phone.css";

const states = {
  CONNECTING: "Connecting",
  READY: "Ready",
  INCOMING: "Incoming",
  ON_CALL: "On call",
  OFFLINE: "Offline"
};

const Phone = ({ token }) => {
  const [status, setStatus] = useState(states.CONNECTING);
  const [number, setNumber] = useState("");
  const [conn, setConn] = useState(null);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const device = new Device();

    device.setup(token, { debug: true });

    device.on("ready", () => {
      setDevice(device);
      setStatus(states.READY);
    });
    device.on("connect", () => {
      setStatus(states.ON_CALL);
    });
    device.on("disconnect", () => {
      setStatus(states.READY);
      setConn(null);
    });
    device.on("incoming", connection => {
      setStatus(states.INCOMING);
      setConn(connection);
      connection.on("reject", () => {
        setStatus(states.READY);
        setConn(null);
      });
    });
    device.on("cancel", () => {
      setStatus(states.READY);
      setConn(null);
    });
    device.on("reject", () => {
      setStatus(states.READY);
      setConn(null);
    });

    return () => {
      device.destroy();
      setDevice(null);
      setStatus(states.OFFLINE);
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
  if (conn && status === states.INCOMING) {
    render = <Incoming device={device} connection={conn}></Incoming>;
  } else {
    render = (
      <>
        <Dialler number={number} setNumber={setNumber}></Dialler>
        <div className="call">
          <KeypadButton handleClick={handleMainButtonClick} color="green">
            {status === states.ON_CALL ? "Hang up" : "Call"}
          </KeypadButton>
        </div>
        <p className="status">{status}</p>
      </>
    );
  }
  return render;
};

export default Phone;
