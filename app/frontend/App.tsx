import { useState } from 'react'
import reactLogo from '~/images/react.svg'
import viteLogo from '~/images/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App flex justify-center items-center">
      <div className="btn-group btn-group-vertical">
        <button className="btn btn-wide">1-to-1 Room</button>
        <button className="btn btn-wide">Group Room</button>
      </div>
    </div>
  )
}

export default App
