function setupHomeFilters() {
  const root = document.querySelector<HTMLElement>(".usecase-home")
  if (!root) return

  const groups = Array.from(root.querySelectorAll<HTMLElement>(".filter-group"))
  const tiles = Array.from(root.querySelectorAll<HTMLElement>(".tile"))
  const emptyNote = root.querySelector<HTMLElement>(".tile-empty")
  const active: Record<string, Set<string>> = {}

  for (const group of groups) {
    const key = group.dataset.filterKey
    if (key) active[key] = new Set()
  }

  function applyFilters() {
    let shown = 0
    for (const tile of tiles) {
      const visible = Object.entries(active).every(([key, values]) => {
        if (values.size === 0) return true
        return values.has(tile.dataset[key] ?? "")
      })
      tile.classList.toggle("is-hidden", !visible)
      if (visible) shown++
    }
    if (emptyNote) emptyNote.hidden = shown > 0
  }

  function onPillClick(this: HTMLButtonElement) {
    const group = this.closest<HTMLElement>(".filter-group")
    const key = group?.dataset.filterKey
    const value = this.dataset.value
    if (!group || !key || !value) return

    const allButton = group.querySelector<HTMLButtonElement>('[data-value="all"]')
    const values = active[key]

    if (value === "all") {
      values.clear()
      for (const pill of group.querySelectorAll(".pill")) {
        pill.classList.remove("is-active")
      }
      this.classList.add("is-active")
    } else {
      allButton?.classList.remove("is-active")
      if (values.has(value)) {
        values.delete(value)
        this.classList.remove("is-active")
      } else {
        values.add(value)
        this.classList.add("is-active")
      }
      if (values.size === 0) {
        allButton?.classList.add("is-active")
      }
    }

    applyFilters()
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>(".pill")) {
    button.addEventListener("click", onPillClick)
    window.addCleanup(() => button.removeEventListener("click", onPillClick))
  }
}

document.addEventListener("nav", setupHomeFilters)
