import { useState } from "react";

export default function ContactCard({ contact, onView, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const avatarSrc =
    contact.url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`;

  const handleDeleteConfirm = () => {
    onDelete(contact.id);
    setShowConfirm(false);
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm mx-auto">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            {/* Text */}
            <h2 className="text-lg font-bold text-gray-800 text-center">
              Delete Contact?
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {contact.name}
              </span>
              ?
              <br />
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500 opacity-50 pointer-events-none -z-10"></div>

        <div className="relative">
          <img
            src={avatarSrc}
            alt={contact.name}
            className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-sm ring-1 ring-gray-100 flex-shrink-0 bg-gray-50 transition-transform group-hover:scale-110 duration-500"
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`;
            }}
          />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1 w-full flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left w-full">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                Contact Details
              </p>
              <p className="font-bold text-gray-800 text-lg sm:text-base leading-tight">
                {contact.name}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {contact.mobileNo}
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-2 truncate max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {contact.email}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center gap-2 mt-2 sm:mt-0 relative z-10">
            {/* View */}
            <button
              onClick={() => onView(contact)}
              className="w-10 h-10 sm:w-9 sm:h-9 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-90"
              title="View Details"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            {/* Edit */}
            <button
              onClick={() => onEdit(contact)}
              className="w-10 h-10 sm:w-9 sm:h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-90"
              title="Edit Contact"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            {/* Delete */}
            <button
              onClick={() => setShowConfirm(true)}
              className="w-10 h-10 sm:w-9 sm:h-9 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-90"
              title="Delete Contact"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
