// import Loader from "./components/atoms/Loader";
// import HomePage from "./pages/HomePage";

// export default function App() {
//   return (
//     <>
//       <Loader />
//       <HomePage />
//     </>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import ScrollToHash from "./components/atoms/ScrollToHash";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}