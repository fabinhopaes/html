const groups = [
  { name: "Grupo 1", score: 0 },
  { name: "Grupo 2", score: 0 },
  { name: "Grupo 3", score: 0 },
  { name: "Grupo 4", score: 0 },
  { name: "Grupo 5", score: 0 }
];

let currentGroup = 0;
let currentQuestion = null;
let timeLeft = 60;
let timerInterval;

// controle de perguntas usadas
let answeredQuestions = [];

const questions = [
  // FÁCEIS (1–7)
  {
    difficulty: "fácil",
    question: "Qual fase da interfase é responsável pelo crescimento da célula?",
    image: 'img/pergunta1.png',
    answers: ["G1", "S", "G2", "Mitose"],
    correct: 0,
    explanation: "A fase G1 é quando a célula cresce e realiza suas funções."
  },
  {
    difficulty: "fácil",
    question: "Em qual fase ocorre a duplicação do DNA?",
    image: 'img/pergunta2.png',
    answers: ["G1", "S", "G2", "Prófase"],
    correct: 1,
    explanation: "A fase S é responsável pela síntese (duplicação) do DNA."
  },
  {
    difficulty: "fácil",
    question: "Qual fase vem depois da G1?",
    image: 'https://static.todamateria.com.br/upload/in/te/interfase-og.jpg?class=ogImageSquare',
    answers: ["G2", "S", "Mitose", "Citocinese"],
    correct: 1,
    explanation: "A sequência da interfase é G1 → S → G2."
  },
  {
    difficulty: "fácil",
    question: "Qual fase da mitose inicia a divisão celular?",
    image: 'img/pergunta4.png',
    answers: ["Prófase", "Metáfase", "Anáfase", "Telófase"],
    correct: 0,
    explanation: "A prófase é o início da mitose."
  },
  {
    difficulty: "fácil",
    question: "Em qual fase os cromossomos se alinham no centro da célula?",
    image: 'img/pergunta5.png',
    answers: ["Prófase", "Metáfase", "Anáfase", "Telófase"],
    correct: 1,
    explanation: "Na metáfase os cromossomos ficam alinhados no plano equatorial."
  },
  {
    difficulty: "fácil",
    question: "Qual fase separa as cromátides irmãs?",
    image: 'img/pergunta6.png',
    answers: ["Prófase", "Metáfase", "Anáfase", "Telófase"],
    correct: 2,
    explanation: "Na anáfase ocorre a separação das cromátides."
  },
  {
    difficulty: "fácil",
    question: "O que acontece na citocinese?",
    image: 'img/pergunta7.png',
    answers: ["Divisão do núcleo", "Divisão do citoplasma", "Duplicação do DNA", "Alinhamento"],
    correct: 1,
    explanation: "A citocinese divide o citoplasma formando duas células."
  },

  // MÉDIAS (8–14)
  {
    difficulty: "médio",
    question: "Qual é a sequência correta da interfase?",
    image: 'img/pergunta8.png',
    answers: ["G1 → G2 → S", "S → G1 → G2", "G1 → S → G2", "G2 → S → G1"],
    correct: 2,
    explanation: "A ordem correta é G1, depois S e depois G2."
  },
  {
    difficulty: "médio",
    question: "Qual é a sequência correta da mitose?",
    image: 'img/pergunta9.png',
    answers: [
      "Prófase → Metáfase → Anáfase → Telófase",
      "Metáfase → Prófase → Anáfase → Telófase",
      "Anáfase → Prófase → Metáfase → Telófase",
      "Telófase → Prófase → Metáfase → Anáfase"
    ],
    correct: 0,
    explanation: "Essa é a ordem correta da mitose."
  },
  {
    difficulty: "médio",
    question: "O que ocorre na telófase?",
    image: 'img/pergunta10.png',
    answers: [
      "Separação dos cromossomos",
      "Formação de dois núcleos",
      "Alinhamento",
      "Duplicação do DNA"
    ],
    correct: 1,
    explanation: "Na telófase formam-se dois núcleos."
  },
  {
    difficulty: "médio",
    question: "Qual a função da G2?",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5b4RWEPh36zQC_cFoB036astH2M8aJkbHRQ&s',
    answers: [
      "Duplicar DNA",
      "Preparar para divisão",
      "Separar cromossomos",
      "Dividir citoplasma"
    ],
    correct: 1,
    explanation: "A G2 prepara a célula para a divisão."
  },
  {
    difficulty: "médio",
    question: "A mitose gera quantas células?",
    image: 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/bcb55e4be448b1458ded40bee4eca84e.jpg',
    answers: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "A mitose forma duas células idênticas."
  },
  {
    difficulty: "médio",
    question: "Qual fase da meiose reduz o número de cromossomos?",
    image: 'https://s4.static.brasilescola.uol.com.br/be/2020/03/meiose.jpg',
    answers: ["Meiose I", "Meiose II", "Mitose", "G1"],
    correct: 0,
    explanation: "A redução ocorre na meiose I."
  },
  {
    difficulty: "médio",
    question: "Quantas divisões ocorrem na meiose?",
    image: 'https://conhecimentocientifico.r7.com/wp-content/uploads/2020/03/meiose-e-as-suas-fases-2.jpg',
    answers: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "A meiose tem duas divisões: I e II."
  },

  // DIFÍCEIS (15–20)
  {
    difficulty: "difícil",
    question: "O que é crossing over?",
    image: 'https://www.todoestudo.com.br/wp-content/uploads/2022/02/crossing-over-02.png',
    answers: [
      "Divisão celular",
      "Troca de material genético entre cromossomos",
      "Duplicação do DNA",
      "Separação de células"
    ],
    correct: 1,
    explanation: "Crossing over é a troca de segmentos entre cromossomos homólogos."
  },
  {
    difficulty: "difícil",
    question: "Em que fase ocorre o crossing over?",
    image: 'https://cdn.kastatic.org/ka-perseus-images/29b0f1216ee1e2d9834510dc5762934287a41949.png',
    answers: ["Prófase I", "Metáfase I", "Anáfase II", "Telófase"],
    correct: 0,
    explanation: "Ocorre na prófase I da meiose."
  },
  {
    difficulty: "difícil",
    question: "Qual é a função da meiose?",
    image: 'https://blogdoenem.com.br/wp-content/uploads/2019/09/Divis%C3%A3o-celular_-mitose-e-meiose-2.jpg',
    answers: [
      "Crescimento",
      "Produzir células haploides",
      "Reparar tecidos",
      "Duplicar DNA"
    ],
    correct: 1,
    explanation: "A meiose forma células com metade dos cromossomos."
  },
  {
    difficulty: "dificil",
    question: "Quantas células são formadas ao final da meiose?",
    image: 'https://djalmasantos.wordpress.com/wp-content/uploads/2015/08/1.jpg',
    answers: ["2", "3", "4", "8"],
    correct: 2,
    explanation: "A meiose produz 4 células."
  },
  {
    difficulty: "difícil",
    question: "Na meiose II ocorre algo semelhante a qual processo?",
    image: 'https://escolakids.uol.com.br/upload/conteudo/images/2019/02/meiose.jpg',
    answers: ["Interfase", "Mitose", "Citocinese", "G1"],
    correct: 1,
    explanation: "A meiose II é semelhante à mitose."
  },
  {
    difficulty: "difícil",
    question: "Qual fase separa cromossomos homólogos?",
    image: 'https://s5.static.brasilescola.uol.com.br/be/2025/10/mitose-meiose-interfase-cromossomos.webp',
    answers: ["Anáfase I", "Anáfase II", "Metáfase", "G2"],
    correct: 0,
    explanation: "Na anáfase I ocorre a separação dos homólogos."
  }
];

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("menu-screen").classList.remove("hidden");

  answeredQuestions = new Array(questions.length).fill(false);

  loadMenu();
  updateInfo();
}

