import React from 'react';

interface CountryFilterProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  capitalFilter: string;
  setCapitalFilter: (value: string) => void;
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  languages: string[];
}

const CountryFilter: React.FC<CountryFilterProps> = ({
  nameFilter,
  setNameFilter,
  capitalFilter,
  setCapitalFilter,
  languageFilter,
  setLanguageFilter,
  languages,
}) => {
  return (
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
  );
};

export default CountryFilter;