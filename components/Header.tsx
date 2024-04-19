import Image from 'next/image'
import React from 'react'
import CountryDropdown from './CountryDropdown'
import { Dropdown } from "flowbite-react";
import ShareDropdown from './ShareDropdown';
import { useCountry } from '@/context/CountryContext';
import { useChat } from '@/context/ChatContext';
import { fetchAudio } from '../lib/audioUtils';

const Header = () => {

    const { selectedCountry } = useCountry();
    const { chatEntriesGlobal } = useChat();

    const handleClick = async () => {
        // console.log(chatEntriesGlobal);
        let lastItemMessage = chatEntriesGlobal[chatEntriesGlobal.length - 1].message + ' ' + ((selectedCountry.name.toLowerCase() == "english") ? "" : chatEntriesGlobal[chatEntriesGlobal.length - 1].english);

        // let lastItemMessage = chatEntriesGlobal[chatEntriesGlobal.length - 1].message + ' ' + (selectedCountry.name.toLowerCase() == "english") ? "" : chatEntriesGlobal[chatEntriesGlobal.length - 1].english;
        // console.log(lastItemMessage);
       
        if(lastItemMessage){
            await fetchAudio(lastItemMessage, selectedCountry.name.toLowerCase());
        }
        
        // fetchAudio('hi how are you doctor', selectedCountry.name.toLowerCase());
        // for (const entry of chatEntriesGlobal) {
        //     await fetchAudio(entry.type + ' ask ' + entry.message, selectedCountry.name.toLowerCase());
    
        //     // Wait for a specific time (e.g., 2 seconds) before continuing to the next iteration
        //     // await new Promise(resolve => setTimeout(resolve, 2000));
        // }
        // await fetchAudio('hi how are you doctor', selectedCountry.name.toLowerCase());
    };

    // const fetchAudio = async (text: string, language: string): Promise<void> => {
    //     const encodedText = encodeURIComponent(text);
    //     const baseUrl = process.env.NEXT_PUBLIC_TRANSLATION_BACKEND;
        
    //     // Check if baseUrl is not undefined; otherwise, provide a fallback or handle the error appropriately.
    //     if (!baseUrl) {
    //         console.error("Backend URL is not defined");
    //         return;
    //     }

    //     const url = `${baseUrl}text-to-speech/?text=${encodedText}&language=${language}&mode=single`;

    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const blob = await response.blob();
    //         const audioUrl = URL.createObjectURL(blob);
    //         const audio = new Audio(audioUrl);
    //         audio.play().catch(error => console.error("Auto-play failed", error));
    //     } catch (error) {
    //         console.error("Fetching audio failed: ", error);
    //     }
    // };

    return (
        <header className='px-6 py-4 flex justify-between border-b border-gray-300 mb-4'>
            <div className="flex">
                <Image
                    src="/images/doctoricon.png"
                    alt="Description"
                    width={25}
                    height={25}
                    className="h-10 w-10 rounded-full"
                />
                <span className="ml-2 mt-2 font-semibold text-black">Doctor AI</span>
            </div>
            <div className="flex text-black items-center">
                <span onClick={handleClick}>
                    <Image
                        src="/images/SpeakerSimpleHigh.svg"
                        alt="Description"
                        width={25}
                        height={25}
                        className="w-5 h-5 rounded-full mr-6 cursor-pointer"
                    />
                </span>
                <ShareDropdown />
                <CountryDropdown />
            </div>
        </header>
    )
}

export default Header