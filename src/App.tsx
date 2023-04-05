// styles
import "./app.scss";

// router
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
// import PlaylistDetail from "./pages/PlaylistDetail";
import Search from "./pages/Search";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";

export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />}>
          <Route path="/search/:keyword" />
        </Route>
      </Route>
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}
