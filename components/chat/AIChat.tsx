import { useCountry } from '@/context/CountryContext';
import Image from 'next/image'
import React from 'react'

interface AIChatProps {
    message: string;
    english: string;
}


const AIChat: React.FC<AIChatProps> = ({ message, english }) => {

    const { selectedCountry } = useCountry();

    return (
        <div className='mt-7'>
            <span className='flex font-semibold'>
                <Image src="/images/doctoricon.png" alt="Description" width={25} height={25}
                    className="h-6 w-6 rounded-full mr-2" />
                Doctor AI
            </span>
            <span dangerouslySetInnerHTML={{ __html: selectedCountry.name !== 'English' ? message + '<br/> ('+ english + ')' : message }} className='mt-4 w-full block p-4 rounded-md' style={{ background: '#ECF6FE' }}>
                
            </span>
        </div>
    )
}

export default AIChat