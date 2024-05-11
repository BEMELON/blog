const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

const convertImage = (theme: "light" | "dark") => {
  const images = document.querySelectorAll('img');
  images.forEach(function(img) {
      if (theme === 'dark') {
          img.src = img.src.replace(/\.light\.png$/, '.dark.png');
      } else {
          img.src = img.src.replace(/\.dark\.png$/, '.light.png');
      }
  });
}

document.addEventListener("nav", () => {
  const switchTheme = (e: Event) => {
    const newTheme = (e.target as HTMLInputElement)?.checked ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    toggleSwitch.checked = e.matches
    emitThemeChangeEvent(newTheme)
  }

  // Darkmode toggle
  const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement
  toggleSwitch.addEventListener("change", switchTheme)
  window.addCleanup(() => toggleSwitch.removeEventListener("change", switchTheme))
  if (currentTheme === "dark") {
    toggleSwitch.checked = true
    convertImage("dark")
  } else {
    convertImage("light")
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})

document.addEventListener("themechange", (e) => {
  convertImage(e.detail.theme)
});

