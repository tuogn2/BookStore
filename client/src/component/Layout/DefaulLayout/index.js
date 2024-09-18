import Header from "../componet/Header";

function DefaulLayout({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default DefaulLayout;
