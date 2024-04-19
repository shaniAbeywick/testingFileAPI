"use client"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Chat from '@/components/chat/Chat';
import FirstInterface from '@/components/chat/FirstInterface';
import { Dropdown } from "flowbite-react";
import Image from 'next/image';
import { useState } from 'react';

import { CountryProvider } from '../context/CountryContext';
import { ChatProvider, useChat } from '../context/ChatContext';

import VoiceInput from '@/components/VoiceInput';


const Home: React.FC = () => {

  type OptionKeys = "dirrect_QA" | "h&p";
  const options: Record<OptionKeys, string> = {
    "dirrect_QA": "Simple Diagnosis",
    "h&p": "History and Physical Examination"
  };


  return (
    <CountryProvider>
      <ChatProvider>
        <main>
          <div className="flex">
            <Sidebar />
            <main className="flex-grow text-black relative text-black">
              <Header />
              <FirstInterface />
              <Chat />
            </main>
          </div>
        </main>
      </ChatProvider>

    </CountryProvider>

  )
}

export default Home;
