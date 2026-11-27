import { useEffect } from "react";
import ContactBanner from "../components/organisms/ContactBanner";
import ContactDetails from "../components/organisms/ContactDetails";

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <ContactBanner />
      <ContactDetails />
    </main>
  );
}