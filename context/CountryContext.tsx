import React, { createContext, useContext, useState, ReactNode } from 'react';

type Country = {
  name: string;
  flag: string;
};

type CountryContextType = {
  selectedCountry: Country;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Country>>;
  countries: Country[];
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

type CountryProviderProps = {
  children: ReactNode;
};

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const countries = [
    { name: "English", flag: "/images/flags/uk.svg" },
    { name: "French", flag: "/images/flags/france.svg" },
    { name: "German", flag: "/images/flags/germany.svg" },
    { name: "Italian", flag: "/images/flags/italy.svg" },
    { name: "Portuguese", flag: "" },
    { name: "Polish", flag: "" },
    { name: "Turkish", flag: "" },
    { name: "Russian", flag: "" },
    { name: "Dutch", flag: "" },
    { name: "Czech", flag: "" },
    { name: "Arabic", flag: "" },
    { name: "Chinese (Simplified)", flag: "" },
    { name: "Vietnamese", flag: "" },
  ];
  

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry, countries }}>
      {children}
    </CountryContext.Provider>
  );
};
