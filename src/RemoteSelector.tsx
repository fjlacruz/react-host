import React, { useState, lazy, Suspense } from 'react'

interface RemoteSelectorProps {
  remotes: Record<string, string> // { nombreRemoto: 'nombreRemoto/NombreComponente' }
}

const RemoteSelector: React.FC<RemoteSelectorProps> = ({ remotes }) => {
  const [selectedRemote, setSelectedRemote] = useState<string | null>(null)
  const RemoteComponent = selectedRemote
    ? lazy(() => import(remotes[selectedRemote]))
    : null

  const handleRemoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemote(event.target.value)
  }

  return (
    <div>
      <select onChange={handleRemoteChange} value={selectedRemote || ''}>
        <option value="">Selecciona un componente remoto</option>
        {Object.keys(remotes).map((remoteName) => (
          <option key={remoteName} value={remoteName}>
            {remoteName}
          </option>
        ))}
      </select>

      {selectedRemote && (
        <Suspense fallback={<div>Cargando componente remoto...</div>}>
          {RemoteComponent && <RemoteComponent />}
        </Suspense>
      )}
    </div>
  )
}

export default RemoteSelector
