export default function MainLayout({ header, footer, children }) {
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}