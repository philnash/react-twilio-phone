import React, { useState, useEffect, useRef } from "react";
import { Device } from "twilio-client";

const Phone = ({ token }) => {
  const [ready, setReady] = useState(false);
  const deviceRef = useRef(null);

  useEffect(() => {
    const device = new Device();
    deviceRef.current = device;

    device.setup(token, { debug: true });

    device.on("ready", () => {
      setReady(true);
    });

    return () => {
      device.destroy();
      deviceRef.current = null;
      setReady(false);
    };
  }, [token]);

  return <p>This is the phone! {ready ? "Ready!" : "Connecting"}</p>;
};

export default Phone;
