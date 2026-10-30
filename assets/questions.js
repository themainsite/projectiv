/*
  PROJECTIV QUIZ QUESTION BANK
  Initial collection: 25 questions.
  More questions can be added without changing the quiz engine.
*/

window.PROJECTIV_QUESTIONS = [
  // HTML
  {
    id: "html001",
    topic: "HTML",
    difficulty: "Beginner",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Main Language",
      "Home Tool Markup Language"
    ],
    answer: 0,
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  {
    id: "html002",
    topic: "HTML",
    difficulty: "Beginner",
    question: "Which tag creates a paragraph?",
    options: ["<h1>", "<p>", "<div>", "<br>"],
    answer: 1,
    explanation: "The p tag is used to create paragraphs."
  },
  {
    id: "html003",
    topic: "HTML",
    difficulty: "Beginner",
    question: "Which tag creates the largest heading?",
    options: ["<h6>", "<head>", "<h1>", "<heading>"],
    answer: 2,
    explanation: "The h1 element represents the highest-level heading."
  },
  {
    id: "html004",
    topic: "HTML",
    difficulty: "Beginner",
    question: "Which HTML tag inserts an image?",
    options: ["<picture>", "<img>", "<image>", "<src>"],
    answer: 1,
    explanation: "The img element embeds an image."
  },
  {
    id: "html005",
    topic: "HTML",
    difficulty: "Beginner",
    question: "Which attribute specifies an image's location?",
    options: ["href", "link", "src", "alt"],
    answer: 2,
    explanation: "The src attribute specifies the image source."
  },
  {
    id: "html006",
    topic: "HTML",
    difficulty: "Beginner",
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<url>", "<href>"],
    answer: 0,
    explanation: "The a element creates hyperlinks."
  },

  // CSS
  {
    id: "css001",
    topic: "CSS",
    difficulty: "Beginner",
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Styling System",
      "Colorful Style Syntax"
    ],
    answer: 1,
    explanation: "CSS means Cascading Style Sheets."
  },
  {
    id: "css002",
    topic: "CSS",
    difficulty: "Beginner",
    question: "Which property changes text colour?",
    options: ["font-style", "background", "color", "text-size"],
    answer: 2,
    explanation: "The color property changes text colour."
  },
  {
    id: "css003",
    topic: "CSS",
    difficulty: "Beginner",
    question: "Which symbol selects a class?",
    options: ["#", ".", "*", "$"],
    answer: 1,
    explanation: "A period selects a CSS class."
  },
  {
    id: "css004",
    topic: "CSS",
    difficulty: "Beginner",
    question: "Which property changes an element's background?",
    options: ["background-color", "text-color", "font-size", "border-style"],
    answer: 0,
    explanation: "background-color sets the background colour."
  },
  {
    id: "css005",
    topic: "CSS",
    difficulty: "Beginner",
    question: "Which CSS property controls space inside an element?",
    options: ["margin", "padding", "outline", "gap"],
    answer: 1,
    explanation: "Padding creates space inside an element's border."
  },

  // JAVASCRIPT
  {
    id: "js001",
    topic: "JavaScript",
    difficulty: "Beginner",
    question: "Which keyword declares a variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    answer: 1,
    explanation: "let declares a block-scoped variable that can be reassigned."
  },
  {
    id: "js002",
    topic: "JavaScript",
    difficulty: "Beginner",
    question: "Which symbol is used for a single-line comment?",
    options: ["<!--", "//", "**", "##"],
    answer: 1,
    explanation: "JavaScript uses two forward slashes for single-line comments."
  },
  {
    id: "js003",
    topic: "JavaScript",
    difficulty: "Beginner",
    question: "Which function displays a message in the browser console?",
    options: ["print()", "console.log()", "display()", "message()"],
    answer: 1,
    explanation: "console.log() writes a message to the console."
  },
  {
    id: "js004",
    topic: "JavaScript",
    difficulty: "Beginner",
    question: "Which value represents the absence of an assigned value?",
    options: ["undefined", "zero", "false", "empty"],
    answer: 0,
    explanation: "undefined is the value of a declared variable that has not been assigned."
  },
  {
    id: "js005",
    topic: "JavaScript",
    difficulty: "Beginner",
    question: "Which operator checks strict equality?",
    options: ["=", "==", "===", "!="],
    answer: 2,
    explanation: "=== checks equality without converting the types."
  },

  // JAVA
  {
    id: "java001",
    topic: "Java",
    difficulty: "Beginner",
    question: "Which keyword declares a class in Java?",
    options: ["function", "class", "object", "create"],
    answer: 1,
    explanation: "The class keyword declares a Java class."
  },
  {
    id: "java002",
    topic: "Java",
    difficulty: "Beginner",
    question: "Which method is the usual entry point of a Java application?",
    options: ["start()", "run()", "main()", "begin()"],
    answer: 2,
    explanation: "The main method is the standard entry point."
  },
  {
    id: "java003",
    topic: "Java",
    difficulty: "Beginner",
    question: "Which type stores whole numbers in Java?",
    options: ["String", "int", "boolean", "char"],
    answer: 1,
    explanation: "int stores whole-number values."
  },
  {
    id: "java004",
    topic: "Java",
    difficulty: "Beginner",
    question: "Which keyword creates an object?",
    options: ["this", "new", "class", "make"],
    answer: 1,
    explanation: "The new keyword creates an object."
  },
  {
    id: "java005",
    topic: "Java",
    difficulty: "Beginner",
    question: "Which symbol ends most Java statements?",
    options: [":", ".", ";", ","],
    answer: 2,
    explanation: "Most Java statements end with a semicolon."
  },

  // GENERAL PROGRAMMING
  {
    id: "gen001",
    topic: "General",
    difficulty: "Beginner",
    question: "What is an algorithm?",
    options: [
      "A computer screen",
      "A step-by-step method for solving a problem",
      "A programming language",
      "A storage device"
    ],
    answer: 1,
    explanation: "An algorithm is a sequence of steps used to solve a problem."
  },
  {
    id: "gen002",
    topic: "General",
    difficulty: "Beginner",
    question: "What is a bug in programming?",
    options: [
      "A programming error",
      "A computer mouse",
      "A keyboard shortcut",
      "A type of website"
    ],
    answer: 0,
    explanation: "A bug is an error or flaw in a program."
  },
  {
    id: "gen003",
    topic: "General",
    difficulty: "Beginner",
    question: "What is debugging?",
    options: [
      "Writing music",
      "Finding and fixing program errors",
      "Deleting a website",
      "Installing a keyboard"
    ],
    answer: 1,
    explanation: "Debugging is the process of finding and fixing errors."
  },
  {
    id: "gen004",
    topic: "General",
    difficulty: "Beginner",
    question: "What is a variable?",
    options: [
      "A named storage location for data",
      "A computer monitor",
      "A website address",
      "A type of printer"
    ],
    answer: 0,
    explanation: "A variable stores data that a program can use."
  },
  {
    id: "gen005",
    topic: "General",
    difficulty: "Beginner",
    question: "What is source code?",
    options: [
      "A computer battery",
      "Instructions written by a programmer",
      "An internet connection",
      "A screen resolution"
    ],
    answer: 1,
    explanation: "Source code is the human-readable instructions written in a programming language."
  }
];