import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCountries() {
      try {
        setStatus("loading");
        const resp = await fetch("https://restcountries.com/v3.1/name/kingdom");
        const data = await resp.json();
        setCountries(data);
        setStatus("idle");
      } catch (e) {
        console.error("Error fetching countries:", e);
        setStatus("error");
      }
    }
    fetchCountries();
  }, []);

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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading countries.</p>;

  return (
    <div>
      <label htmlFor="country-select"></label>
      <select id="country-select" onChange={handleSelect} defaultValue="">
        <option value="" disabled>
         Select a country
        </option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      <Outlet />
    </div>
  );
}


