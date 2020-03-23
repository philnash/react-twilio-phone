import React, { useState, useEffect } from "react";
import { Device } from "twilio-client";
import Dialler from "./Dialler";
import KeypadButton from "./KeypadButton";
import Incoming from "./Incoming";
import OnCall from "./OnCall";
import "./Phone.css";
import states from "./states";
import FakeState from "./FakeState";

const Phone = ({ token }) => {
  const [state, setState] = useState(states.CONNECTING);
  const [number, setNumber] = useState("");
  const [conn, setConn] = useState(null);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const device = new Device();

    device.setup(token, { debug: true });

    device.on("ready", () => {
      setDevice(device);
      setState(states.READY);
    });
    device.on("connect", connection => {
      console.log("Connect event");
      setConn(connection);
      setState(states.ON_CALL);
    });
    device.on("disconnect", () => {
      setState(states.READY);
      setConn(null);
    });
    device.on("incoming", connection => {
      setState(states.INCOMING);
      setConn(connection);
      connection.on("reject", () => {
        setState(states.READY);
        setConn(null);
      });
    });
    device.on("cancel", () => {
      setState(states.READY);
      setConn(null);
    });
    device.on("reject", () => {
      setState(states.READY);
      setConn(null);
    });

    return () => {
      device.destroy();
      setDevice(null);
      setState(states.OFFLINE);
    };
  }, [token]);

  const handleCall = () => {
    device.connect({ To: number });
  };

  const handleHangup = () => {
    device.disconnectAll();
  };

  let render;
  if (conn) {
    if (state === states.INCOMING) {
      render = <Incoming device={device} connection={conn}></Incoming>;
    } else if (state === states.ON_CALL) {
      render = <OnCall handleHangup={handleHangup} connection={conn}></OnCall>;
    }
  } else {
    render = (
      <>
        <Dialler number={number} setNumber={setNumber}></Dialler>
        <div className="call">
          <KeypadButton handleClick={handleCall} color="green">
            Call
          </KeypadButton>
        </div>
      </>
    );
  }
  return (
    <>
      <FakeState
        currentState={state}
        setState={setState}
        setConn={setConn}
      ></FakeState>
      {render}
      <p className="status">{state}</p>
    </>
  );
};

export default Phone;
