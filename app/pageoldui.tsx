"use client"
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    // console.log("Submitted:", input);

    // Clear the textarea after submitting
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default action of the Enter key
      handleSubmit();
    }
  };

  return (
    <main>
      <div className="grid grid-cols-4 gap-4 px-6 py-2">
        <div className="col-span-1">
          <button className="w-full rounded-md text-white py-4 px-6 btnbg">
            Save and start a new chat
          </button>
          <div className='chatitem w-full rounded-md py-4 px-4 mt-4'>
            <div>
              <span>Select your language</span>
              <select id="countries"
                className="mt-2 select text-gray-900 text-sm rounded-lg block w-full p-2.5"
                defaultValue="Choose a language">
                <option disabled>Choose a language</option>
                <option value="US">English</option>
                <option value="CA">French</option>
                <option value="FR">Spanish</option>
              </select>
            </div>

            <div className='mt-4'>
              <span>Select previous chat to load</span>
              <select id="countries"
                className="mt-2 select text-gray-900 text-sm rounded-lg block w-full p-2.5"
                defaultValue="Choose a language">
                <option disabled>Choose a chat</option>
                <option value="US">Chat 1</option>
              </select>
            </div>

          </div>
        </div>
        <div className="col-span-3">
          <div className='w-full rounded-md py-4 px-4 chat' style={{ minHeight: "300px" }}>
            {/* <div className='chatitem w-full rounded-md py-4 px-4 mt-2'>
              <Image className='roboicon mr-4' src={"/images/d86ceb1ad552398787fb76f343080aa6.gif"} alt="logo" width={35} height={35} />
              <span>Hi there, what brings you here today?</span>
            </div>
            <div className='chatitem w-full rounded-md py-4 px-4 mt-2'>
              <Image className='roboicon mr-4' src={"/images/user-profile-5568736-4644453.gif"} alt="logo" width={35} height={35} />
              <span>Small fever</span>
            </div>
            <div className='chatitem w-full rounded-md py-4 px-4 mt-2'>
              <Image className='roboicon mr-4' src={"/images/d86ceb1ad552398787fb76f343080aa6.gif"} alt="logo" width={35} height={35} />
              <span>What is the current temperature of the fever, and how long have they had it?</span>
            </div> */}
          </div>

          <div className="grid grid-cols-4 gap-4">

            <div className="col-span-4">
              <div className='w-full rounded-md chat mt-4'>
                <div className='headerbg p-2 rounded-tr-md rounded-tl-md'>
                  Type and press enter
                </div>
                <div className='p-4'>
                  <textarea
                    className="input rounded-md p-2 w-full"
                    rows={2}
                    value={input}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  ></textarea>

                </div>
              </div>
            </div>

            <div className="col-span-4">
              <div className='w-full rounded-md chat '>
                <div className='headerbg p-2 rounded-tr-md rounded-tl-md'>
                  Click record and speak after press stop
                </div>
                <div className='p-4 flex justify-between'>
                  <div className='cursor-pointer record chatitem rounded-2xl inline-flex items-center px-4 py-2 text-sm'>
                    <span className='w-2 h-2 bg-orange-400 rounded-full mr-2'></span>
                    Record
                  </div>

                  <div className='cursor-pointer record chatitem rounded-2xl inline-flex items-center px-4 py-2 text-sm'>
                    No microphone found
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  )
}
