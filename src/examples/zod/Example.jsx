import React from "react";

export default function ZodExample({ json }) {
  return <div>{json.favoriteNumber.toFixed()}</div>;
}
