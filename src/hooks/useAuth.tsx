import React from "react";

import { AuthContext } from "@contexts/AuthContext";

export function useAuth () {
    
    const context = React.useContext(AuthContext)

    return context
}
