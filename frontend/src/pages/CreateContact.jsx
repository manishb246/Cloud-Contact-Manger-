import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactsContext";

const INITIAL_FORM = {
  name: "",
  url: "",
  mobileNo: "",
  email: "",
  companyName: "",
  title: "",
  group: "",
};

export default function CreateContact() {
  const navigate = useNavigate();
  const { addContact } = useContacts();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addContact(form);
      navigate("/");
    } catch (err) {
      alert("Failed to create contact: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-in zoom-in-95 fade-in duration-500">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-green-700 mb-2">New Contact</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg">
          Fill in the details below to add a new contact to your directory.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-50">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="space-y-4">
            <div className="group">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block transition-colors group-focus-within:text-blue-500">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name..."
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
              />
            </div>
            
            <div className="group">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block transition-colors group-focus-within:text-blue-500">Avatar URL</label>
              <input
                type="url"
                name="url"
                placeholder="https://example.com/photo.jpg"
                value={form.url}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Mobile</label>
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="+1 234 567 890"
                  value={form.mobileNo}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                />
              </div>
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Company</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company name..."
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                />
              </div>
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Software Engineer"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Group Type</label>
              <select
                name="group"
                value={form.group}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all cursor-pointer appearance-none bg-no-repeat bg-[right_1rem_center]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='gray'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1em' }}
              >
                <option value="" disabled>Select a Category..</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Work">Work</option>
                <option value="Colleagues">Colleagues</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-50 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-green-200 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Create Contact"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

