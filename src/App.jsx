import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
// some code added 
  return (
    <> <Image
    src="https://res.cloudinary.com/dqugrb0la/image/upload/v1756655880/WhatsApp_Image_2025-08-17_at_21.39.06_c4ie2t.jpg"
    width={280}
    height={280}
    alt="fff"
    className="w-[280px] h-[280px] rounded-full border-4 border-[#3c91b2] object-cover"
  />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
