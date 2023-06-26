import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackendRoutes from "./Components/BackendPage/BackendRoutes"

import './index.css'
import FrontendRoutes from "./Components/FrontendPage/FrontendRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<FrontendRoutes />} />
            <Route path="/frontend/*" element={<FrontendRoutes />} />
            <Route path="/backend/*" element={<BackendRoutes />} />
        </Routes>
    </Router>
)