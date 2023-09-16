"use client";

import React, { useState, useEffect } from "react";

const Snackbar = ({ message, show }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-1/3 rounded-md bg-gray-800 text-white p-4 transition-transform transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
