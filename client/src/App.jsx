import { useState } from 'react';
import Marketplace from './components/Marketplace';
import AddProduct from './components/AddProduct'; // Move your previous form to a component or keep it here

function App() {
  const [view, setView] = useState('market'); // 'market' or 'add'

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Simple Navigation */}
      <nav className="flex justify-between items-center p-6 border-b border-stone-100 bg-white">
        <h1 className="text-2xl font-serif font-bold text-green-900">PureHarvest</h1>
        <div className="space-x-4">
          <button 
            onClick={() => setView('market')}
            className={`px-4 py-2 rounded-lg ${view === 'market' ? 'bg-green-100 text-green-800' : 'text-stone-600'}`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => setView('add')}
            className={`px-4 py-2 rounded-lg ${view === 'add' ? 'bg-green-100 text-green-800' : 'text-stone-600'}`}
          >
            Sell Produce
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-10">
        {view === 'market' ? <Marketplace /> : <AddProduct />}
      </main>
    </div>
  );
}

export default App;