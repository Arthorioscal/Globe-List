import React from 'react';

interface CountryRowProps {
  country: {
    emoji: string;
    name: string;
    capital: string;
    languages: { name: string }[];
  };
}

const CountryRow: React.FC<CountryRowProps> = ({ country }) => {
  return (
    <li key={country.name} className='mb-2 p-2 border-b-0'>
      <span className="font-bold">{country.emoji} {country.name}</span> - {country.capital} 
      <span className="text-sm text-gray-600"> ({country.languages.map((lang: any) => lang.name).join(', ')})</span>
    </li>
  );
};

export default CountryRow;