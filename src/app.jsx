import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(r => r.json())
      .then(data => setCountries(data.map(countrie => (
        {
          name: countrie.name,
          tld: countrie.tld,
          currencies: countrie.currencies,
          capital: countrie.capital,
          region: countrie.region,
          subRegion: countrie.subregion,
          languages: countrie.languages,
          borders: countrie.borders,
          population: countrie.population,
          continents: countrie.continents,
          flags: countrie.flags
        }
      ))))
      .catch(error => alert(error.message))
  }, [])

  return (
    <>
      <header className="flex justify-between items-center py-[30px] px-4 bg-gray-400 shadow">
        <a href="/" className="text-sm font-extrabold text-white font-sans">Where in the worlds?</a>
        <div><span className="font-semibold text-xs text-white">Dark Mode</span></div>
      </header>
      <div className="app">
        <header className="mt-6 mb-8 flex flex-col gap-10 px-4">
          <label className="relative">
            <MagnifyingGlass size={18} color="#ffffff" weight="bold" className="absolute top-[16px] left-[30px]" />
            <input type="text" placeholder="Search for a country…" className="py-[14px] px-[74px] font-sans bg-gray-400 text-white outline-none rounded-md w-full" />
          </label>
          <div className="relative w-52">
            <CaretDown size={10} color="#ffffff" weight="bold" className="absolute top-[15px] right-[19px]" />
            <select name="region" className="py-3 px-6 font-sans rounded-md  bg-gray-400 text-white text-xs outline-none w-full">
              <option value="" disabled selected hidden>Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </header>
        <div className="countries">
          <ul className="grid justify-items-center gap-10 list-none">
            {Array.from({ length: 10 }).map((country, index) =>
              <li key={index} className="bg-gray-400 w-[264px] rounded-md overflow-hidden z-10">
                <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." className="h-[160px] w-[264px]" />
                <div className="px-6 pt-6 pb-11">
                  <h2 className="font-sans font-extrabold text-white text-lg mb-4">Belgium</h2>
                  <div className="text-white font-sans text-sm">
                    <p>
                      <span className="font-semibold">Population: </span>
                      <span className="font-light">81,770,900</span>
                    </p>
                    <p>
                      <span className="font-semibold">Region: </span>
                      <span className="font-light">Europe</span>
                    </p>
                    <p>
                      <span className="font-semibold">Capital: </span>
                      <span className="font-light">Berlin</span>
                    </p>
                  </div>
                </div>
              </li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export { App }
