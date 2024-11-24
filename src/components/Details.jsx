import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Details() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("https://restcountries.com/v3.1/name/kingdom");
      const data = await response.json();
      setCountries(data);
    }
    fetchCountries();
  }, []);

  if (!state || !state.data) {
    return <p>No country data available.</p>;
  }

  const handleSelect = (event) => {
    const selectedCountryCode = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.cca2 === selectedCountryCode
    );
    if (selectedCountry) {
      navigate(`/countries/${selectedCountryCode}`, {
        state: { data: selectedCountry },
      });
    }
  };

  const { data } = state;

  return (
    <div>
      <label htmlFor="country-select"></label>
      <select
        id="country-select"
        onChange={handleSelect}
        defaultValue={data.cca2} 
      >
        <option value="" disabled>
          Choose a country
        </option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>

      <h2>{data.name.common}</h2>
      <img src={data.flags?.png} alt={`${data.name.common} flag`} width={200} />
      <p>Capital: {data.capital?.[0] || "N/A"}</p>
      <p>Located in: {data.region}</p>
    </div>
  );
}
