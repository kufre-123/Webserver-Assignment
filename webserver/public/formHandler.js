const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const matric = document.getElementById("matric").value;

  const res = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, matric }),
  });

  if (res.ok) {
    alert("Record saved successfully!");
    form.reset();
  }
});
