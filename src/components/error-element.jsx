import { useRouteError } from "react-router-dom"

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

export { ErrorElement }