import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PhoneDirectory from "./pages/PhoneDirectory";
import CreateContact from "./pages/CreateContact";
import ViewContact from "./pages/ViewContact";
import UpdateContact from "./pages/UpdateContact";
import { ContactsProvider } from "./context/ContactsContext";

export default function App() {
  return (
    <ContactsProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<PhoneDirectory />} />
            <Route path="/contacts/create" element={<CreateContact />} />
            <Route path="/contacts/:id" element={<ViewContact />} />
            <Route path="/contacts/:id/edit" element={<UpdateContact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ContactsProvider>
  );
}
