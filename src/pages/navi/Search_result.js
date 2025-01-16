import React from "react";
import { useLocation } from "react-router-dom";

const Search_result = () => {
    const location = useLocation();
    const query_params = new URLSearchParams(location.search);
    const query = query_params.get("query");

    return (
        <div>
            <p>{query}</p>
        </div>
    );
};

export default Search_result;
