import { useEffect, useState } from "react"
import { Moon } from "@phosphor-icons/react"
import { Outlet, Link } from "react-router-dom"

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
export { DefaultLayout }