import React, { useState } from 'react'
import { Dropdown } from "flowbite-react";
import Image from 'next/image';


const CountryDropdown = () => {

    const countries = [
        { name: "English", flag: "/images/flags/uk.svg" },
        { name: "French", flag: "/images/flags/france.svg" },
        { name: "German", flag: "/images/flags/germany.svg" },
        { name: "Italian", flag: "/images/flags/italy.svg" },
    ];

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    return (
        <div className=''>
            <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
                <span className='cursor-pointer font-semibold'>
                    <Image src={selectedCountry.flag} alt="Description" width={15} height={15}
                        className='inline mr-2 h-5 w-5' />
                    {selectedCountry.name}
                    <Image src="/images/CaretDown.svg" alt="Description" width={15} height={15}
                        className='inline ml-2 h-4 w-4' />
                </span>}>
                <Dropdown.Item className="">
                    <div className='font-semibold'>Language</div>
                </Dropdown.Item>
                {countries.map((country, index) => (
                    <div key={country.name} >
                        <Dropdown.Item className="" onClick={() => setSelectedCountry(country)}>
                            <div className='flex'>
                                <Image src={country.flag} alt={country.name} width={15} height={15} className='inline mr-2 h-5 w-5' />
                                <span className='mr-2'>{country.name}</span>
                                {selectedCountry.name === country.name && (
                                    <Image src="/images/countryCheck.svg" alt="Selected" width={15} height={15} className='inline mr-2 h-4 w-4' />
                                )}
                            </div>
                        </Dropdown.Item>
                        {index !== countries.length - 1 && (
                            <hr style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }} />
                        )}
                    </div>
                ))}
            </Dropdown>
        </div>
    )
}

export default CountryDropdown