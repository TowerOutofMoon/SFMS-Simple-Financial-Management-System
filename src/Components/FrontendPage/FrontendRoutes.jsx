import {Route, Routes} from "react-router-dom";
import FrontHome from "./FrontHome";

const FrontRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<FrontHome />} />
        </Routes>
    )
}
export default FrontRoutes