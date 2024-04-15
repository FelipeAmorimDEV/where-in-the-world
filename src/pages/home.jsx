import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react"
import formatNumber from "@/utils/format-number"

const Home = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [regionOption, setRegionOption] = useState('all')
  const [loading, setLoading] = useState(null)

  const filteredCountriesByRegion = countries
    .filter(({ region }) => regionOption === 'all' ? true : region.toLowerCase() === regionOption)
  const filteredCountries = filteredCountriesByRegion
    .filter(({ name, capital, region }) => `${name.common}${capital}${region}`.toLowerCase().includes(search.toLowerCase()))
  const countriesInAlphabeticOrder = filteredCountries
    .sort((a, b) => a.name.common < b.name.common ? -1 : a.name.common > b.name.common ? 1 : 0)

  useEffect(() => {
    setLoading('Loading...')
    fetch('https://restcountries.com/v3.1/all')
      .then(r => r.json())
      .then(data => setCountries(data.map(countrie => (
        { id: countrie.cca2, name: countrie.name, capital: countrie.capital, region: countrie.region, population: countrie.population, flags: countrie.flags }
      ))))
      .catch(error => alert(error.message))
      .finally(() => setLoading(null))
  }, [])

  const handleChangeSearch = (e) => setSearch(e.target.value)
  const handleChangeRegion = (e) => setRegionOption(e.target.value)
  return (
    <>
      <header className="mt-6 mb-8 flex flex-col gap-10 lg:flex-row lg:justify-between tablet:my-12">
        <label className="relative drop-shadow-4xl shadow-xl" aria-label="search country by name">
          <MagnifyingGlass size={18} weight="bold" className="absolute top-[16px] left-[30px] text-gray-900 dark:text-white" />
          <input value={search} onChange={handleChangeSearch} type="text" placeholder="Search for a country…" className="py-[14px] px-[74px] font-sans 
            bg-white text-gray-900 dark:bg-gray-400 dark:text-white outline-none rounded-md w-full lg:w-[480px] text-xs tablet:text-sm" />
        </label>
        <div className="relative w-52">
          <CaretDown size={10} weight="bold" className="absolute top-[15px] right-[19px] text-gray-900 dark:text-white" />
          <select value={regionOption} onChange={handleChangeRegion} name="region" aria-label="filter by region" className="py-3 px-6 font-sans rounded-md bg-white text-gray-900 dark:bg-gray-400 dark:text-white text-xs outline-none w-full drop-shadow-4xl shadow-xl tablet:text-sm">
            <option value="all" disabled hidden>Filter by Region</option>
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </header>
      {loading && <h2 className="text-gray-900 dark:text-white font-bold text-2xl text-center">{loading}</h2>}
      {filteredCountries.length === 0 && search.length > 0
        ? <h2 className="font-sans font-bold text-red-500 text-center">No countries found...</h2>
        : <ul className="grid justify-items-center justify-center gap-10 list-none lg:grid-cols-4 laptop:grid-cols-[264px_264px_264px] laptop:gap-20 tablet:grid-cols-[264px_264px] tablet:gap-22 max-w-[1440px] mx-auto">
          {countriesInAlphabeticOrder.map(country => (
            <li key={country.id} className="bg-white dark:bg-gray-400 w-[264px] rounded-md overflow-hidden drop-shadow-5xl hover:-translate-y-5 hover:transition-all">
              <Link to={country.id.toLowerCase()}>
                <img src={country.flags.png} alt={country.flags.alt ?? `${country.name.common} flag`} className="h-[160px] w-[264px]" />
                <div className="px-6 pt-6 pb-11 text-gray-900 dark:text-white">
                  <h2 className="font-sans font-extrabold text-lg mb-4">{country.name.common}</h2>
                  <div className="font-sans text-sm">
                    <p>
                      <span className="font-semibold">Population: </span>
                      <span className="font-light">{formatNumber.format(country.population)}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Region: </span>
                      <span className="font-light">{country.region}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Capital: </span>
                      <span className="font-light">{country.capital}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          )
          )}
        </ul>
      }
    </>
  )
}

export { Home }