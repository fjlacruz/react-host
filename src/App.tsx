import Button from 'remoteApp/Button'

const appTitle = import.meta.env.VITE_VAR1

function App() {
  return (
    <div>
      <div></div>
      <h1>HOST</h1>
      <h1>{appTitle}</h1>
      <div className="card">
        <Button />
      </div>
    </div>
  )
}

export default App
