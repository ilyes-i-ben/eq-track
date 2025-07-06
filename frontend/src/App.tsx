import './index.css'
import EquipmentTablePaginated from "./components/EquipmentTablePaginated";
import AddEquipmentButton from "./components/AddEquipmentButton";
import { PaginationProvider } from "./context/PaginationContext";

function App() {
  return (
    <PaginationProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Equipment Management</h1>
        </header>
        <main className="w-full max-w-full p-4 bg-white rounded shadow-sm">
          <div className="mb-6 flex justify-end">
            <AddEquipmentButton />
          </div>
          <section className="mb-8 flex justify-center">
            <EquipmentTablePaginated />
          </section>
        </main>
      </div>
    </PaginationProvider>
  )
}

export default App
