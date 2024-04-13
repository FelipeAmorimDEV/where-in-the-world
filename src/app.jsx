const App = () => {
 return (
  <>
    <header><a href="/">Where in the worlds?</a> <div><span>Dark Mode</span></div></header>
    <div className="app">
      <form>
        <input type="text" placeholder="Search for a country…"/>
        <select name="region">
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </form>
      <div className="countries">
        <ul>
          <li className="country">
            <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." />
            <div>
              <h2>Belgium</h2>
              <p><span>Population: </span> <span>81,770,900</span></p>
              <p><span>Region: </span> <span>Europe</span></p>
              <p><span>Capital: </span> <span>Berlin</span></p>
            </div>
          </li>
          <li className="country">
            <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." />
            <div>
              <h2>Belgium</h2>
              <p><span>Population: </span> <span>81,770,900</span></p>
              <p><span>Region: </span> <span>Europe</span></p>
              <p><span>Capital: </span> <span>Berlin</span></p>
            </div>
          </li>
          <li className="country">
            <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." />
            <div>
              <h2>Belgium</h2>
              <p><span>Population: </span> <span>81,770,900</span></p>
              <p><span>Region: </span> <span>Europe</span></p>
              <p><span>Capital: </span> <span>Berlin</span></p>
            </div>
          </li>
          <li className="country">
            <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." />
            <div>
              <h2>Belgium</h2>
              <p><span>Population: </span> <span>81,770,900</span></p>
              <p><span>Region: </span> <span>Europe</span></p>
              <p><span>Capital: </span> <span>Berlin</span></p>
            </div>
          </li>
          <li className="country">
            <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." />
            <div>
              <h2>Belgium</h2>
              <p><span>Population: </span> <span>81,770,900</span></p>
              <p><span>Region: </span> <span>Europe</span></p>
              <p><span>Capital: </span> <span>Berlin</span></p>
            </div>
          </li>
          <li className="country">
            <img src="https://flagcdn.com/be.svg" alt="The flag of Belgium is composed of three equal vertical bands of black, yellow and red." />
            <div>
              <h2>Belgium</h2>
              <p><span>Population: </span> <span>81,770,900</span></p>
              <p><span>Region: </span> <span>Europe</span></p>
              <p><span>Capital: </span> <span>Berlin</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </>
 )
}

export { App }
