// src/api/warrantyForm.js

export const createWarrantyClaim = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // assuming token stored after login

    const response = await fetch(
      "http://localhost:5000/api/warranty/create-warranty",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ DO NOT SET Content-Type manually
        },
        body: formData, // must be FormData object
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Claim submission failed");
    }

    return data;

  } catch (error) {
    throw error;
  }
};