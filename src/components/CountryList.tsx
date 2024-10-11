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
    <ul>
      {data.countries.map((country: any) => (
        <li key={country.name}>
          {country.emoji} {country.name} - {country.capital} ({country.languages.map((lang: any) => lang.name).join(', ')})
        </li>
      ))}
    </ul>
  );
};

export default CountryList;