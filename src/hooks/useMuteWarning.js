import { useEffect, useState } from "react";

const useMuteWarning = (loudness, running) => {
  const [showMuteWarning, setShowMuteWarning] = useState(false);

  useEffect(() => {
    if (loudness > 6 && running) {
      setShowMuteWarning(true);
    }
  }, [loudness, running]);

  useEffect(() => {
    let timeout;
    if (showMuteWarning) {
      timeout = setTimeout(() => {
        setShowMuteWarning(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showMuteWarning]);

  return [showMuteWarning];
};

export default useMuteWarning;
