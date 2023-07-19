import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
function Loading() {
    return (
        <div className="loading-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ScaleLoader color="#4cceac" css="speedMultiplier: 0.6;"   size={200} /> 
        </div>
    );
}

export default Loading;