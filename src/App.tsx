import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import JournalScreen from './screens/JournalScreen'
import DashboardScreen from './screens/DashboardScreen'
import EquipmentScreen from './screens/EquipmentScreen'
import SchematicsScreen from './screens/SchematicsScreen'
import GuidesScreen from './screens/GuidesScreen'
import MeasurementsScreen from './screens/MeasurementsScreen'
import PartsScreen from './screens/PartsScreen'
import CommunityScreen from './screens/CommunityScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/journal" replace />} />
        <Route path="/journal" element={<JournalScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/equipment" element={<EquipmentScreen />} />
        <Route path="/schematics" element={<SchematicsScreen />} />
        <Route path="/guides" element={<GuidesScreen />} />
        <Route path="/measurements" element={<MeasurementsScreen />} />
        <Route path="/parts" element={<PartsScreen />} />
        <Route path="/community" element={<CommunityScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/journal" replace />} />
      </Route>
    </Routes>
  )
}
