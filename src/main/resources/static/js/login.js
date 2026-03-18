const form = document.querySelector(".login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();

    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(data));

    // Redirect based on role
    if (data.role === "ADMIN") {
      window.location.href = "/admin-dashboard.html";
    } else {
      window.location.href = "/user-dashboard.html";
    }

  } catch (error) {
    alert(error.message);
  }
});