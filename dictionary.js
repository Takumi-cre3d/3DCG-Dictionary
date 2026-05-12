
(function () {
  const terms = window.__TERMS__ || [];
  const stages = window.__STAGES__ || [];
  const searchInput = document.getElementById("searchInput");
  const stageFilters = document.getElementById("stageFilters");
  const letterFilters = document.getElementById("letterFilters");
  const termList = document.getElementById("termList");
  const resultCount = document.getElementById("resultCount");
  const activeSummary = document.getElementById("activeSummary");
  const emptyState = document.getElementById("emptyState");

  const params = new URLSearchParams(window.location.search);
  const state = {
    q: params.get("q") || "",
    stage: params.get("stage") || "All",
    initial: params.get("initial") || "All"
  };

  const initials = Array.from(new Set(terms.map((term) => term.initial))).sort();

  function createButton(label, value, kind) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.dataset.value = value;
    button.dataset.kind = kind;
    button.setAttribute("aria-pressed", "false");
    button.textContent = label;
    button.addEventListener("click", () => {
      state[kind] = value;
      render();
    });
    return button;
  }

  function renderButtons(container, items, kind, formatter) {
    container.innerHTML = "";
    container.appendChild(createButton("All", "All", kind));
    items.forEach((item) => {
      container.appendChild(createButton(formatter ? formatter(item) : item, item, kind));
    });
  }

  function updatePressedStates() {
    document.querySelectorAll(".filter-button").forEach((button) => {
      const kind = button.dataset.kind;
      const value = button.dataset.value;
      button.setAttribute("aria-pressed", state[kind] === value ? "true" : "false");
    });
  }

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function matches(term) {
    const q = normalize(state.q).trim();
    const haystack = [
      term.en,
      term.ja,
      term.stage,
      term.stage_ja,
      term.summary_en,
      term.summary_ja,
      term.definition_en,
      term.definition_ja,
      ...(term.keywords || [])
    ].map(normalize).join(" ");

    const qOk = !q || haystack.includes(q);
    const stageOk = state.stage === "All" || term.stage === state.stage;
    const initialOk = state.initial === "All" || term.initial === state.initial;
    return qOk && stageOk && initialOk;
  }

  function summaryText(filtered) {
    const parts = [];
    parts.push(state.stage === "All" ? "All workflow sections" : state.stage);
    parts.push(state.initial === "All" ? "All initials" : "Initial " + state.initial);
    parts.push(state.q ? `Keyword “${state.q}”` : "No keyword filter");
    return parts.join(" / ");
  }

  function updateURL() {
    const next = new URLSearchParams();
    if (state.q) next.set("q", state.q);
    if (state.stage !== "All") next.set("stage", state.stage);
    if (state.initial !== "All") next.set("initial", state.initial);
    const query = next.toString();
    const nextURL = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, "", nextURL);
  }

  function renderList(filtered) {
    termList.innerHTML = "";
    emptyState.hidden = filtered.length !== 0;
    filtered.forEach((term) => {
      const row = document.createElement("a");
      row.className = "term-row";
      row.href = `terms/${term.slug}.html`;
      row.innerHTML = `
        <div class="term-row__initial">${term.initial}</div>
        <div class="term-row__title">
          <strong>${term.en}</strong>
          <span>${term.ja}</span>
        </div>
        <p class="term-row__summary">${term.summary_ja}</p>
        <div class="term-row__stage">${term.stage_ja}</div>
      `;
      termList.appendChild(row);
    });
  }

  function render() {
    const filtered = terms.filter(matches).sort((a, b) => a.en.localeCompare(b.en, undefined, { numeric: true, sensitivity: 'base' }));
    renderList(filtered);
    resultCount.textContent = `${filtered.length} entries`;
    activeSummary.textContent = summaryText(filtered);
    updatePressedStates();
    updateURL();
  }

  renderButtons(stageFilters, stages, "stage");
  renderButtons(letterFilters, initials, "initial");
  searchInput.value = state.q;
  searchInput.addEventListener("input", (event) => {
    state.q = event.target.value;
    render();
  });

  render();
})();
