import { useState, useEffect } from "react";
import Meyda from "meyda";

const useLoudness = () => {
  const [analyser, setAnalyser] = useState(null);
  const [running, setRunning] = useState(false);
  const [loudness, setLoudness] = useState(0);

  const getMedia = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const audioContext = new AudioContext();
    const highPass = audioContext.createBiquadFilter();
    highPass.frequency.setValueAtTime(300, audioContext.currentTime);
    const lowPass = audioContext.createBiquadFilter();
    lowPass.frequency.setValueAtTime(3400, audioContext.currentTime);

    let newAnalyser;
    getMedia().then(stream => {
      if (audioContext.state === "closed") {
        return;
      }
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(highPass);
      highPass.connect(lowPass);

      newAnalyser = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: lowPass,
        bufferSize: 8192,
        featureExtractors: ["loudness"],
        callback: features => {
          console.log(features);
          setLoudness(
            loudness => (loudness + features.loudness.total * 0.2) / 2
          );
        }
      });
      setAnalyser(newAnalyser);
    });
    return () => {
      if (newAnalyser) {
        newAnalyser.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    if (analyser) {
      if (running) {
        analyser.start();
      } else {
        analyser.stop();
      }
    }
  }, [running, analyser]);

  return [running, setRunning, loudness];
};

export default useLoudness;
