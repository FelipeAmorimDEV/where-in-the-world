import { useEffect, useState } from "react"
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider, Link, Navigate, useLoaderData, useNavigate } from "react-router-dom"
import { ArrowLeft, CaretDown, MagnifyingGlass, Moon } from "@phosphor-icons/react"

const formatNumber = new Intl.NumberFormat('en-US')

const DefaultLayout = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'white')

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    }

    if (theme === 'white') {
      document.body.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const handleToogleTheme = () => setTheme(prev => prev === 'dark' ? 'white' : 'dark')
  return (
    <>
      <header className="flex justify-between items-center py-[30px] px-4 bg-white dark:bg-gray-400 drop-shadow-3xl shadow-sm">
        <Link to="/" className="text-sm font-extrabold text-gray-900 dark:text-white font-sans">
          Where in the worlds?
        </Link>
        <button onClick={handleToogleTheme} className="flex items-center gap-2">
          <Moon
            size={16}
            color={theme === 'dark' ? '#fff' : '#111517'}
            weight={theme === 'dark' ? 'fill' : 'bold'}
          />
          <span className="font-semibold text-xs text-gray-900 dark:text-white">Dark Mode</span>
        </button>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  )
}

const Home = () => {
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

  return (
    <div>
      <header className="mt-6 mb-8 flex flex-col gap-10 px-4">
        <label className="relative drop-shadow-4xl shadow-xl">
          <MagnifyingGlass size={18} weight="bold" className="absolute top-[16px] left-[30px] text-gray-900 dark:text-white" />
          <input value={search} onChange={handleChangeSearch} type="text" placeholder="Search for a country…" className="py-[14px] px-[74px] font-sans 
            bg-white text-gray-900 dark:bg-gray-400 dark:text-white outline-none rounded-md w-full" />
        </label>
        <div className="relative w-52">
          <CaretDown size={10} weight="bold" className="absolute top-[15px] right-[19px] text-gray-900 dark:text-white" />
          <select value={regionOption} onChange={handleChangeRegion} name="region" className="py-3 px-6 font-sans rounded-md bg-white text-gray-900 dark:bg-gray-400 dark:text-white text-xs outline-none w-full drop-shadow-4xl shadow-xl">
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
          {loading && <h2 className="text-gray-900 dark:text-white font-bold text-2xl">{loading}</h2>}
          {!loading && filteredCountries.length === 0 && search.length > 0 &&
            <h2 className="font-sans font-bold text-red-500 ">No countries found...</h2>
          }
          {filteredCountries.map(country => (
            <Link key={country.id} to={country.id.toLowerCase()}>
              <li className="bg-white dark:bg-gray-400 w-[264px] rounded-md overflow-hidden drop-shadow-5xl">
                <img src={country.flags.png} alt={country.flags.alt} className="h-[160px] w-[264px]" />
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
              </li>
            </Link>
          )
          )}
        </ul>
      </div>
    </div>
  )
}

const countryLoader = async ({ params }) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.id}`)
  const data = await response.json()
  return data.map(country => ({
    id: country.cca2,
    name: country.name,
    tld: country.tld,
    currencies: country.currencies,
    capital: country.capital,
    region: country.region,
    subRegion: country.subregion,
    languages: country.languages,
    borders: country.borders,
    population: country.population,
    continents: country.continents,
    flags: country.flags
  }))[0]
}

const Country = () => {
  const countryData = useLoaderData()
  const navigate = useNavigate()

  const handleBackHome = () => navigate('/')

  const nativeName = Object.keys(countryData.name.nativeName)[0]
  const languages = Object.entries(countryData.languages).reduce((acc, item) => [...acc, item[1]], []).join(', ')
  const currencies = Object.entries(countryData.currencies).reduce((acc, item) => [...acc, item[1].name], []).join(', ')
  return (
    <div className="px-7">
      <header className="mt-10 rounded-sm mb-16">
        <button className="py-[6px] px-[24px] bg-white text-gray-900 dark:bg-gray-400 dark:text-white font-sans flex items-center gap-2 font-light drop-shadow-1xl shadow-xl" onClick={handleBackHome}>
          <ArrowLeft size={18} className="dark:text-white" />
          Back
        </button>
      </header>
      <div className="grid">
        <img src={countryData.flags.png} alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." className="w-[320px] h-[229px] mb-11" />
        <div className="country-data">
          <h2 className="font-sans font-extrabold  text-gray-900 dark:text-white text-2xl mb-4">{countryData.name.common}</h2>
          <div className="text-sm text-gray-900 dark:text-white flex flex-col gap-2 mb-8">
            <p>
              <span className="font-semibold">Native Name: </span>
              <span className="font-light">{countryData.name.nativeName[nativeName].common}</span>
            </p>
            <p>
              <span className="font-semibold">Population: </span>
              <span className="font-light">{formatNumber.format(countryData.population)}</span>
            </p>
            <p>
              <span className="font-semibold">Region: </span>
              <span className="font-light">{countryData.region}</span>
            </p>
            <p>
              <span className="font-semibold">Sub Region: </span>
              <span className="font-light">{countryData.subRegion}</span>
            </p>
            <p>
              <span className="font-semibold">Capital: </span>
              <span className="font-light">{countryData.capital}</span>
            </p>
          </div>
          <div className="text-sm text-gray-900 dark:text-white flex flex-col gap-2 mb-8">
            <p>
              <span className="font-semibold">Top Level Domain: </span>
              <span className="font-light">{countryData.tld}</span>
            </p>
            <p>
              <span className="font-semibold">Currencies: </span>
              <span className="font-light">{currencies}</span>
            </p>
            <p>
              <span className="font-semibold">Languages: </span>
              <span className="font-light">{languages}</span>
            </p>
          </div>
          {countryData.borders &&
            <div className="border-countries">
              <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-4">Border Countries:</h3>
              <ul className="grid grid-cols-3 gap-[10px] mb-16 text-center">
                {countryData.borders.map(country =>
                  <Link key={country} to={`/rest-countries/${country.toLowerCase()}`}>
                    <li className="dark:bg-gray-400 text-gray-900 dark:text-white py-[6px] rounded-sm font-light text-xs">{country}</li>
                  </Link>
                )}
              </ul>
            </div>
          }
        </div>
      </div>
    </div >
  )
}

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />} >
      <Route index element={<Navigate to="/rest-countries" />} />
      <Route path="rest-countries" element={<Home />} />
      <Route path="rest-countries/:id" element={<Country />} loader={countryLoader} />
    </Route>
  )
)

const App = () => <RouterProvider router={routes} />

export { App }
