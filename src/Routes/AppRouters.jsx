import { Route, Routes } from "react-router-dom";
import Blank from "../components/Blank";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/Blank" element={<Blank />} />
    </Routes>
  )




}

export default AppRouter;