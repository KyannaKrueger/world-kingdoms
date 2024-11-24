import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="App">
      <header>
        <h1>
          <Link to="/">World Kingdoms</Link>
        </h1>
      </header>
      <div className="layout">
        <Outlet />
      </div>
    </div>
  );
}
