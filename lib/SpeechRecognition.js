// speechRecognitionFunctions.js
export function initializeRecognition(setInput, setRecognition) {
    let recognition;
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const transcriptResult = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setInput(transcriptResult);
        };

        recognition.onend = () => {
            // Handle end of recognition
        };

        setRecognition(recognition);
    } catch (e) {
        console.error('Speech Recognition is not supported by your browser.');
        setInput("Speech Recognition is not supported by your browser.");
    }

    return recognition;
}

export function startListening(recognition) {
    if (recognition) {
        recognition.start();
    }
}

export function stopListening(recognition) {
    if (recognition) {
        recognition.stop();
    }
}
