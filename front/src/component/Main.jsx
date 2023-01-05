import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <Link to="/login">
        <h1>to log in</h1>
      </Link>
      <h1>Main</h1>
    </div>
  );
}
