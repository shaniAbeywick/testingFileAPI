import React, { useState, useEffect } from 'react';
import { initializeRecognition, startListening, stopListening } from '@/lib/SpeechRecognition';

const VoiceInput = () => {
  const [transcript, setTranscript] = useState('Say something...');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const recog = initializeRecognition(setTranscript, setRecognition);

    return () => {
      if (recog) {
        recog.abort();
      }
    };
  }, []);

  const handleStart = () => startListening(recognition);
  const handleStop = () => stopListening(recognition);

  return (
    <div>
      <button onMouseDown={handleStart} onMouseUp={handleStop} onTouchStart={startListening} onTouchEnd={handleStart}>
        Hold to Speak
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceInput;