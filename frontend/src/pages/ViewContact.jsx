import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContactById } from "../api/contactsApi";

export default function ViewContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const data = await getContactById(id);
        setContact(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-14 text-center text-gray-500">
        <p className="text-lg">Contact not found or Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-sm px-6 py-2.5 rounded transition-colors"
        >
          Back to Directory
        </button>
      </main>
    );
  }

  const fields = [
    { label: "Name", value: contact.name },
    { label: "Mobile", value: contact.mobileNo },
    { label: "Email", value: contact.email },
    { label: "Company", value: contact.companyName },
    { label: "Title", value: contact.title },
    { label: "Group", value: contact.group },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-14 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-50 relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-60"></div>

        {/* Avatar Section */}
        <div className="relative group z-10">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-blue-100 to-green-100 p-1.5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-white overflow-hidden border-4 border-white ring-1 ring-gray-100">
              <img
                src={contact.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
                alt={contact.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`;
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full z-10">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{contact.name}</h1>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">{contact.group || "No Group"}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {fields.map((field, index) => (
              <div
                key={field.label}
                className="group flex flex-col sm:flex-row sm:items-center p-3 rounded-xl transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-100"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider w-28 mb-1 sm:mb-0">
                  {field.label}
                </span>
                <span className="font-semibold text-gray-800 break-all sm:text-lg">
                  {field.value || "—"}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 sm:flex-none bg-gray-900 hover:bg-black text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Go Back
            </button>
            <button
              onClick={() => navigate(`/contacts/${id}/edit`)}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
              Quick Edit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


