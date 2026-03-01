// src/api/register.js

export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // ✅ NO TOKEN STORAGE HERE ANYMORE
    return data;

  } catch (error) {
    throw error;
  }
};