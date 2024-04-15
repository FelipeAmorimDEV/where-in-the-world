import { useEffect, useState } from "react"
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider, Link, Navigate, useLoaderData, useNavigate, useRouteError } from "react-router-dom"
import { ArrowLeft, CaretDown, MagnifyingGlass, Moon } from "@phosphor-icons/react"

import formatNumber from "./utils/format-number"


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
      <header className="bg-white dark:bg-gray-400 drop-shadow-3xl shadow-sm" role="banner">
        <div className="flex justify-between items-center py-[30px] px-4 lg:px-[80px] max-w-[1440px] mx-auto">
          <nav role="navigation">
            <Link to="/" className="text-sm font-extrabold text-gray-900 dark:text-white font-sans tablet:text-2xl">
              <h1>Where in the worlds?</h1>
            </Link>
          </nav>
          <button onClick={handleToogleTheme} className="flex items-center gap-2">
            <Moon
              size={16}
              color={theme === 'dark' ? '#fff' : '#111517'}
              weight={theme === 'dark' ? 'fill' : 'bold'}
            />
            <span className="font-semibold text-xs text-gray-900 dark:text-white tablet:text-base">Dark Mode</span>
          </button>
        </div >
      </header>
      <main role="main" className="max-w-[1440px] mx-auto px-7 lg:px-[80px] tablet:mb-32">
        <Outlet />
      </main>
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

const countryLoader = async ({ params }) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.id}`)
  const data = await response.json()

  return data.length > 0
    ? data.map(country => ({
      name: country.name,
      tld: country.tld,
      currencies: country.currencies,
      capital: country.capital,
      region: country.region,
      subRegion: country.subregion,
      languages: country.languages,
      borders: country.borders,
      population: country.population,
      flags: country.flags,
      status: 'OK'
    }))[0]
    : { status: "not found" }
}

const Country = () => {
  const { name, languages, currencies, flags, population, region, subRegion, capital, tld, borders, status } = useLoaderData()
  const navigate = useNavigate()

  const handleBackHome = () => navigate('/')

  const nativeName = status === 'OK' ? Object.keys(name.nativeName)[0] : null
  const languagesSeparatedByComma = status === 'OK' ? Object.entries(languages).reduce((acc, item) => [...acc, item[1]], []).join(', ') : null
  const currenciesSeparatedByComma = status === 'OK' ? Object.entries(currencies).reduce((acc, item) => [...acc, item[1].name], []).join(', ') : null

  return (
    <>
      <header className="mt-10 rounded-sm mb-16 lg:my-20">
        <button className="py-[6px] px-[24px] bg-white text-gray-900 dark:bg-gray-400 dark:text-white font-sans flex items-center gap-2 font-light drop-shadow-1xl shadow-xl" onClick={handleBackHome}>
          <ArrowLeft size={18} className="dark:text-white" />
          Back
        </button>
      </header>

      {status === 'OK'
        ? <div className="grid justify-center laptop:justify-normal laptop:grid-cols-2 laptop:gap-x-20 lg:gap-x-28">
          <img src={flags.png} alt={flags.alt ?? `${name.common} flag`} className="w-full max-w-[584px] mb-11 laptop:mb-0  col-start-1 justify-self-center rounded-md" width={584} />
          <div className="tablet:grid tablet:grid-cols-[auto,auto] gap-x-10">
            <h2 className="font-sans font-extrabold  text-gray-900 dark:text-white text-2xl mb-4 tablet:col-span-2 lg:mb-6 lg:text-3xl">{name.common}</h2>
            <div className="text-sm text-gray-900 dark:text-white flex flex-col gap-2 mb-8 lg:mb-16 lg:text-base">
              <p>
                <span className="font-semibold">Native Name: </span>
                <span className="font-light">{name.nativeName[nativeName].common}</span>
              </p>
              <p>
                <span className="font-semibold">Population: </span>
                <span className="font-light">{formatNumber.format(population)}</span>
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                <span className="font-light">{region}</span>
              </p>
              <p>
                <span className="font-semibold">Sub Region: </span>
                <span className="font-light">{subRegion}</span>
              </p>
              <p>
                <span className="font-semibold">Capital: </span>
                <span className="font-light">{capital}</span>
              </p>
            </div>
            <div className="text-sm text-gray-900 dark:text-white flex flex-col gap-2 mb-8 lg:text-base">
              <p>
                <span className="font-semibold">Top Level Domain: </span>
                <span className="font-light">{tld}</span>
              </p>
              <p>
                <span className="font-semibold">Currencies: </span>
                <span className="font-light">{currenciesSeparatedByComma}</span>
              </p>
              <p>
                <span className="font-semibold">Languages: </span>
                <span className="font-light">{languagesSeparatedByComma}</span>
              </p>
            </div>
            {borders &&
              <div className="tablet:grid tablet:grid-cols-[140px,1fr] items-start gap-4 col-span-2">
                <p className="font-semibold text-base text-gray-900 dark:text-white mb-4">Border Countries:</p>
                <ul className="gap-[10px] mb-16 text-center lg:mb-0 grid grid-cols-4">
                  {borders.map(country =>
                    <li key={country}>
                      <Link to={`/rest-countries/${country.toLowerCase()}`} className="dark:bg-gray-400 text-gray-900 dark:text-white py-[6px] rounded-sm font-light text-xs tablet:text-sm block">
                        {country}
                      </Link>
                    </li>

                  )}
                </ul>
              </div>
            }
          </div>
        </div >
        : <h2 className="mt-10 text-center text-gray-900 dark:text-white text-3xl ">Country not found</h2>
      }
    </>
  )
}

const NotFound = () =>
  <div className="mt-32 text-center text-gray-900 dark:text-white">
    <h2 className="font-bold text-9xl">404</h2>
    <h3 className="text-3xl mt-3 mb-5">Page Not Found</h3>
    <Link to="/" className="px-4 py-2 bg-gray-400 text-white rounded-md text-lg font-bold hover:bg-opacity-0 hover:border hover:border-gray-900 hover:text-gray-900 dark:hover:text-white">Go Home</Link>
  </div>

const ErrorElement = () => {
  const error = useRouteError()
  return (
    <div className="mt-32 text-center text-gray-900 dark:text-white">
      <h2 className="font-bold text-9xl">Oops!</h2>
      <p className="text-3xl mt-3 mb-5">Sorry, an unexpected error occurred:</p>
      <p className="text-gray-900 dark:text-white text-lg font-bold">{error.message}</p>
    </div>
  )
}

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route errorElement={<ErrorElement />}>
        <Route index element={<Navigate to="/rest-countries" />} />
        <Route path="rest-countries" element={<Home />} />
        <Route path="rest-countries/:id" element={<Country />} loader={countryLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
)

const App = () => <RouterProvider router={routes} />

export { App }
