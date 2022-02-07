function toggleDarkMode() {
  if (document.body.classList.contains("dark")) {
    document.body.className = document.body.className.replace("dark", "");
    localStorage.removeItem("theme");
    //document.documentElement.removeAttribute("dark");
  } else {
    document.body.className += "dark";
    localStorage.setItem("theme", "dark");
    //document.documentElement.setAttribute("dark", "");
  }
}
