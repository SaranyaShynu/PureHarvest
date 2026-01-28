import { useState } from 'react';
import axios from 'axios';
import { Leaf, DollarSign, User } from 'lucide-react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '', price: '', farmerName: '', category: 'Vegetables'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert("🥬 Successfully added to PureHarvest!");
      setFormData({ name: '', price: '', farmerName: '', category: 'Vegetables' });
    } catch (err) {
      alert("Error saving product.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
      <h2 className="text-2xl font-serif text-green-800 mb-6 flex items-center gap-2">
        <Leaf className="text-green-600" /> List Your Harvest
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-3 bg-stone-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Product Name (e.g., Organic Spinach)"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <div className="flex gap-2">
          <input 
            type="number"
            className="w-1/2 p-3 bg-stone-50 rounded-xl outline-none"
            placeholder="Price ($/kg)"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
          <select 
            className="w-1/2 p-3 bg-stone-50 rounded-xl outline-none"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Herbs</option>
          </select>
        </div>
        <input 
          className="w-full p-3 bg-stone-50 rounded-xl outline-none"
          placeholder="Your Name (Farmer)"
          value={formData.farmerName}
          onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
          required
        />
        <button type="submit" className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-all">
          List Harvest
        </button>
      </form>
    </div>
  );
};

export default AddProduct;