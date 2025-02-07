import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// import Customize from './routes/Customize'
// import Shape from './routes/customize/Shape'
// import Flavor from './routes/customize/Flavor'
// import Color from './routes/customize/Color'
// import Toppings from './routes/customize/Toppings'
// import Write from './routes/customize/Write'
// import { createBrowserRouter, Navigate } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: 'customize',
//         element: <Customize />,
//         children: [
//           {
//             path: 'shape',
//             element: <Shape />,
//           },
//           // {
//           //   path: 'flavor',
//           //   element: <Flavor />,
//           // },
//           // {
//           //   path: 'color',
//           //   element: <Color />,
//           // },
//           // {
//           //   path: 'toppings',
//           //   element: <Toppings />,
//           // },
//           // {
//           //   path: 'write',
//           //   element: <Write />,
//           // },
//           // {
//           //   index: true,
//           //   element: <Navigate to="shape" replace />,
//           // },
//         ],
//       },
//     ],
//   },
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)