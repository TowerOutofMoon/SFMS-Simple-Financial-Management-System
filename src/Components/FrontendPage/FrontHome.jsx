import {Route, Routes} from 'react-router-dom';
import React from "react";
import Products from "./Products";
import Cart from "./Cart";

const FrontHomeRoutes = (
    <Routes>
        <Route path="/*" element={<Products/>}/>
        <Route path="products/*" element={<Products />} />
        <Route path="cart/*" element={<Cart />} />
    </Routes>
)

const FrontHome = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
            backgroundColor: "#050525", height: "100vh"}}>
            {FrontHomeRoutes}
        </div>
    )
}
export default FrontHome