import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const appTitle = import.meta.env.VITE_VAR1

const simulatedRemoteConfig = [
  {
    route: '/remote-button',
    module: {
      importPath: () => import('remoteApp/Button'),
      ref: 'remoteAppButton',
    },
  },
  {
    route: '/remote-button2',
    module: {
      importPath: () => import('remoteApp2/Button'),
      ref: 'remoteApp2Button',
    },
  },
  {
    route: '/remote-button3',
    module: {
      importPath: () => import('remoteApp2/Button'),
      ref: 'remoteApp3Button',
    },
  },
]

// Recorrer el array y convertir importPath de cadena a función
const updatedConfig = simulatedRemoteConfig.map((item) => {
  const importPathString = item.module.importPath

  // Usamos eval para evaluar el string y convertirlo en una función
  const updatedImportPath = eval(importPathString)

  return {
    ...item,
    module: {
      ...item.module,
      importPath: updatedImportPath,
    },
  }
})

console.log(updatedConfig)

function App() {
  const [remoteRoutes, setRemoteRoutes] = useState([])

  useEffect(() => {
    const fetchConfig = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mapeamos las rutas y creamos los componentes dinámicamente
      const routesWithComponents = updatedConfig.map((routeConfig) => ({
        ...routeConfig,
        component: lazy(routeConfig.module.importPath), // Usamos la función de importación dinámica
      }))

      setRemoteRoutes(routesWithComponents)
    }

    fetchConfig()
  }, [])

  const generateRoutes = () => {
    return remoteRoutes.map((routeConfig) => {
      const RemoteComponent = routeConfig.component
      if (!RemoteComponent) {
        return null
      }
      return (
        <Route
          key={routeConfig.route}
          path={routeConfig.route}
          element={
            <Suspense fallback={<div>Cargando...</div>}>
              <RemoteComponent />
            </Suspense>
          }
        />
      )
    })
  }

  const generateLinks = () => {
    return remoteRoutes.map((routeConfig) => (
      <Link key={routeConfig.route} to={routeConfig.route}>
        {routeConfig.route}
      </Link>
    ))
  }

  return (
    <Router>
      <div>
        <h1>HOST</h1>
        <h1>{appTitle}</h1>
        <nav>{generateLinks()}</nav>
        <Routes>{generateRoutes()}</Routes>
      </div>
    </Router>
  )
}

export default App
