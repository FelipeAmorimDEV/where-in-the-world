import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom"

import { DefaultLayout } from "@/layouts/default-layout"
import { Home } from "@/pages/home"
import { NotFound } from "@/pages/not-found"
import { Country, countryLoader } from "@/pages/country"
import { ErrorElement } from '@/components/error-element'

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
