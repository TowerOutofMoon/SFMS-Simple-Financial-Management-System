import {Route, Routes} from "react-router-dom";
import BackHome from "./BackHome";

const BackendRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<BackHome />} />
        </Routes>
    )
}
export default BackendRoutes