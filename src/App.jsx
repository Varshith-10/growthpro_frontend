import { useState } from "react";
import "./index.css"; // Tailwind styles

function App() {
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/business-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setBusinessData(data);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    const res = await fetch(
      `http://localhost:3000/regenerate-headline?name=${formData.name}&location=${formData.location}`
    );
    const data = await res.json();
    setBusinessData((prev) => ({ ...prev, headline: data.headline }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Mini Local Business Dashboard
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Business Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Display Card */}
      {businessData && (
        <div className="mt-9 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {formData.name} - {formData.location}
          </h2>
          <p className="text-gray-600">⭐ Rating: {businessData.rating}</p>
          <p className="text-gray-600">📢 Reviews: {businessData.reviews}</p>
          <p className="mt-4 italic text-gray-700">
            🧠 "{businessData.headline}"
          </p>
          <button
            onClick={regenerateHeadline}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