function startTimer(difficulty) {
  clearInterval(timerInterval);

  // ⏱ tempo por dificuldade COM ACENTO
  if (difficulty === "fácil") timeLeft = 15;
  if (difficulty === "médio") timeLeft = 20;
  if (difficulty === "difícil") timeLeft = 25;

  const timerEl = document.getElementById("timer");
  timerEl.innerText = `⏱ ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱ ${timeLeft}s`;

    if (timeLeft <= 5) {
      timerEl.style.color = "#e74c3c";
    } else if (timeLeft <= 10) {
      timerEl.style.color = "#f1c40f"; // ✔ corrigido
    } else {
      timerEl.style.color = "#27ae60";
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  const q = questions[currentQuestion];

  showFeedback(
    `⏰ Tempo esgotado!<br><br>Resposta: ${q.answers[q.correct]}<br>${q.explanation}`,
    false
  );

  answeredQuestions[currentQuestion] = true;

  // 🔥 MOSTRA botão próxima
  document.getElementById("next-btn").classList.remove("hidden");
}

function openQuestion(index) {
  currentQuestion = index;
  const q = questions[index];

  document.getElementById("menu-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  document.getElementById("question-title").innerText =
    `Pergunta ${index + 1} (${q.difficulty})`;

  document.getElementById("question").innerText = q.question;

  const img = document.getElementById("question-image");

  if (q.image) {
    img.src = q.image;
    img.classList.remove("hidden");
  } else {
    img.classList.add("hidden");
  }

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => checkAnswer(i);
    answersDiv.appendChild(btn);
  });

  document.getElementById("feedback").classList.add("hidden");

  // 🔥 ESCONDE botão próxima
  document.getElementById("next-btn").classList.add("hidden");

  updateInfo();
  startTimer(q.difficulty);
}

