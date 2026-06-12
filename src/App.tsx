import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import JournalScreen from './screens/JournalScreen'
import PlaceholderScreen from './screens/PlaceholderScreen'
import { NAV_ITEMS } from './lib/nav'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/journal" replace />} />
        <Route path="/journal" element={<JournalScreen />} />
        {NAV_ITEMS.filter((item) => item.planned).map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<PlaceholderScreen item={item} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/journal" replace />} />
      </Route>
    </Routes>
  )
}
