import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RecordsProvider } from './context/RecordsContext'
import { AppShell } from './components/layout/AppShell'
import { BuildingOverview } from './components/views/BuildingOverview'
import { FloorPlanView } from './components/views/FloorPlanView'
import { ShopView } from './components/views/ShopView'
import { InboxTerminal } from './components/views/InboxTerminal'
import './App.css'

function App() {
  return (
    <RecordsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<BuildingOverview />} />
            <Route path="inbox" element={<InboxTerminal />} />
            <Route path="floor/:floorId" element={<FloorPlanView />} />
            <Route path="shop/:floorId/:slug" element={<ShopView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecordsProvider>
  )
}

export default App
