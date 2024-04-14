import { useEffect, useState } from "react"
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider, Link, Navigate } from "react-router-dom"
import { CaretDown, MagnifyingGlass, Moon } from "@phosphor-icons/react"



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
      <header className="flex justify-between items-center py-[30px] px-4 bg-white dark:bg-gray-400 drop-shadow-3xl">
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
      <Outlet />
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


  const formatNumber = new Intl.NumberFormat('en-US')

  return (
    <>

      <div className="app">
        <header className="mt-6 mb-8 flex flex-col gap-10 px-4">
          <label className="relative drop-shadow-4xl">
            <MagnifyingGlass size={18} weight="bold" className="absolute top-[16px] left-[30px] text-gray-900 dark:text-white" />
            <input value={search} onChange={handleChangeSearch} type="text" placeholder="Search for a country…" className="py-[14px] px-[74px] font-sans 
            bg-white text-gray-100 dark:bg-gray-400 dark:text-white outline-none rounded-md w-full" />
          </label>
          <div className="relative w-52">
            <CaretDown size={10} weight="bold" className="absolute top-[15px] right-[19px] text-gray-900 dark:text-white" />
            <select value={regionOption} onChange={handleChangeRegion} name="region" className="py-3 px-6 font-sans rounded-md bg-white text-gray-900 dark:bg-gray-400 dark:text-white text-xs outline-none w-full drop-shadow-4xl">
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
              <li key={country.id} className="bg-white dark:bg-gray-400 w-[264px] rounded-md overflow-hidden drop-shadow-5xl">
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
              </li>)
            )}
          </ul>
        </div>
      </div>
    </>
  )

}

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />} >
      <Route index element={<Navigate to="/rest-countries" />} />
      <Route path="rest-countries" element={<Home />} />
    </Route>
  )
)

const App = () => <RouterProvider router={routes} />

export { App }
