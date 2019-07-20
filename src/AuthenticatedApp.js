import React, { useState, useEffect } from "react";
import axios from "axios";

import Signout from "./Signout";

export default function AuthenticatedApp() {
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get("http://localhost:3001/me");
      setName(data.user.name);
    }

    getUser();
  }, []);

  return (
    <div>
      <p>Hello {name}</p>
      <Signout />
    </div>
  );
}
