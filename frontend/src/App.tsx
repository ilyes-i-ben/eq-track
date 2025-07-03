import './index.css'
import EquipmentTable from "./components/EquipmentTable";
import AddEquipmentButton from "./components/AddEquipmentButton";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Equipment Management</h1>
      </header>
      <main className="w-full max-w-full p-4 bg-white rounded shadow-sm">
        <div className="mb-6 flex justify-end">
          <AddEquipmentButton />
        </div>
        <section className="mb-8">
          <EquipmentTable />
        </section>
      </main>
    </div>
  )
}

export default App
