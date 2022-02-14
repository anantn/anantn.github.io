function toggleDarkMode() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.removeItem("theme");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

function search(name) {
  var list = new List(name, {
    valueNames: ["list-item", { data: ["categories"] }],
  });

  var element = document.getElementById(name);
  list.on("updated", function () {
    if (list.searched === true || list.filtered === true) {
      element.classList.add("filtered");
    } else {
      element.classList.remove("filtered");
    }
  });

  var buttons = element.querySelectorAll(".pure-button-group > button");
  for (var button of buttons) {
    button.addEventListener("click", function (e) {
      var active = "pure-button-active";
      if (e.target.classList.contains(active)) {
        e.target.classList.remove(active);
        list.filter();
      } else {
        for (var button of buttons) {
          button.classList.remove(active);
        }
        e.target.classList.add(active);
        list.filter(function (item) {
          var check = item.values().categories;
          if (check && check.includes(e.target.innerHTML.toLowerCase())) {
            return true;
          }
          return false;
        });
      }
    });
  }
}
