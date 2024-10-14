import React from 'react';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul className='list-inside m-4 p-4 rounded shadow-lg'>
      {data.countries.map((country: any) => (
        <li key={country.name} className='mb-2 p-2 border-b-0'>
          <span className="font-bold">{country.emoji} {country.name}</span> - {country.capital} 
          <span className="text-sm text-gray-600"> ({country.languages.map((lang: any) => lang.name).join(', ')})</span>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;