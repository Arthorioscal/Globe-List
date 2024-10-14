import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const COUNTRIES = gql`
  query {
    countries {
      emoji
      name
      capital
      languages {
        name
      }
    }
  }
`;

const CountryList: React.FC = () => {
  const { loading, error, data } = useQuery(COUNTRIES);

  const [nameFilter, setNameFilter] = useState('');
  const [capitalFilter, setCapitalFilter] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const filteredCountries = data.countries.filter((country: any) => {
    const countryName = country.name || '';
    const countryCapital = country.capital || '';
    return (
      countryName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      countryCapital.toLowerCase().includes(capitalFilter.toLowerCase())
    );
  });

  return (
    <div className='m-4 p-4 rounded shadow-lg'>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Search by capital"
          value={capitalFilter}
          onChange={(e) => setCapitalFilter(e.target.value)}
          className="p-2 rounded"
        />
      </div>

      <ul className='list-inside'>
        {filteredCountries.map((country: any) => (
          <li key={country.name} className='mb-2 p-2 border-b-0'>
            <span className="font-bold">{country.emoji} {country.name}</span> - {country.capital} 
            <span className="text-sm text-gray-600"> ({country.languages.map((lang: any) => lang.name).join(', ')})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
