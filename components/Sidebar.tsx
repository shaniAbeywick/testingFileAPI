import { useChat } from "@/context/ChatContext";
import { useCountry } from "@/context/CountryContext";
import Image from "next/image";


const Sidebar = () => {

    const { selectedCountry, setSelectedCountry, countries } = useCountry();
    const { setChatEntriesGlobal, setHideFirstInterface, setId, setChain } = useChat();

    const clearChat = () => {
        setSelectedCountry(countries[0]);
        setChatEntriesGlobal([]);
        setHideFirstInterface(false);
        setId(1);
        setChain("");
    }

    return (
        <div className="flex_width h-screen bg-sidebar text-white">
            <h1 className="text-3xl headefont px-4 mt-4">Physician</h1>
            <div className="flex items-center justify-between mt-3 px-4 pb-4 sidebar-border">
                <div className="flex">
                    <Image src="/images/clienticon.png" alt="Description" width={25} height={25}
                        className="h-10 w-10 rounded-full" />
                    <span className="ml-2 mt-2 font-semibold">John Doe</span>
                </div>

                <div className="flex items-center">
                    <Image src="/images/bell.png" alt="Description" width={25} height={25}
                        className="w-4 cursor-pointer" />
                </div>
            </div>
            <div className="overflow-y-scroll h-[calc(100%-11rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="p-4">
                    <button onClick={clearChat} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        New Consultation
                    </button>
                </div>

                <div className="mt-6 px-4">
                    <p className="text-xs">Today</p>

                    <p className="text-sm mt-2">Navigating Health: A Consultation Journey...</p>
                    <p className="text-sm mt-2">Navigating Health: A Consultation Journey...</p>
                </div>

                <div className="mt-6 px-4">
                    <p className="text-xs">Yesterday</p>

                    <p className="text-sm mt-2">Navigating Health: A Consultation Journey...</p>
                    <p className="text-sm mt-2">Navigating Health: A Consultation Journey...</p>
                </div>

                <div className="mt-6 px-4">
                    <p className="text-xs">Previous 30 Days</p>

                    <p className="text-sm mt-2">Navigating Health: A Consultation Journey...</p>
                    <p className="text-sm mt-2">Navigating Health: A Consultation Journey...</p>
                </div>
            </div>
            <div className="p-3 text-center sign-out cursor-pointer">
                <span>Sign out</span> <Image src="/images/signout.svg" alt="Description" width={25} height={25}
                    className="w-5 h-auto inline ml-1" />
            </div>
        </div>
    );
};

export default Sidebar;
