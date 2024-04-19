// Define the fetchAudio function with async/await syntax
export const fetchAudio = async (text: string, language: string): Promise<void> => {
    // Encode the text to be URL friendly
    const encodedText = encodeURIComponent(text);
    // Retrieve the base URL from environment variables
    const baseUrl = "https://physician-ai-physicianai-tts-api.hf.space/"
    
    // Check if baseUrl is defined; otherwise log an error
    if (!baseUrl) {
        console.error("Backend URL is not defined");
        return;
    }

    // Construct the URL with query parameters for text, language, and mode
    const url = `${baseUrl}text-to-speech/?text=${encodedText}&language=${language}&mode=single`;

    try {
        // Fetch the audio from the server
        const response = await fetch(url);
        if (!response.ok) {
            // If the response is not OK, throw an error with the status
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Convert the response to a blob
        const blob = await response.blob();
        // Create a URL for the blob
        const audioUrl = URL.createObjectURL(blob);
        // Create a new Audio object and set the source to the blob URL
        const audio = new Audio(audioUrl);
        // Attempt to play the audio
        audio.play().catch(error => console.error("Auto-play failed", error));
    } catch (error) {
        // Log any errors that occur during the fetch or audio play process
        console.error("Fetching audio failed: ", error);
    }
};
