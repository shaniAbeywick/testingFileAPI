import React from 'react'
import Image from 'next/image'
import { Dropdown } from "flowbite-react";

const ShareDropdown = () => {
    return (
        <div className="flex text-black items-center mr-6">
            <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
                <span className='cursor-pointer flex'>
                    <Image
                        src="/images/ShareFat.png"
                        alt="Description"
                        width={25}
                        height={25}
                        className="w-5 h-5 rounded-full mr-2 mt-1"
                    />
                    <span className='font-semibold'>Share</span>
                </span>}>
                <Dropdown.Item className="">
                    <div className='flex'>
                        <Image src="/images/fileicon.svg" alt="" width={15} height={15} className='inline mr-2 h-5 w-5' />
                        <span className='mr-2'>Export</span>
                    </div>
                </Dropdown.Item>
                <hr style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }} />
                <Dropdown.Item className="">
                    <div className='flex'>
                        <Image src="/images/mailicon.svg" alt="" width={15} height={15} className='inline mr-2 h-5 w-5' />
                        <span className='mr-2'>Share to Email</span>
                    </div>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default ShareDropdown