import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import CountryFilter from './CountryFilter';
import CountryRow from './CountryRow';

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
      <CountryFilter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        capitalFilter={capitalFilter}
        setCapitalFilter={setCapitalFilter}
        languageFilter={languageFilter}
        setLanguageFilter={setLanguageFilter}
        languages={languages}
      />
      <ul className='list-inside'>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country: any) => (
            <CountryRow key={country.name} country={country} />
          ))
        ) : (
          <li>No countries found</li>
        )}
      </ul>
    </div>
  );
};

export default CountryList;