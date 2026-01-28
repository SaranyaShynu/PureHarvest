import { useState, useEffect } from 'react';
import axios from 'axios';
// Import Trash2 and Leaf correctly
import { Leaf, MapPin, Trash2, Search } from 'lucide-react';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        // Ensure we always set an array, even if the backend fails
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching produce", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = async (id) => {
    if (window.confirm("Is this harvest item sold out?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(item => item._id !== id));
      } catch (err) {
        alert("Could not remove item.");
      }
    }
  };

  if (loading) return <div className="text-center p-10 text-green-800">Loading the harvest...</div>;

  return (
    <div className="p-6">
      {/* Search Input Section */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
        <input
          type="text"
          placeholder="Search for fresh veggies, fruits..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-stone-500 col-span-3 text-center italic mt-10">
            {searchTerm ? `No harvest matches "${searchTerm}"` : "The market is empty right now."}
          </p>
        ) : (
          filteredProducts.map((item) => (
            <div key={item._id} className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 p-5 group animate-in fade-in duration-500">
              <button 
                onClick={() => deleteProduct(item._id)}
                className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Leaf className="text-green-600" size={18} />
                <span className="text-xs font-bold uppercase tracking-wider text-green-700">Pesticide Free</span>
              </div>

              <h3 className="text-xl font-bold text-stone-800 mb-1">{item.name}</h3>
              <p className="text-stone-500 text-sm mb-4 flex items-center gap-1">
                <MapPin size={14} /> Farmer: {item.farmerName}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-serif text-green-800 font-bold">${item.price}<small className="text-sm text-stone-400">/kg</small></span>
                <button className="bg-stone-900 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-medium">
                  Add to Basket
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Marketplace;