import { ArrowLeft } from "@phosphor-icons/react"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import formatNumber from "@/utils/format-number"

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

export { Country, countryLoader }