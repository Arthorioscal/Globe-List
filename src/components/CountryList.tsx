import React, { useState, useEffect } from 'react';
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
  const [nameFilter, setNameFilter] = useState('');
  const [capitalFilter, setCapitalFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const { loading, error, data } = useQuery(COUNTRIES);

  useEffect(() => {
    if (data) {
      const languages = new Set();
      data.countries.forEach((country: any) => {
        country.languages.forEach((lang: any) => {
          languages.add(lang.name);
        });
      });
      setLanguages(Array.from(languages));
    }
  }, [data]);

  const [languages, setLanguages] = useState<string[]>([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredCountries = data.countries.filter((country: any) => {
    const countryName = country.name || '';
    const countryCapital = country.capital || '';
    const countryLanguages = country.languages.map((lang: any) => lang.name);
    return (
      countryName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      countryCapital.toLowerCase().includes(capitalFilter.toLowerCase()) &&
      (languageFilter === '' || countryLanguages.includes(languageFilter))
    );
  });

  return (
    <div className='m-4 p-4 rounded shadow-lg'>
      <div className="mb-4">
        <input
          type="text"
          id="nameFilter"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 rounded mr-2"
        />
        <input
          type="text"
          id="capitalFilter"
          placeholder="Search by capital"
          value={capitalFilter}
          onChange={(e) => setCapitalFilter(e.target.value)}
          className="p-2 rounded mr-2"
        />
        <select
          id="languageFilter"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="p-2 rounded"
        >
          <option value="">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <ul className='list-inside'>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country: any) => (
            <li key={country.name} className='mb-2 p-2 border-b-0'>
              <span className="font-bold">{country.emoji} {country.name}</span> - {country.capital} 
              <span className="text-sm text-gray-600"> ({country.languages.map((lang: any) => lang.name).join(', ')})</span>
            </li>
          ))
        ) : (
          <li>No countries found</li>
        )}
      </ul>
    </div>
  );
};

export default CountryList;