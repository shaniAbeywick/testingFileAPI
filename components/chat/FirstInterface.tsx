import { useChat } from '@/context/ChatContext';
import Image from 'next/image';
import React, { useState } from 'react'
import { Dropdown } from "flowbite-react";

const FirstInterface = () => {

    const { selectedOption, setSelectedOption, hideFirstInterface } = useChat();

    type OptionKeys = "dirrect_QA" | "h&p";
    const options: Record<OptionKeys, string> = {
        "dirrect_QA": "Simple Diagnosis",
        "h&p": "History and Physical Examination"
    };

    return (
        <>
            {!hideFirstInterface && <div className='px-6 pt-4'>
                <div className='dropdown1wrapper'>
                    <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
                        <span className='border border-gray-300 rounded-md py-2 px-4 cursor-pointer'>
                            {options[selectedOption]}
                            <Image src="/images/CaretDown.svg" alt="Description" width={15} height={15}
                                className='inline ml-2 h-4 w-4' />
                        </span>}>
                        <Dropdown.Item className="origin-top-left left-0">
                            <div className='flex'>
                                <input id="default-radio-1" type="radio"
                                    value="dirrect_QA"
                                    onChange={(e) => setSelectedOption(e.target.value as OptionKeys)}
                                    checked={selectedOption === "dirrect_QA"}
                                    name="default-radio" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">
                                    <b>Simple Diagnosis</b><br />
                                    <span>
                                        Process of identifying a <br /> medical condition or determining <br />the nature of a health issue.
                                    </span>
                                </label>
                            </div>
                        </Dropdown.Item>
                        <hr style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }} />
                        <Dropdown.Item >
                            <div className='flex'>
                                <input id="default-radio-1" type="radio"
                                    value={"h&p"}
                                    onChange={(e) => setSelectedOption(e.target.value as OptionKeys)}
                                    checked={selectedOption === "h&p"}
                                    name="default-radio" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">
                                    <b>History and Physical Examination</b><br />
                                    <span>
                                        Identifying common medical conditions, <br /> guiding further diagnostic tests,
                                        <br /> and formulating initial treatment plans.
                                    </span>
                                </label>
                            </div>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className='w-full mt-6'>
    <Image src={"/images/doctorgraphic.svg"} alt="Description" width={250} height={250}
        className='centeritms w-auto'
    />
    <h1 className='centeritms mt-2 text-lg font-semibold'>
        Welcome, please note that you are conversing with an AI and not a real physician.<br></br> This conversation however is monitored live by one or more <br></br> real and board certified physicians.
    </h1><br></br>

    <h3 className='centeritms mt-1' >
        Our goal is to render the most up-to-date and accurate care available with our current state of the art knowledge<br></br> in the medical field while not allowing and preventing substandard care or medical errors <br></br> which are still too prevalent even with the best trained physicians.
    </h3><br></br>
    <h4 className='centeritms mt-1 text-x1 font-semibold'> How can I assist you today?</h4>
</div>
            </div>}
        </>
    )
}

export default FirstInterface