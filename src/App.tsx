import Button from 'remoteApp/Button'
import Button2 from 'remoteApp2/Button'

const appTitle = import.meta.env.VITE_VAR1

console.info(appTitle) // Agrega esta línea

function App() {
  return (
    <div>
      <div></div>
      <h1>HOST</h1>
      <h1>{appTitle}</h1>
      <div className="card">
        <Button />
      </div>
      <div className="card">
        <Button2 />
      </div>
    </div>
  )
}

export default App
