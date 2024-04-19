// Ensure "use client" directive is compatible with your project setup. It's not a standard TypeScript or React directive.
"use client";
import React from 'react';

const AudioPlayer: React.FC = () => {
    // TypeScript can infer most types here automatically. For more complex scenarios, you might need to define explicit types.

    const fetchAudio = async (text: string, language: string): Promise<void> => {
        const encodedText = encodeURIComponent(text);
        const baseUrl = "https://physician-ai-physicianai-tts-api.hf.space/"
        // Check if baseUrl is not undefined; otherwise, provide a fallback or handle the error appropriately.
        if (!baseUrl) {
            console.error("Backend URL is not defined");
            return;
        }

        const url = `${baseUrl}text-to-speech/?text=${encodedText}&language=${language}&mode=single`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play().catch(error => console.error("Auto-play failed", error));
        } catch (error) {
            console.error("Fetching audio failed: ", error);
        }
    };

    const handlePlayAudio = async (): Promise<void> => {
        await fetchAudio('hi how are you doctor', 'italian');
    };

    return (
        <div>
            <button onClick={handlePlayAudio} style={{ color: 'blue', background: 'red' }}>Play Audio</button>
        </div>
    );
};

export default AudioPlayer;
