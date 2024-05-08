
import React from "react";

export function kalendoriusLayout({ children, addDarboBilietasForma }: { children: React.ReactNode; addDarboBilietasForma: React.ReactNode }) {
  const someProps = {}; // Define someProps variable
  return (
    <div className="flex">
      <div className="w-2/3">{children}</div>
      <div className="w-1/3">
        {addDarboBilietasForma}
      </div>
    </div>
  );
}

export default kalendoriusLayout;
