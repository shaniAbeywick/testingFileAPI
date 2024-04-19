// UserChat.tsx
import React from 'react';
import Image from 'next/image';

interface UserChatProps {
    message: string;
}

const UserChat: React.FC<UserChatProps> = ({ message }) => {
    return (
        <div className='mt-7'>
            <span className='flex font-semibold'>
                <Image src="/images/userchaticon.png" alt="User Icon" width={25} height={25} className="h-6 w-6 rounded-full mr-2" />
                You
            </span>
            <span className='mt-4 w-full block p-4 rounded-md' style={{ background: '#F2F4F6' }}>
                {message}
            </span>
        </div>
    );
};

export default UserChat;
