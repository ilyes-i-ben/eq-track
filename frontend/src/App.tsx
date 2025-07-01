import './index.css'
import EquipmentTable from "./components/EquipmentTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Equipment Management</h1>
      </header>
      <main className="w-full max-w-4xl p-4 bg-white rounded shadow-sm">
        {/* Placeholder for future: creation/edit form, confirmation dialog, etc. */}
        <section className="mb-8">
          <EquipmentTable />
        </section>
        {/* Future features/components will be added here */}
      </main>
    </div>
  )
}

export default App
