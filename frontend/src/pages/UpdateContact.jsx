import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/ContactsContext";
import { getContactById as fetchContactById } from "../api/contactsApi";

export default function UpdateContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editContact } = useContacts();
  const [form, setForm] = useState({
    name: "",
    url: "",
    mobileNo: "",
    email: "",
    companyName: "",
    title: "",
    group: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadContact() {
      try {
        const data = await fetchContactById(id);
        setForm({
          name: data.name || "",
          url: data.url || "",
          mobileNo: data.mobileNo || "",
          email: data.email || "",
          companyName: data.companyName || "",
          title: data.title || "",
          group: data.group || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadContact();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-14 text-center text-gray-500">
        <p className="text-lg">Error loading contact: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm px-6 py-2.5 rounded transition-colors"
        >
          Back to Directory
        </button>
      </main>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await editContact(id, form);
      navigate("/");
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatarSrc =
    form.url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || "contact"}`;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-in slide-in-from-top-4 fade-in duration-500">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Edit Contact</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl">
          Edit the contact information below and save your changes.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        {/* Live Avatar Preview - Top on Mobile, Right on Desktop */}
        <div className="order-1 md:order-2 flex-shrink-0 relative group">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 p-1.5 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
            <div className="w-full h-full rounded-full bg-white border-4 border-white shadow-inner overflow-hidden ring-1 ring-gray-100">
              <img
                src={avatarSrc}
                alt="Preview"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                    form.name || "contact"
                  }`;
                }}
              />
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg uppercase tracking-tighter animate-bounce">
            Live Preview
          </div>
        </div>

        {/* Form Container */}
        <div className="order-2 md:order-1 flex-1 w-full bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block transition-colors group-focus-within:text-blue-500">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name..."
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block transition-colors group-focus-within:text-blue-500">Photo URL</label>
                <input
                  type="text"
                  name="url"
                  placeholder="Avatar image link..."
                  value={form.url}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    placeholder="Mobile..."
                    value={form.mobileNo}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email..."
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Company</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Workplace..."
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Role..."
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
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
                  <option value="" disabled>Select Group..</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Work">Work</option>
                  <option value="Colleagues">Colleagues</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-50">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-blue-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

