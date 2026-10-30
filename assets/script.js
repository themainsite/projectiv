(() => {
  "use strict";

  // ==========================================
  // PROJECTIV — MAIN WEBSITE SCRIPT
  // ==========================================

  const $ = id => document.getElementById(id);

  // ==========================================
  // LOCAL STORAGE
  // ==========================================

  const get = key => {
    try {
      return JSON.parse(localStorage.getItem("projectiv_" + key)) ?? null;
    } catch {
      return null;
    }
  };

  const set = (key, value) => {
    try {
      localStorage.setItem("projectiv_" + key, JSON.stringify(value));
    } catch (error) {
      console.warn("Projectiv could not save data:", error);
    }
  };

  // ==========================================
  // THEME SWITCH
  // ==========================================

  const savedTheme = get("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  $("themeBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("light");

    set(
      "theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  $("menuBtn")?.addEventListener("click", () => {
    $("nav")?.classList.toggle("open");
  });

  // ==========================================
  // DASHBOARD STATISTICS
  // ==========================================

  function updateDashboard() {
    const completed = get("completed") || [];
    const points = get("points") || 0;

    // Quiz Arena stores its best percentage separately.
    const arenaBest = Number(localStorage.getItem("projectiv_best") || 0);

    if ($("lessonsDone")) {
      $("lessonsDone").textContent = completed.length;
    }

    if ($("coursesStarted")) {
      $("coursesStarted").textContent =
        new Set(completed.map(id => id.slice(0, 2))).size;
    }

    if ($("quizPoints")) {
      $("quizPoints").textContent = Math.max(points, arenaBest);
    }

    if ($("goalCount")) {
      $("goalCount").textContent = Math.min(completed.length, 3) + "/3";
    }

    const progressTracks = [
      ["htmlProgress", "html"],
      ["cssProgress", "css"],
      ["jsProgress", "js"]
    ];

    progressTracks.forEach(([id, prefix]) => {
      const bar = $(id);

      if (!bar) return;

      const total = completed.filter(item =>
        item.startsWith(prefix)
      ).length;

      bar.style.width = Math.min(total / 2 * 100, 100) + "%";
    });
  }

  updateDashboard();

  // ==========================================
  // LESSON COMPLETION
  // ==========================================

  document.querySelectorAll("[data-lesson]").forEach(card => {
    const id = card.dataset.lesson;
    const button = card.querySelector("button");

    if (!button) return;

    let completed = get("completed") || [];

    if (completed.includes(id)) {
      button.textContent = "✓ Completed";
      button.classList.add("done");
      button.disabled = true;
    }

    button.addEventListener("click", () => {
      completed = get("completed") || [];

      if (!completed.includes(id)) {
        completed.push(id);
        set("completed", completed);
      }

      button.textContent = "✓ Completed";
      button.classList.add("done");
      button.disabled = true;

      updateDashboard();
    });
  });

  // ==========================================
  // COURSE SEARCH
  // ==========================================

  $("courseSearch")?.addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();
    let visible = 0;

    document.querySelectorAll(".course-card").forEach(card => {
      const searchText = (card.dataset.search || card.textContent).toLowerCase();
      const matches = searchText.includes(query);

      card.hidden = !matches;

      if (matches) visible++;
    });

    if ($("noCourses")) {
      $("noCourses").hidden = visible > 0;
    }
  });

  // ==========================================
  // CODE LAB DEFAULT CODE
  // ==========================================

  const htmlDefault = `<h1>Hello, Projectiv!</h1>
<p>I am building my first web page.</p>
<button>Click me</button>`;

  const cssDefault = `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  color: #172033;
}

h1 {
  color: #0d9488;
}

button {
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: #0d9488;
  color: white;
}`;

  // ==========================================
  // CODE LAB PREVIEW
  // ==========================================

  function runCode() {
    const html = $("htmlCode");
    const css = $("cssCode");
    const frame = $("previewFrame");

    if (!html || !css || !frame) return;

    frame.srcdoc = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>${css.value}</style>
</head>
<body>
${html.value}
</body>
</html>`;
  }

  $("runCode")?.addEventListener("click", runCode);

  $("resetCode")?.addEventListener("click", () => {
    if (!$("htmlCode") || !$("cssCode")) return;

    $("htmlCode").value = htmlDefault;
    $("cssCode").value = cssDefault;

    runCode();
  });

  if ($("previewFrame")) {
    runCode();
  }

  // ==========================================
  // QUICK PRACTICE QUIZ
  // ==========================================

  const questions = [
    [
      "Which language gives a web page its structure?",
      ["HTML", "CSS", "JavaScript"],
      0,
      "HTML provides the structure and content of a web page."
    ],
    [
      "Which language is mainly used to style a web page?",
      ["Python", "CSS", "SQL"],
      1,
      "CSS controls colours, spacing, fonts and layout."
    ],
    [
      "Which tag creates the largest standard heading?",
      ["<h6>", "<head>", "<h1>"],
      2,
      "The h1 element is the highest-level heading."
    ],
    [
      "Which CSS property changes text colour?",
      ["font-size", "color", "padding"],
      1,
      "Use the color property to change text colour."
    ],
    [
      "Which symbol starts a single-line JavaScript comment?",
      ["//", "##", "<!--"],
      0,
      "Two forward slashes start a single-line JavaScript comment."
    ],
    [
      "Which HTML element creates a link?",
      ["<img>", "<a>", "<p>"],
      1,
      "The anchor element creates links."
    ]
  ];

  let questionIndex = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    if (!$("question")) return;

    answered = false;

    $("feedback").textContent = "";
    $("nextQuestion").disabled = true;

    $("questionCount").textContent =
      `QUESTION ${questionIndex + 1} OF ${questions.length}`;

    $("quizBar").style.width =
      (questionIndex / questions.length * 100) + "%";

    $("question").textContent = questions[questionIndex][0];
    $("answers").innerHTML = "";

    questions[questionIndex][1].forEach((answer, index) => {
      const button = document.createElement("button");

      button.className = "answer";
      button.textContent = answer;

      button.addEventListener("click", () => {
        chooseAnswer(index, button);
      });

      $("answers").appendChild(button);
    });
  }

  function chooseAnswer(index, selectedButton) {
    if (answered) return;

    answered = true;

    const current = questions[questionIndex];
    const buttons = [...$("answers").children];

    buttons.forEach((button, i) => {
      button.disabled = true;

      if (i === current[2]) {
        button.classList.add("correct");
      }
    });

    if (index === current[2]) {
      score++;
      $("feedback").textContent = "Correct! " + current[3];
    } else {
      selectedButton.classList.add("wrong");
      $("feedback").textContent = "Not quite. " + current[3];
    }

    $("nextQuestion").disabled = false;

    $("nextQuestion").textContent =
      questionIndex === questions.length - 1
        ? "See results →"
        : "Next question →";
  }

  $("nextQuestion")?.addEventListener("click", () => {
    if (!answered) return;

    if (questionIndex < questions.length - 1) {
      questionIndex++;
      renderQuestion();
      return;
    }

    const oldPoints = get("points") || 0;

    set("points", oldPoints + score);

    $("quiz").hidden = true;
    $("quizResult").hidden = false;

    $("finalScore").textContent = score + "/6";

    $("resultMessage").textContent =
      score >= 5
        ? "Excellent work — you are building a strong foundation."
        : score >= 3
          ? "Good effort. Review the lessons and try again."
          : "Keep practising. Every attempt helps you improve.";
  });

  $("retryQuiz")?.addEventListener("click", () => {
    questionIndex = 0;
    score = 0;

    $("quiz").hidden = false;
    $("quizResult").hidden = true;

    renderQuestion();
  });

  renderQuestion();

})();