// Chat.tsx
import React, { useEffect, useRef, useState } from 'react';
import UserChat from './UserChat';
import AIChat from './AIChat';
import Image from 'next/image';
import { useCountry } from '@/context/CountryContext';
import { useChat } from '@/context/ChatContext';
import { initializeRecognition, startListening, stopListening } from '@/lib/SpeechRecognition';
import { fetchAudio } from '../../lib/audioUtils';

const Chat: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const { selectedOption } = useChat();
    const mode = selectedOption;
    const { chatEntriesGlobal, addChatEntry, handleHideFirstInterface, id, setId, chain, setChain } = useChat();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const speachButtonRef = useRef<HTMLSpanElement>(null);
    const { selectedCountry } = useCountry();
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // Specify type as MediaRecorder | null
    const [audioURL, setAudioURL] = useState('');
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Added audioBlob state

    const hideAudio = () => {
        if (mode === 'dirrect_QA' && id === -7) {
            return false;
        } else if (mode === 'h&p' && id === -13) {
            return false;
        }
        return true;
    };

    interface ChatEntry {
        type: 'user' | 'AI';
        message: string;
        english?: string;
    }

    useEffect(() => {
        const chatContainerElement = chatContainerRef.current;
        if (chatContainerElement) {
            chatContainerElement.scrollTop = chatContainerElement.scrollHeight;
        }
    }, [chatEntriesGlobal]);

    useEffect(() => {
        // Check if the browser supports the MediaRecorder API
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support audio recording.');
            return;
        }
    
        // Request access to the microphone
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
    
                let chunks: Blob[] = []; // Store the recorded chunks
    
                recorder.ondataavailable = event => {
                    chunks.push(event.data); // Append each chunk of data to the array
                };
    
                recorder.onstop = () => {
                    // Combine all the chunks into a single Blob
                    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                    setAudioBlob(audioBlob);
                    
                    // Create a URL for the Blob
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
    
                    // Automatically download the file when recording is stopped
                    const a = document.createElement('a');
                    a.href = audioUrl;
                    a.download = 'recording.webm'; // Set a default file name for the recording
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
            })
            .catch(error => {
                console.error('Error accessing the microphone: ', error);
            });
    }, []);
    
    const toggleRecording = () => {
        if (mediaRecorder) {
            if (recording) {
                
                mediaRecorder.stop();
                
                setRecording(false);
            } else {
                
               // Request access to the microphone
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                let chunks: Blob[] = []; // Store the recorded chunks

                recorder.ondataavailable = event => {
                    chunks.push(event.data); // Append each chunk of data to the array
                };

                recorder.onstop = () => {
                    // Combine all the chunks into a single Blob
                    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                    setAudioBlob(audioBlob);

                    // Create a URL for the Blob
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
                };

                // Start recording
                recorder.start();
                setRecording(true);
            })
            .catch(error => {
                console.error('Error accessing the microphone: ', error);
            }); 
               
            }
        }
    };
    
    useEffect(() => {
        const sendAudioData = async () => {
            if (!recording && audioBlob) {
                try {
                    const formData = new FormData();
                    formData.append('file', audioBlob, 'recording.webm');

                    const response = await fetch('https://physician-ai-physicianai-tts-api.hf.space/speech_to_text_whispher', {
                        method: 'POST',
                        body: formData
                    });

                    const responseData = await response.json();
                    
                    console.log('API response:', responseData);
                    


                    // Check if the audio response corresponds to the latest recorded audio
                    
                    // Set the input state to the API response
                    setInput(responseData.transcribe
                    ); 
                
                   
                    
                
                } catch (error) {
                    console.error('Error sending audio file to API:', error);
                }
            }else {
                    // Clear the input state when recording is in progress
                    setInput('');
                }
            };
        

        sendAudioData();
    }, [audioBlob, recording]);

    
    
    const handleCht = async () => {
        handleHideFirstInterface();

        const message = input.trim();
        setInput('');
        setAudioBlob(null); // Clear the audioBlob state
    setAudioURL(''); // Clear the audioURL state
        if (message) {
            try {
                const newUserMessage: ChatEntry = { type: 'user', message: message };
                addChatEntry(prevEntries => [...prevEntries, newUserMessage]);

                const translationResponse = await fetch(
                    `https://physician-ai-physicianai-translation-api.hf.space/translate_api/?text=${encodeURIComponent(
                        message
                    )}&language=english`
                );
                const translationData = await translationResponse.json();
                const translatedInput = translationData.translated_text;

                console.log(translatedInput);

                let tempChain = chain + "Patient response :" + translatedInput + "\n";

                const url = "https://physician-ai-llm-api-3.hf.space/llm_response/";
                const params = new URLSearchParams({
                    chain: tempChain,
                    id: id.toString(),
                    mode: mode,
                    language: selectedCountry.name.toLowerCase()
                });

                const response = await fetch(`${url}?${params.toString()}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                });

                const responseData = await response.json();
             

                // play audio
                if (hideAudio()) {
                    await fetchAudio(responseData.translated, selectedCountry.name.toLowerCase());
                }

                const newAIResponse: ChatEntry = { type: 'AI', message: responseData.translated, english: responseData.english };
                addChatEntry(prevEntries => [...prevEntries, newAIResponse]);

                setChain(tempChain + responseData.english + "\n\n");
                setId(prevId => prevId + 1);
            } catch (error) {
                const newAIResponse: ChatEntry = { type: 'AI', message: 'Error happened, please try again' };
                addChatEntry(prevEntries => [...prevEntries, newAIResponse]);
                console.error('Error during fetch:', error);
            }
        }
    };

    // const handleStart = () => {
    //     if (speachButtonRef.current) {
    //         speachButtonRef.current.style.backgroundColor = "#1A56DB";
    //     }
    //     startListening(recognition);
    // };

    // const handleStop = () => {
    //     if (speachButtonRef.current) {
    //         speachButtonRef.current.style.backgroundColor = "";
    //     }
    //     stopListening(recognition);
    // };

    return (
        <div>
            <div
                ref={chatContainerRef}
                style={{ scrollBehavior: 'smooth' }}
                className='px-[100px] overflow-y-auto max-h-[70vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            >
                {chatEntriesGlobal.map((entry, index) => (
                    entry.type === 'user'
                        ? <UserChat key={`user_${index}`} message={entry.message} />
                        : <AIChat key={`ai_${index}`} message={entry.message} english={entry.english || ""} />
                ))}
            </div>
            <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 w-full flex justify-center"
            >
                <div className='w-3/4 flex'>
                    <button className='px-2 rounded-full' onClick={toggleRecording}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256">
                            <path fill={recording ? '#e55b20' : '#9CA3AF'} d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48M96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V240a8 8 0 0 1-16 0v-32.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6" />
                        </svg>
                    </button>
                    {audioURL && <audio src={audioURL} controls style={{ display: 'none' }} />}
                    <textarea
                        className="mx-2 w-full h-12 p-2 bg-white rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Type your message here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <button onClick={handleCht} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 mt-1 px-4 rounded">
                        <Image src="/images/chararrow.png" alt="Description" width={25} height={25}
                            className="h-5 w-5" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Chat;

