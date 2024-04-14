import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [regionOption, setRegionOption] = useState('all')
  const [loading, setLoading] = useState(null)

  const filteredCountriesByRegion = countries
    .filter(({ region }) => regionOption === 'all' ? true : region.toLowerCase() === regionOption)
  const filteredCountries = filteredCountriesByRegion.filter(({ name, capital, region }) => {
    return `${name.common}${capital}${region}`.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    setLoading('Loading...')
    fetch('https://restcountries.com/v3.1/all')
      .then(r => r.json())
      .then(data => setCountries(data.map(countrie => (
        {
          id: countrie.cca2,
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
      .finally(() => setLoading(null))
  }, [])

  const handleChangeSearch = (e) => setSearch(e.target.value)
  const handleChangeRegion = (e) => setRegionOption(e.target.value)

  const formatNumber = new Intl.NumberFormat('en-US')

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
            <input value={search} onChange={handleChangeSearch} type="text" placeholder="Search for a country…" className="py-[14px] px-[74px] font-sans bg-gray-400 text-white outline-none rounded-md w-full" />
          </label>
          <div className="relative w-52">
            <CaretDown size={10} color="#ffffff" weight="bold" className="absolute top-[15px] right-[19px]" />
            <select value={regionOption} onChange={handleChangeRegion} name="region" className="py-3 px-6 font-sans rounded-md  bg-gray-400 text-white text-xs outline-none w-full">
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
        <div className="countries">
          <ul className="grid justify-items-center gap-10 list-none">
            {loading && <h2 className="text-white font-bold text-2xl">{loading}</h2>}
            {!loading && filteredCountries.length === 0 && search.length > 0 &&
              <h2 className="font-sans font-bold text-red-500 ">No countries found...</h2>
            }
            {filteredCountries.map(country => (
              <li key={country.id} className="bg-gray-400 w-[264px] rounded-md overflow-hidden z-10">
                <img src={country.flags.png} alt={country.flags.alt} className="h-[160px] w-[264px]" />
                <div className="px-6 pt-6 pb-11">
                  <h2 className="font-sans font-extrabold text-white text-lg mb-4">{country.name.common}</h2>
                  <div className="text-white font-sans text-sm">
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
              </li>)
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export { App }