function checkAnswer(selected) {
  clearInterval(timerInterval);

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answers button");

  buttons.forEach((btn, i) => {
    if (i === q.correct) {
      btn.classList.add("correct-btn");
    } else if (i === selected) {
      btn.classList.add("wrong-btn");
    }
    btn.disabled = true;
  });

  if (selected === q.correct) {
    const points = getPoints(q.difficulty);
    groups[currentGroup].score += points;

    showFeedback(
      `✅ ${groups[currentGroup].name} ganhou ${points} ponto(s)!`,
      true
    );

    updateInfo();
    showPoints(points);

  } else {
    showFeedback(
      `❌ Resposta correta: ${q.answers[q.correct]}<br>${q.explanation}`,
      false
    );
  }

  answeredQuestions[currentQuestion] = true;

  // 🔥 MOSTRA botão próxima
  document.getElementById("next-btn").classList.remove("hidden");
}

  if (selected === q.correct) {
    const points = getPoints(q.difficulty);
    groups[currentGroup].score += points;

    showFeedback(
      `✅ ${groups[currentGroup].name} ganhou ${points} ponto(s)!`,
      true
    );

    updateInfo();

    const el = document.getElementById(`group-${currentGroup}`);
    if (el) {
      el.classList.add("point-animation");
      setTimeout(() => el.classList.remove("point-animation"), 500);
    }

    showPoints(points);

  } else {
    showFeedback(
      `❌ Resposta correta: ${q.answers[q.correct]}<br>${q.explanation}`,
      false
    );
  }

  answeredQuestions[currentQuestion] = true;


function showFeedback(text, isCorrect) {
  const fb = document.getElementById("feedback");
  fb.innerHTML = text;
  fb.classList.remove("hidden");
  fb.classList.remove("correct", "wrong");
  fb.classList.add(isCorrect ? "correct" : "wrong");
}

function nextTurn() {
  if (answeredQuestions.every(q => q === true)) {
    endGame();
    return;
  }

  currentGroup = (currentGroup + 1) % groups.length;

  backToMenu();
  loadMenu();
  updateInfo();
}

function loadMenu() {
  const list = document.getElementById("question-list");
  list.innerHTML = "";

  questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.innerText = `Pergunta ${index + 1} (${q.difficulty})`;

    if (answeredQuestions[index]) {
      btn.disabled = true;
      btn.style.background = "#bdc3c7";
      btn.innerText += " ✔";
    } else {
      btn.onclick = () => openQuestion(index);
    }

    list.appendChild(btn);
  });
}

function getPoints(difficulty) {
  if (difficulty === "fácil") return 1;
  if (difficulty === "médio") return 2;
  if (difficulty === "difícil") return 3;
}

function updateInfo() {
  const scoreboard = document.getElementById("scoreboard");

  let html = `<h3>🏆 Placar</h3>`;
  html += `<div><strong>Vez:</strong> ${groups[currentGroup].name}</div><br>`;

  groups.forEach((g, index) => {
    let classe = "group-item";
    if (index === currentGroup) classe += " current";

    html += `<div class="${classe}" id="group-${index}">${g.name}: ${g.score} pts</div>`;
  });

  scoreboard.innerHTML = html;

  updateProgress();
}

function updateProgress() {
  const total = questions.length;
  const done = answeredQuestions.filter(q => q).length;
  const percent = (done / total) * 100;

  document.getElementById("progress-bar").style.width = percent + "%";
}

function backToMenu() {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("menu-screen").classList.remove("hidden");
}

function endGame() {
  const ranking = [...groups].sort((a, b) => b.score - a.score);

  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("menu-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  const rankingDiv = document.getElementById("ranking");
  rankingDiv.innerHTML = "";

  ranking.forEach((g, index) => {
    const p = document.createElement("p");
    p.classList.add("medal");

    let medal = "";
    if (index === 0) { medal = "🥇 "; p.classList.add("gold"); }
    else if (index === 1) { medal = "🥈 "; p.classList.add("silver"); }
    else if (index === 2) { medal = "🥉 "; p.classList.add("bronze"); }

    p.innerText = `${medal}${index + 1}º lugar: ${g.name} - ${g.score} pts`;
    rankingDiv.appendChild(p);
  });

  playSound();
  startConfetti();
}

function playSound() {
  document.getElementById("win-sound").play();
}

function startConfetti() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(confetti);
  }
}

function showPoints(points) {
  const el = document.createElement("div");
  el.classList.add("floating-points");
  el.innerText = `+${points}`;
  document.body.appendChild(el);

 
}

