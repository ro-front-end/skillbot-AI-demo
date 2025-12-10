const mongoose = require("mongoose");
require("dotenv").config();

const Theme = require("../models/Theme");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/skillbot"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Theme.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});

    // Create themes
    const themes = await Theme.insertMany([
      // Programming family
      {
        name: "Programming",
        description: "Core programming concepts across languages",
        icon: "💻",
        color: "#06b6d4",
      },
      {
        name: "Web Development",
        description: "Master HTML, CSS, and JavaScript",
        icon: "🌐",
        color: "#06b6d4",
      },
      {
        name: "Python Basics",
        description: "Learn Python programming fundamentals",
        icon: "🐍",
        color: "#3b82f6",
      },
      {
        name: "React Mastery",
        description: "Advanced React concepts and patterns",
        icon: "⚛️",
        color: "#61dafb",
      },
      {
        name: "Database Design",
        description: "SQL and NoSQL database fundamentals",
        icon: "🗄️",
        color: "#10b981",
      },
      {
        name: "DevOps Essentials",
        description: "Docker, Kubernetes, and CI/CD pipelines",
        icon: "🚀",
        color: "#f59e0b",
      },
      // New subject areas
      {
        name: "Art",
        description: "Art history, techniques, and famous works",
        icon: "🎨",
        color: "#ef476f",
      },
      {
        name: "Biology",
        description: "Fundamentals of life sciences and organisms",
        icon: "🧬",
        color: "#06d6a0",
      },
      {
        name: "World Capitals",
        description: "Geography and capitals of the world",
        icon: "🗺️",
        color: "#ffd166",
      },
    ]);

    console.log("✅ Themes created");

    // Create quizzes and questions for each theme
    const quizzesData = [
      {
        theme: themes[0],
        quizzes: [
          {
            title: "HTML Basics Quiz",
            description: "Test your HTML knowledge",
            difficulty: "easy",
            questions: [
              {
                text: "What does HTML stand for?",
                type: "multiple",
                options: [
                  {
                    id: "a",
                    text: "HyperText Markup Language",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "High Tech Modern Language",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Home Tool Markup Language",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Hyperlinks and Text Markup Language",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which tag is used to create a hyperlink?",
                type: "multiple",
                options: [
                  { id: "a", text: "<link>", isCorrect: false },
                  { id: "b", text: "<a>", isCorrect: true },
                  { id: "c", text: "<href>", isCorrect: false },
                  { id: "d", text: "<url>", isCorrect: false },
                ],
              },
              {
                text: "HTML5 is the latest version of HTML",
                type: "true-false",
                options: [
                  { id: "true", text: "True", isCorrect: true },
                  { id: "false", text: "False", isCorrect: false },
                ],
              },
            ],
          },
          {
            title: "CSS Styling Quiz",
            description: "Test your CSS knowledge",
            difficulty: "medium",
            questions: [
              {
                text: "What property is used to change the text color?",
                type: "multiple",
                options: [
                  { id: "a", text: "text-color", isCorrect: false },
                  { id: "b", text: "color", isCorrect: true },
                  { id: "c", text: "font-color", isCorrect: false },
                  { id: "d", text: "text-style", isCorrect: false },
                ],
              },
              {
                text: "Which CSS selector has the highest specificity?",
                type: "multiple",
                options: [
                  { id: "a", text: "Element selector", isCorrect: false },
                  { id: "b", text: "Class selector", isCorrect: false },
                  { id: "c", text: "ID selector", isCorrect: true },
                  { id: "d", text: "Universal selector", isCorrect: false },
                ],
              },
            ],
          },
        ],
      },
      {
        theme: themes[1],
        quizzes: [
          {
            title: "Python Fundamentals",
            description: "Basic Python programming",
            difficulty: "easy",
            questions: [
              {
                text: "What is the correct syntax for creating a list in Python?",
                type: "multiple",
                options: [
                  { id: "a", text: "list = (1, 2, 3)", isCorrect: false },
                  { id: "b", text: "list = [1, 2, 3]", isCorrect: true },
                  { id: "c", text: "list = {1, 2, 3}", isCorrect: false },
                  { id: "d", text: "list = <1, 2, 3>", isCorrect: false },
                ],
              },
              {
                text: "Which keyword is used to create a function in Python?",
                type: "multiple",
                options: [
                  { id: "a", text: "func", isCorrect: false },
                  { id: "b", text: "function", isCorrect: false },
                  { id: "c", text: "def", isCorrect: true },
                  { id: "d", text: "define", isCorrect: false },
                ],
              },
            ],
          },
          {
            title: "Python Advanced",
            description: "Advanced Python concepts",
            difficulty: "hard",
            questions: [
              {
                text: "What is a decorator in Python?",
                type: "multiple",
                options: [
                  {
                    id: "a",
                    text: "A function that modifies a function or class",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "A variable that stores functions",
                    isCorrect: false,
                  },
                  { id: "c", text: "A type of loop", isCorrect: false },
                  {
                    id: "d",
                    text: "A way to import modules",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        theme: themes[2],
        quizzes: [
          {
            title: "React Components",
            description: "React component concepts",
            difficulty: "medium",
            questions: [
              {
                text: "What is the difference between functional and class components?",
                type: "multiple",
                options: [
                  {
                    id: "a",
                    text: "Functional components use JSX",
                    isCorrect: false,
                  },
                  {
                    id: "b",
                    text: "Class components are older and use lifecycle methods",
                    isCorrect: true,
                  },
                  { id: "c", text: "No difference", isCorrect: false },
                  {
                    id: "d",
                    text: "Functional components cannot be reused",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "What hook is used to manage state in functional components?",
                type: "multiple",
                options: [
                  { id: "a", text: "useContext", isCorrect: false },
                  { id: "b", text: "useState", isCorrect: true },
                  { id: "c", text: "useReducer", isCorrect: false },
                  { id: "d", text: "useCallback", isCorrect: false },
                ],
              },
            ],
          },
        ],
      },
      {
        theme: themes[3],
        quizzes: [
          {
            title: "SQL Basics",
            description: "Learn SQL fundamentals",
            difficulty: "easy",
            questions: [
              {
                text: "Which keyword is used to retrieve data from a database?",
                type: "multiple",
                options: [
                  { id: "a", text: "GET", isCorrect: false },
                  { id: "b", text: "SELECT", isCorrect: true },
                  { id: "c", text: "FETCH", isCorrect: false },
                  { id: "d", text: "RETRIEVE", isCorrect: false },
                ],
              },
              {
                text: "What is a primary key in a database?",
                type: "multiple",
                options: [
                  {
                    id: "a",
                    text: "A key that opens the database",
                    isCorrect: false,
                  },
                  {
                    id: "b",
                    text: "A unique identifier for a record",
                    isCorrect: true,
                  },
                  { id: "c", text: "A password", isCorrect: false },
                  { id: "d", text: "A type of encryption", isCorrect: false },
                ],
              },
            ],
          },
        ],
      },
      {
        theme: themes[4],
        quizzes: [
          {
            title: "Docker Basics",
            description: "Introduction to Docker",
            difficulty: "medium",
            questions: [
              {
                text: "What is a Docker container?",
                type: "multiple",
                options: [
                  {
                    id: "a",
                    text: "A lightweight virtualized environment",
                    isCorrect: true,
                  },
                  { id: "b", text: "A storage unit", isCorrect: false },
                  { id: "c", text: "A network protocol", isCorrect: false },
                  { id: "d", text: "A type of database", isCorrect: false },
                ],
              },
              {
                text: "Docker requires a hypervisor",
                type: "true-false",
                options: [
                  { id: "true", text: "True", isCorrect: false },
                  { id: "false", text: "False", isCorrect: true },
                ],
              },
            ],
          },
        ],
      },
    ];

    // For each theme create three quizzes: easy, medium, hard — each with 5 questions
    const difficulties = [
      { key: "easy", passingScore: 70, timeLimit: 300 },
      { key: "medium", passingScore: 80, timeLimit: 420 },
      { key: "hard", passingScore: 90, timeLimit: 600 },
    ];

    for (const theme of themes) {
      for (const d of difficulties) {
        const quiz = await Quiz.create({
          title: `${theme.name} — ${
            d.key.charAt(0).toUpperCase() + d.key.slice(1)
          } Quiz`,
          description: `A ${d.key} set of questions for ${theme.name}`,
          themeId: theme._id,
          totalQuestions: 5,
          difficulty: d.key,
          timeLimit: d.timeLimit,
          passingScore: d.passingScore,
        });

        // Curated question banks per theme and difficulty
        const curated = {
                    "Art": {
                                  medium: [
                                    {
                                      text: "Which artist is known for the painting 'The Persistence of Memory'?",
                                      options: [
                                        { id: "a", text: "Salvador Dalí", isCorrect: true },
                                        { id: "b", text: "Henri Matisse", isCorrect: false },
                                        { id: "c", text: "Jackson Pollock", isCorrect: false },
                                        { id: "d", text: "Edvard Munch", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which period is Michelangelo associated with?",
                                      options: [
                                        { id: "a", text: "Renaissance", isCorrect: true },
                                        { id: "b", text: "Baroque", isCorrect: false },
                                        { id: "c", text: "Modernism", isCorrect: false },
                                        { id: "d", text: "Romanticism", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which artist is famous for the 'Campbell's Soup Cans' series?",
                                      options: [
                                        { id: "a", text: "Andy Warhol", isCorrect: true },
                                        { id: "b", text: "Roy Lichtenstein", isCorrect: false },
                                        { id: "c", text: "Keith Haring", isCorrect: false },
                                        { id: "d", text: "Jean-Michel Basquiat", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which technique uses small dots of color to create an image?",
                                      options: [
                                        { id: "a", text: "Pointillism", isCorrect: true },
                                        { id: "b", text: "Cubism", isCorrect: false },
                                        { id: "c", text: "Fresco", isCorrect: false },
                                        { id: "d", text: "Sfumato", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Who painted the ceiling of the Sistine Chapel?",
                                      options: [
                                        { id: "a", text: "Michelangelo", isCorrect: true },
                                        { id: "b", text: "Raphael", isCorrect: false },
                                        { id: "c", text: "Donatello", isCorrect: false },
                                        { id: "d", text: "Caravaggio", isCorrect: false },
                                      ],
                                    },
                                  ],
                                  hard: [
                                    {
                                      text: "Which artist is credited with inventing linear perspective?",
                                      options: [
                                        { id: "a", text: "Filippo Brunelleschi", isCorrect: true },
                                        { id: "b", text: "Leonardo da Vinci", isCorrect: false },
                                        { id: "c", text: "Albrecht Dürer", isCorrect: false },
                                        { id: "d", text: "Sandro Botticelli", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which painting technique involves applying paint thickly so that brush or palette knife marks are visible?",
                                      options: [
                                        { id: "a", text: "Impasto", isCorrect: true },
                                        { id: "b", text: "Glazing", isCorrect: false },
                                        { id: "c", text: "Sgraffito", isCorrect: false },
                                        { id: "d", text: "Encaustic", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which artist is known for the mural 'Guernica'?",
                                      options: [
                                        { id: "a", text: "Pablo Picasso", isCorrect: true },
                                        { id: "b", text: "Diego Rivera", isCorrect: false },
                                        { id: "c", text: "Joan Miró", isCorrect: false },
                                        { id: "d", text: "Henri Rousseau", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which movement is Kazimir Malevich associated with?",
                                      options: [
                                        { id: "a", text: "Suprematism", isCorrect: true },
                                        { id: "b", text: "Futurism", isCorrect: false },
                                        { id: "c", text: "Dadaism", isCorrect: false },
                                        { id: "d", text: "Constructivism", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which artist created the sculpture 'David'?",
                                      options: [
                                        { id: "a", text: "Michelangelo", isCorrect: true },
                                        { id: "b", text: "Gian Lorenzo Bernini", isCorrect: false },
                                        { id: "c", text: "Donatello", isCorrect: false },
                                        { id: "d", text: "Auguste Rodin", isCorrect: false },
                                      ],
                                    },
                                  ],
                      easy: [
                        {
                          text: "Who painted the Mona Lisa?",
                          options: [
                            { id: "a", text: "Leonardo da Vinci", isCorrect: true },
                            { id: "b", text: "Vincent van Gogh", isCorrect: false },
                            { id: "c", text: "Pablo Picasso", isCorrect: false },
                            { id: "d", text: "Claude Monet", isCorrect: false },
                          ],
                        },
                        {
                          text: "Which art movement is Salvador Dalí associated with?",
                          options: [
                            { id: "a", text: "Surrealism", isCorrect: true },
                            { id: "b", text: "Impressionism", isCorrect: false },
                            { id: "c", text: "Cubism", isCorrect: false },
                            { id: "d", text: "Baroque", isCorrect: false },
                          ],
                        },
                        {
                          text: "What is the primary medium of sculpture?",
                          options: [
                            { id: "a", text: "Clay, stone, or metal", isCorrect: true },
                            { id: "b", text: "Watercolor", isCorrect: false },
                            { id: "c", text: "Acrylic", isCorrect: false },
                            { id: "d", text: "Charcoal", isCorrect: false },
                          ],
                        },
                        {
                          text: "Which artist is famous for cutting off his own ear?",
                          options: [
                            { id: "a", text: "Vincent van Gogh", isCorrect: true },
                            { id: "b", text: "Michelangelo", isCorrect: false },
                            { id: "c", text: "Rembrandt", isCorrect: false },
                            { id: "d", text: "Andy Warhol", isCorrect: false },
                          ],
                        },
                        {
                          text: "The Starry Night is a painting by which artist?",
                          options: [
                            { id: "a", text: "Vincent van Gogh", isCorrect: true },
                            { id: "b", text: "Claude Monet", isCorrect: false },
                            { id: "c", text: "Edvard Munch", isCorrect: false },
                            { id: "d", text: "Paul Cézanne", isCorrect: false },
                          ],
                        },
                      ],
                    },
                    "Biology": {
                                  medium: [
                                    {
                                      text: "What is the genetic material in most living organisms?",
                                      options: [
                                        { id: "a", text: "DNA", isCorrect: true },
                                        { id: "b", text: "RNA", isCorrect: false },
                                        { id: "c", text: "Protein", isCorrect: false },
                                        { id: "d", text: "Lipid", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which process produces gametes?",
                                      options: [
                                        { id: "a", text: "Meiosis", isCorrect: true },
                                        { id: "b", text: "Mitosis", isCorrect: false },
                                        { id: "c", text: "Fertilization", isCorrect: false },
                                        { id: "d", text: "Replication", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which kingdom do mushrooms belong to?",
                                      options: [
                                        { id: "a", text: "Fungi", isCorrect: true },
                                        { id: "b", text: "Plantae", isCorrect: false },
                                        { id: "c", text: "Animalia", isCorrect: false },
                                        { id: "d", text: "Protista", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the main function of red blood cells?",
                                      options: [
                                        { id: "a", text: "Transport oxygen", isCorrect: true },
                                        { id: "b", text: "Fight infection", isCorrect: false },
                                        { id: "c", text: "Clot blood", isCorrect: false },
                                        { id: "d", text: "Produce hormones", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which organ system includes the brain and spinal cord?",
                                      options: [
                                        { id: "a", text: "Nervous system", isCorrect: true },
                                        { id: "b", text: "Digestive system", isCorrect: false },
                                        { id: "c", text: "Respiratory system", isCorrect: false },
                                        { id: "d", text: "Circulatory system", isCorrect: false },
                                      ],
                                    },
                                  ],
                                  hard: [
                                    {
                                      text: "What is the powerhouse of the cell?",
                                      options: [
                                        { id: "a", text: "Mitochondria", isCorrect: true },
                                        { id: "b", text: "Nucleus", isCorrect: false },
                                        { id: "c", text: "Ribosome", isCorrect: false },
                                        { id: "d", text: "Golgi apparatus", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which molecule carries genetic instructions from DNA to the ribosome?",
                                      options: [
                                        { id: "a", text: "mRNA", isCorrect: true },
                                        { id: "b", text: "tRNA", isCorrect: false },
                                        { id: "c", text: "rRNA", isCorrect: false },
                                        { id: "d", text: "DNA polymerase", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the process by which plants lose water vapor through their leaves?",
                                      options: [
                                        { id: "a", text: "Transpiration", isCorrect: true },
                                        { id: "b", text: "Respiration", isCorrect: false },
                                        { id: "c", text: "Photosynthesis", isCorrect: false },
                                        { id: "d", text: "Germination", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "Which scientist is known as the father of modern genetics?",
                                      options: [
                                        { id: "a", text: "Gregor Mendel", isCorrect: true },
                                        { id: "b", text: "Charles Darwin", isCorrect: false },
                                        { id: "c", text: "Louis Pasteur", isCorrect: false },
                                        { id: "d", text: "James Watson", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the largest organ in the human body?",
                                      options: [
                                        { id: "a", text: "Skin", isCorrect: true },
                                        { id: "b", text: "Liver", isCorrect: false },
                                        { id: "c", text: "Lung", isCorrect: false },
                                        { id: "d", text: "Heart", isCorrect: false },
                                      ],
                                    },
                                  ],
                      easy: [
                        {
                          text: "What is the basic unit of life?",
                          options: [
                            { id: "a", text: "Cell", isCorrect: true },
                            { id: "b", text: "Atom", isCorrect: false },
                            { id: "c", text: "Molecule", isCorrect: false },
                            { id: "d", text: "Organ", isCorrect: false },
                          ],
                        },
                        {
                          text: "Which organ pumps blood throughout the body?",
                          options: [
                            { id: "a", text: "Heart", isCorrect: true },
                            { id: "b", text: "Liver", isCorrect: false },
                            { id: "c", text: "Lung", isCorrect: false },
                            { id: "d", text: "Kidney", isCorrect: false },
                          ],
                        },
                        {
                          text: "What gas do plants absorb from the atmosphere?",
                          options: [
                            { id: "a", text: "Carbon dioxide", isCorrect: true },
                            { id: "b", text: "Oxygen", isCorrect: false },
                            { id: "c", text: "Nitrogen", isCorrect: false },
                            { id: "d", text: "Hydrogen", isCorrect: false },
                          ],
                        },
                        {
                          text: "Which organelle is known as the powerhouse of the cell?",
                          options: [
                            { id: "a", text: "Mitochondria", isCorrect: true },
                            { id: "b", text: "Nucleus", isCorrect: false },
                            { id: "c", text: "Ribosome", isCorrect: false },
                            { id: "d", text: "Chloroplast", isCorrect: false },
                          ],
                        },
                        {
                          text: "What is the process by which plants make their food?",
                          options: [
                            { id: "a", text: "Photosynthesis", isCorrect: true },
                            { id: "b", text: "Respiration", isCorrect: false },
                            { id: "c", text: "Digestion", isCorrect: false },
                            { id: "d", text: "Fermentation", isCorrect: false },
                          ],
                        },
                      ],
                    },
                    "World Capitals": {
                                  medium: [
                                    {
                                      text: "What is the capital of Egypt?",
                                      options: [
                                        { id: "a", text: "Cairo", isCorrect: true },
                                        { id: "b", text: "Alexandria", isCorrect: false },
                                        { id: "c", text: "Giza", isCorrect: false },
                                        { id: "d", text: "Luxor", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of South Africa?",
                                      options: [
                                        { id: "a", text: "Pretoria", isCorrect: true },
                                        { id: "b", text: "Cape Town", isCorrect: false },
                                        { id: "c", text: "Johannesburg", isCorrect: false },
                                        { id: "d", text: "Durban", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of Turkey?",
                                      options: [
                                        { id: "a", text: "Ankara", isCorrect: true },
                                        { id: "b", text: "Istanbul", isCorrect: false },
                                        { id: "c", text: "Izmir", isCorrect: false },
                                        { id: "d", text: "Antalya", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of India?",
                                      options: [
                                        { id: "a", text: "New Delhi", isCorrect: true },
                                        { id: "b", text: "Mumbai", isCorrect: false },
                                        { id: "c", text: "Bangalore", isCorrect: false },
                                        { id: "d", text: "Chennai", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of Russia?",
                                      options: [
                                        { id: "a", text: "Moscow", isCorrect: true },
                                        { id: "b", text: "Saint Petersburg", isCorrect: false },
                                        { id: "c", text: "Kazan", isCorrect: false },
                                        { id: "d", text: "Sochi", isCorrect: false },
                                      ],
                                    },
                                  ],
                                  hard: [
                                    {
                                      text: "What is the capital of Kazakhstan?",
                                      options: [
                                        { id: "a", text: "Astana (Nur-Sultan)", isCorrect: true },
                                        { id: "b", text: "Almaty", isCorrect: false },
                                        { id: "c", text: "Shymkent", isCorrect: false },
                                        { id: "d", text: "Aktobe", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of New Zealand?",
                                      options: [
                                        { id: "a", text: "Wellington", isCorrect: true },
                                        { id: "b", text: "Auckland", isCorrect: false },
                                        { id: "c", text: "Christchurch", isCorrect: false },
                                        { id: "d", text: "Hamilton", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of Nigeria?",
                                      options: [
                                        { id: "a", text: "Abuja", isCorrect: true },
                                        { id: "b", text: "Lagos", isCorrect: false },
                                        { id: "c", text: "Kano", isCorrect: false },
                                        { id: "d", text: "Ibadan", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of Switzerland?",
                                      options: [
                                        { id: "a", text: "Bern", isCorrect: true },
                                        { id: "b", text: "Zurich", isCorrect: false },
                                        { id: "c", text: "Geneva", isCorrect: false },
                                        { id: "d", text: "Basel", isCorrect: false },
                                      ],
                                    },
                                    {
                                      text: "What is the capital of Saudi Arabia?",
                                      options: [
                                        { id: "a", text: "Riyadh", isCorrect: true },
                                        { id: "b", text: "Jeddah", isCorrect: false },
                                        { id: "c", text: "Mecca", isCorrect: false },
                                        { id: "d", text: "Dammam", isCorrect: false },
                                      ],
                                    },
                                  ],
                      easy: [
                        {
                          text: "What is the capital of France?",
                          options: [
                            { id: "a", text: "Paris", isCorrect: true },
                            { id: "b", text: "Rome", isCorrect: false },
                            { id: "c", text: "Berlin", isCorrect: false },
                            { id: "d", text: "Madrid", isCorrect: false },
                          ],
                        },
                        {
                          text: "What is the capital of Japan?",
                          options: [
                            { id: "a", text: "Tokyo", isCorrect: true },
                            { id: "b", text: "Beijing", isCorrect: false },
                            { id: "c", text: "Seoul", isCorrect: false },
                            { id: "d", text: "Bangkok", isCorrect: false },
                          ],
                        },
                        {
                          text: "What is the capital of Australia?",
                          options: [
                            { id: "a", text: "Canberra", isCorrect: true },
                            { id: "b", text: "Sydney", isCorrect: false },
                            { id: "c", text: "Melbourne", isCorrect: false },
                            { id: "d", text: "Brisbane", isCorrect: false },
                          ],
                        },
                        {
                          text: "What is the capital of Canada?",
                          options: [
                            { id: "a", text: "Ottawa", isCorrect: true },
                            { id: "b", text: "Toronto", isCorrect: false },
                            { id: "c", text: "Vancouver", isCorrect: false },
                            { id: "d", text: "Montreal", isCorrect: false },
                          ],
                        },
                        {
                          text: "What is the capital of Brazil?",
                          options: [
                            { id: "a", text: "Brasília", isCorrect: true },
                            { id: "b", text: "Rio de Janeiro", isCorrect: false },
                            { id: "c", text: "São Paulo", isCorrect: false },
                            { id: "d", text: "Salvador", isCorrect: false },
                          ],
                        },
                      ],
                    },
          "Web Development": {
            easy: [
              {
                text: "Which HTML element is used to define the main heading of a page?",
                options: [
                  { id: "a", text: "<h1>", isCorrect: true },
                  { id: "b", text: "<head>", isCorrect: false },
                  { id: "c", text: "<header>", isCorrect: false },
                  { id: "d", text: "<title>", isCorrect: false },
                ],
              },
              {
                text: "Which CSS property controls the space between lines of text?",
                options: [
                  { id: "a", text: "letter-spacing", isCorrect: false },
                  { id: "b", text: "line-height", isCorrect: true },
                  { id: "c", text: "text-spacing", isCorrect: false },
                  { id: "d", text: "word-spacing", isCorrect: false },
                ],
              },
              {
                text: "Which JavaScript keyword declares a block-scoped variable?",
                options: [
                  { id: "a", text: "var", isCorrect: false },
                  { id: "b", text: "let", isCorrect: true },
                  { id: "c", text: "consts", isCorrect: false },
                  { id: "d", text: "define", isCorrect: false },
                ],
              },
              {
                text: "What does CSS stand for?",
                options: [
                  { id: "a", text: "Cascading Style Sheets", isCorrect: true },
                  { id: "b", text: "Computer Style Sheets", isCorrect: false },
                  { id: "c", text: "Creative Style Syntax", isCorrect: false },
                  { id: "d", text: "Coded Style Structure", isCorrect: false },
                ],
              },
              {
                text: "Which attribute is used to provide alternative text for an image in HTML?",
                options: [
                  { id: "a", text: "alt", isCorrect: true },
                  { id: "b", text: "title", isCorrect: false },
                  { id: "c", text: "src", isCorrect: false },
                  { id: "d", text: "caption", isCorrect: false },
                ],
              },
            ],
            medium: [
              {
                text: "Which HTTP method is typically used to update a resource partially?",
                options: [
                  { id: "a", text: "POST", isCorrect: false },
                  { id: "b", text: "PUT", isCorrect: false },
                  { id: "c", text: "PATCH", isCorrect: true },
                  { id: "d", text: "GET", isCorrect: false },
                ],
              },
              {
                text: "Which tool helps you inspect and debug CSS rules in the browser?",
                options: [
                  { id: "a", text: "DevTools", isCorrect: true },
                  { id: "b", text: "Terminal", isCorrect: false },
                  { id: "c", text: "Package.json", isCorrect: false },
                  { id: "d", text: "Babel", isCorrect: false },
                ],
              },
              {
                text: "In JavaScript, which method converts a JSON string into an object?",
                options: [
                  { id: "a", text: "JSON.stringify()", isCorrect: false },
                  { id: "b", text: "JSON.parse()", isCorrect: true },
                  { id: "c", text: "JSON.object()", isCorrect: false },
                  { id: "d", text: "JSON.toObject()", isCorrect: false },
                ],
              },
              {
                text: "Which meta tag helps set the viewport for responsive design?",
                options: [
                  {
                    id: "a",
                    text: '<meta name="viewport" content="width=device-width, initial-scale=1">',
                    isCorrect: true,
                  },
                  { id: "b", text: '<meta charset="utf-8">', isCorrect: false },
                  {
                    id: "c",
                    text: '<meta name="description">',
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: '<link rel="stylesheet">',
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which of these is a semantic HTML element?",
                options: [
                  { id: "a", text: "<div>", isCorrect: false },
                  { id: "b", text: "<span>", isCorrect: false },
                  { id: "c", text: "<article>", isCorrect: true },
                  { id: "d", text: "<generic>", isCorrect: false },
                ],
              },
            ],
            hard: [
              {
                text: "Which performance technique reduces render-blocking CSS?",
                options: [
                  { id: "a", text: "Inlining critical CSS", isCorrect: true },
                  { id: "b", text: "Adding more scripts", isCorrect: false },
                  {
                    id: "c",
                    text: "Using many external fonts",
                    isCorrect: false,
                  },
                  { id: "d", text: "Disabling caching", isCorrect: false },
                ],
              },
              {
                text: "What is the purpose of a Content Security Policy (CSP)?",
                options: [
                  {
                    id: "a",
                    text: "Prevent cross-site scripting and related attacks",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Encrypt network traffic",
                    isCorrect: false,
                  },
                  { id: "c", text: "Compress assets", isCorrect: false },
                  {
                    id: "d",
                    text: "Generate SSL certificates",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which HTTP status code indicates a resource was not found?",
                options: [
                  { id: "a", text: "200", isCorrect: false },
                  { id: "b", text: "301", isCorrect: false },
                  { id: "c", text: "404", isCorrect: true },
                  { id: "d", text: "500", isCorrect: false },
                ],
              },
              {
                text: "Which technique improves perceived load time by showing placeholders?",
                options: [
                  { id: "a", text: "Skeleton screens", isCorrect: true },
                  { id: "b", text: "Modal popups", isCorrect: false },
                  { id: "c", text: "Infinite loops", isCorrect: false },
                  { id: "d", text: "Blocking rendering", isCorrect: false },
                ],
              },
              {
                text: "Which header helps prevent MIME type sniffing?",
                options: [
                  { id: "a", text: "X-Frame-Options", isCorrect: false },
                  {
                    id: "b",
                    text: "X-Content-Type-Options: nosniff",
                    isCorrect: true,
                  },
                  {
                    id: "c",
                    text: "Strict-Transport-Security",
                    isCorrect: false,
                  },
                  { id: "d", text: "Referrer-Policy", isCorrect: false },
                ],
              },
            ],
          },
          "Python Basics": {
            easy: [
              {
                text: "How do you create a comment in Python?",
                options: [
                  { id: "a", text: "// comment", isCorrect: false },
                  { id: "b", text: "# comment", isCorrect: true },
                  { id: "c", text: "/* comment */", isCorrect: false },
                  { id: "d", text: "<!-- comment -->", isCorrect: false },
                ],
              },
              {
                text: "Which data type is immutable in Python?",
                options: [
                  { id: "a", text: "list", isCorrect: false },
                  { id: "b", text: "dict", isCorrect: false },
                  { id: "c", text: "tuple", isCorrect: true },
                  { id: "d", text: "set", isCorrect: false },
                ],
              },
              {
                text: "Which symbol is used to denote a Python list?",
                options: [
                  { id: "a", text: "()", isCorrect: false },
                  { id: "b", text: "[]", isCorrect: true },
                  { id: "c", text: "{}", isCorrect: false },
                  { id: "d", text: "<>", isCorrect: false },
                ],
              },
              {
                text: "What keyword starts a function definition in Python?",
                options: [
                  { id: "a", text: "function", isCorrect: false },
                  { id: "b", text: "def", isCorrect: true },
                  { id: "c", text: "fun", isCorrect: false },
                  { id: "d", text: "lambda", isCorrect: false },
                ],
              },
              {
                text: "Which built-in function returns the length of an object?",
                options: [
                  { id: "a", text: "size()", isCorrect: false },
                  { id: "b", text: "len()", isCorrect: true },
                  { id: "c", text: "count()", isCorrect: false },
                  { id: "d", text: "length()", isCorrect: false },
                ],
              },
            ],
            medium: [
              {
                text: "What does the `__init__` method do in a Python class?",
                options: [
                  {
                    id: "a",
                    text: "Defines a class-level constant",
                    isCorrect: false,
                  },
                  {
                    id: "b",
                    text: "Initializes a new instance",
                    isCorrect: true,
                  },
                  { id: "c", text: "Destroys an object", isCorrect: false },
                  {
                    id: "d",
                    text: "Overrides equality operator",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which statement is used to handle exceptions?",
                options: [
                  { id: "a", text: "try/except", isCorrect: true },
                  { id: "b", text: "if/else", isCorrect: false },
                  { id: "c", text: "for/while", isCorrect: false },
                  { id: "d", text: "switch/case", isCorrect: false },
                ],
              },
              {
                text: "Which library is commonly used for numerical computing in Python?",
                options: [
                  { id: "a", text: "NumPy", isCorrect: true },
                  { id: "b", text: "Requests", isCorrect: false },
                  { id: "c", text: "Flask", isCorrect: false },
                  { id: "d", text: "PandasGUI", isCorrect: false },
                ],
              },
              {
                text: "How do you open a file for reading in Python?",
                options: [
                  { id: "a", text: "open('file.txt', 'r')", isCorrect: true },
                  { id: "b", text: "open('file.txt', 'w')", isCorrect: false },
                  { id: "c", text: "read('file.txt')", isCorrect: false },
                  { id: "d", text: "file.open('file.txt')", isCorrect: false },
                ],
              },
              {
                text: "Which comprehension creates a new list by mapping values?",
                options: [
                  { id: "a", text: "List comprehension", isCorrect: true },
                  { id: "b", text: "Dict comprehension", isCorrect: false },
                  { id: "c", text: "Set comprehension", isCorrect: false },
                  { id: "d", text: "Generator expression", isCorrect: false },
                ],
              },
            ],
            hard: [
              {
                text: "What does GIL stand for in Python and what is its effect?",
                options: [
                  {
                    id: "a",
                    text: "Global Interpreter Lock — it prevents multiple native threads from executing Python bytecodes at once",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Global I/O Limit — limits disk I/O",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Generic Interface Layer — for network",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Global Instance Locator — for databases",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which tool is commonly used for virtual environments in Python?",
                options: [
                  { id: "a", text: "venv", isCorrect: true },
                  { id: "b", text: "pipenv", isCorrect: false },
                  { id: "c", text: "virtualbox", isCorrect: false },
                  { id: "d", text: "docker", isCorrect: false },
                ],
              },
              {
                text: "Which statement best describes generators in Python?",
                options: [
                  { id: "a", text: "They return a list", isCorrect: false },
                  {
                    id: "b",
                    text: "They yield values and are iterators",
                    isCorrect: true,
                  },
                  {
                    id: "c",
                    text: "They are used only for I/O",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "They are synchronous sockets",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which method is used to run test suites in Python standard library?",
                options: [
                  { id: "a", text: "unittest", isCorrect: true },
                  { id: "b", text: "pytest-run", isCorrect: false },
                  { id: "c", text: "nose", isCorrect: false },
                  { id: "d", text: "test-run", isCorrect: false },
                ],
              },
              {
                text: "Which is a common method for serializing Python objects?",
                options: [
                  { id: "a", text: "pickle", isCorrect: true },
                  { id: "b", text: "encrypt", isCorrect: false },
                  { id: "c", text: "marshal", isCorrect: false },
                  { id: "d", text: "jsonify", isCorrect: false },
                ],
              },
            ],
          },
          "React Mastery": {
            easy: [
              {
                text: "What hook lets you add state to a functional component?",
                options: [
                  { id: "a", text: "useState", isCorrect: true },
                  { id: "b", text: "useEffect", isCorrect: false },
                  { id: "c", text: "useContext", isCorrect: false },
                  { id: "d", text: "useReducer", isCorrect: false },
                ],
              },
              {
                text: "What is JSX?",
                options: [
                  { id: "a", text: "A CSS preprocessor", isCorrect: false },
                  {
                    id: "b",
                    text: "JavaScript XML — syntax extension for React",
                    isCorrect: true,
                  },
                  { id: "c", text: "A templating engine", isCorrect: false },
                  { id: "d", text: "A testing library", isCorrect: false },
                ],
              },
              {
                text: "Which prop is used to pass data from parent to child?",
                options: [
                  { id: "a", text: "state", isCorrect: false },
                  { id: "b", text: "props", isCorrect: true },
                  { id: "c", text: "context", isCorrect: false },
                  { id: "d", text: "store", isCorrect: false },
                ],
              },
              {
                text: "How do you create a React component?",
                options: [
                  {
                    id: "a",
                    text: "function MyComp() { return <div/> }",
                    isCorrect: true,
                  },
                  { id: "b", text: "<component>", isCorrect: false },
                  { id: "c", text: "new Component()", isCorrect: false },
                  { id: "d", text: "createComponent()", isCorrect: false },
                ],
              },
              {
                text: "Which attribute is used to set a key when rendering lists?",
                options: [
                  { id: "a", text: "id", isCorrect: false },
                  { id: "b", text: "key", isCorrect: true },
                  { id: "c", text: "index", isCorrect: false },
                  { id: "d", text: "ref", isCorrect: false },
                ],
              },
            ],
            medium: [
              {
                text: "What does useEffect with an empty dependency array do?",
                options: [
                  {
                    id: "a",
                    text: "Runs after every render",
                    isCorrect: false,
                  },
                  {
                    id: "b",
                    text: "Runs once after the first render",
                    isCorrect: true,
                  },
                  { id: "c", text: "Prevents rendering", isCorrect: false },
                  { id: "d", text: "Batches setState calls", isCorrect: false },
                ],
              },
              {
                text: "What is a controlled component in React?",
                options: [
                  {
                    id: "a",
                    text: "An input whose value is managed by React state",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "A component with internal state only",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "A component that cannot be reused",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "A ref-forwarding component",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which API helps avoid prop drilling for global state?",
                options: [
                  { id: "a", text: "Context API", isCorrect: true },
                  { id: "b", text: "LocalStorage", isCorrect: false },
                  { id: "c", text: "useState", isCorrect: false },
                  { id: "d", text: "Refs", isCorrect: false },
                ],
              },
              {
                text: "Which method optimizes re-rendering of expensive components?",
                options: [
                  { id: "a", text: "React.memo", isCorrect: true },
                  { id: "b", text: "useLayoutEffect", isCorrect: false },
                  {
                    id: "c",
                    text: "dangerouslySetInnerHTML",
                    isCorrect: false,
                  },
                  { id: "d", text: "setTimeout", isCorrect: false },
                ],
              },
              {
                text: "What does lifting state up mean?",
                options: [
                  {
                    id: "a",
                    text: "Moving state to a shared parent to pass via props",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Moving state to localStorage",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Using refs instead of state",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Using class components only",
                    isCorrect: false,
                  },
                ],
              },
            ],
            hard: [
              {
                text: "What problem does reconciliation solve in React?",
                options: [
                  {
                    id: "a",
                    text: "Synchronizing state across tabs",
                    isCorrect: false,
                  },
                  {
                    id: "b",
                    text: "Efficiently updating the DOM by diffing virtual DOM trees",
                    isCorrect: true,
                  },
                  { id: "c", text: "Compiling JSX to JS", isCorrect: false },
                  { id: "d", text: "Minifying code", isCorrect: false },
                ],
              },
              {
                text: "Which hook can replace multiple setState calls and provide a reducer pattern?",
                options: [
                  { id: "a", text: "useReducer", isCorrect: true },
                  { id: "b", text: "useRef", isCorrect: false },
                  { id: "c", text: "useMemo", isCorrect: false },
                  { id: "d", text: "useCallback", isCorrect: false },
                ],
              },
              {
                text: "What is server-side rendering (SSR) advantage over client-side?",
                options: [
                  {
                    id: "a",
                    text: "Faster initial paint and better SEO",
                    isCorrect: true,
                  },
                  { id: "b", text: "No network usage", isCorrect: false },
                  { id: "c", text: "No JavaScript required", isCorrect: false },
                  { id: "d", text: "Larger bundle sizes", isCorrect: false },
                ],
              },
              {
                text: "Which pattern helps code-split and lazy-load components?",
                options: [
                  { id: "a", text: "React.lazy and Suspense", isCorrect: true },
                  {
                    id: "b",
                    text: "Higher-order components only",
                    isCorrect: false,
                  },
                  { id: "c", text: "Inline styles", isCorrect: false },
                  { id: "d", text: "context", isCorrect: false },
                ],
              },
            ],
          },
          "Database Design": {
            easy: [
              {
                text: "Which SQL clause is used to filter rows?",
                options: [
                  { id: "a", text: "WHERE", isCorrect: true },
                  { id: "b", text: "ORDER BY", isCorrect: false },
                  { id: "c", text: "GROUP BY", isCorrect: false },
                  { id: "d", text: "HAVING", isCorrect: false },
                ],
              },
              {
                text: "What does CRUD stand for?",
                options: [
                  {
                    id: "a",
                    text: "Create, Read, Update, Delete",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Copy, Run, Undo, Delete",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Create, Replace, Update, Drop",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Connect, Read, Update, Disconnect",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which SQL command adds a new row to a table?",
                options: [
                  { id: "a", text: "INSERT", isCorrect: true },
                  { id: "b", text: "UPDATE", isCorrect: false },
                  { id: "c", text: "SELECT", isCorrect: false },
                  { id: "d", text: "DELETE", isCorrect: false },
                ],
              },
              {
                text: "What ensures each record in a table is unique?",
                options: [
                  { id: "a", text: "Primary key", isCorrect: true },
                  { id: "b", text: "Index", isCorrect: false },
                  { id: "c", text: "View", isCorrect: false },
                  { id: "d", text: "Trigger", isCorrect: false },
                ],
              },
              {
                text: "Which type of database is MongoDB?",
                options: [
                  { id: "a", text: "Relational", isCorrect: false },
                  { id: "b", text: "Document (NoSQL)", isCorrect: true },
                  { id: "c", text: "Graph", isCorrect: false },
                  { id: "d", text: "Key-value", isCorrect: false },
                ],
              },
            ],
            medium: [
              {
                text: "What is normalization in database design?",
                options: [
                  {
                    id: "a",
                    text: "Process to reduce redundancy and dependency",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Encrypting database files",
                    isCorrect: false,
                  },
                  { id: "c", text: "Creating backups", isCorrect: false },
                  { id: "d", text: "Indexing tables", isCorrect: false },
                ],
              },
              {
                text: "Which index type is best for range queries?",
                options: [
                  { id: "a", text: "B-tree index", isCorrect: true },
                  { id: "b", text: "Hash index", isCorrect: false },
                  { id: "c", text: "Full text index", isCorrect: false },
                  { id: "d", text: "Geo index", isCorrect: false },
                ],
              },
              {
                text: "What is ACID an acronym for in databases?",
                options: [
                  {
                    id: "a",
                    text: "Atomicity, Consistency, Isolation, Durability",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Access, Control, Integrity, Durability",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Atomicity, Concurrency, Isolation, Distribution",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Availability, Consistency, Isolation, Durability",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which SQL clause groups rows that have the same values?",
                options: [
                  { id: "a", text: "GROUP BY", isCorrect: true },
                  { id: "b", text: "ORDER BY", isCorrect: false },
                  { id: "c", text: "HAVING", isCorrect: false },
                  { id: "d", text: "WHERE", isCorrect: false },
                ],
              },
              {
                text: "Which database is optimized for document storage?",
                options: [
                  { id: "a", text: "MongoDB", isCorrect: true },
                  { id: "b", text: "PostgreSQL", isCorrect: false },
                  { id: "c", text: "MySQL", isCorrect: false },
                  { id: "d", text: "SQLite", isCorrect: false },
                ],
              },
            ],
            hard: [
              {
                text: "What is eventual consistency?",
                options: [
                  {
                    id: "a",
                    text: "All nodes are immediately consistent",
                    isCorrect: false,
                  },
                  {
                    id: "b",
                    text: "Updates will propagate and eventually all nodes become consistent",
                    isCorrect: true,
                  },
                  {
                    id: "c",
                    text: "Data is never consistent",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Consistency enforced by transactions only",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "What is sharding?",
                options: [
                  {
                    id: "a",
                    text: "Splitting a dataset across multiple machines",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Compressing database files",
                    isCorrect: false,
                  },
                  { id: "c", text: "Merging tables", isCorrect: false },
                  {
                    id: "d",
                    text: "Backing up data to cloud",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "Which isolation level allows dirty reads?",
                options: [
                  { id: "a", text: "Read Uncommitted", isCorrect: true },
                  { id: "b", text: "Read Committed", isCorrect: false },
                  { id: "c", text: "Repeatable Read", isCorrect: false },
                  { id: "d", text: "Serializable", isCorrect: false },
                ],
              },
              {
                text: "Which technique speeds up read queries by precomputing results?",
                options: [
                  { id: "a", text: "Indexing", isCorrect: false },
                  { id: "b", text: "Caching", isCorrect: true },
                  { id: "c", text: "Normalization", isCorrect: false },
                  { id: "d", text: "Partitioning", isCorrect: false },
                ],
              },
              {
                text: "Which join returns rows when there is a match in both tables?",
                options: [
                  { id: "a", text: "INNER JOIN", isCorrect: true },
                  { id: "b", text: "LEFT JOIN", isCorrect: false },
                  { id: "c", text: "RIGHT JOIN", isCorrect: false },
                  { id: "d", text: "FULL JOIN", isCorrect: false },
                ],
              },
            ],
          },
          "DevOps Essentials": {
            easy: [
              {
                text: "What is Docker primarily used for?",
                options: [
                  {
                    id: "a",
                    text: "Containerization of applications",
                    isCorrect: true,
                  },
                  { id: "b", text: "Version control", isCorrect: false },
                  {
                    id: "c",
                    text: "Continuous integration server",
                    isCorrect: false,
                  },
                  { id: "d", text: "Database management", isCorrect: false },
                ],
              },
              {
                text: "Which file defines services for Docker Compose?",
                options: [
                  { id: "a", text: "docker-compose.yml", isCorrect: true },
                  { id: "b", text: "Dockerfile", isCorrect: false },
                  { id: "c", text: "compose.json", isCorrect: false },
                  { id: "d", text: "services.yml", isCorrect: false },
                ],
              },
              {
                text: "What does CI stand for in CI/CD?",
                options: [
                  { id: "a", text: "Continuous Integration", isCorrect: true },
                  { id: "b", text: "Code Inspection", isCorrect: false },
                  {
                    id: "c",
                    text: "Container Initialization",
                    isCorrect: false,
                  },
                  { id: "d", text: "Cloud Infrastructure", isCorrect: false },
                ],
              },
              {
                text: "Which command builds a Docker image from a Dockerfile?",
                options: [
                  { id: "a", text: "docker build", isCorrect: true },
                  { id: "b", text: "docker run", isCorrect: false },
                  { id: "c", text: "docker compose", isCorrect: false },
                  { id: "d", text: "docker push", isCorrect: false },
                ],
              },
              {
                text: "What does Kubernetes orchestrate?",
                options: [
                  {
                    id: "a",
                    text: "Containers across clusters",
                    isCorrect: true,
                  },
                  { id: "b", text: "Static websites", isCorrect: false },
                  { id: "c", text: "Databases only", isCorrect: false },
                  { id: "d", text: "IDE plugins", isCorrect: false },
                ],
              },
            ],
            medium: [
              {
                text: "What is the purpose of a health check in containers?",
                options: [
                  {
                    id: "a",
                    text: "To verify the container is working properly",
                    isCorrect: true,
                  },
                  { id: "b", text: "To back up data", isCorrect: false },
                  {
                    id: "c",
                    text: "To increase container size",
                    isCorrect: false,
                  },
                  { id: "d", text: "To deploy new images", isCorrect: false },
                ],
              },
              {
                text: "Which tool automates infrastructure as code?",
                options: [
                  { id: "a", text: "Terraform", isCorrect: true },
                  { id: "b", text: "Jenkins", isCorrect: false },
                  { id: "c", text: "Git", isCorrect: false },
                  { id: "d", text: "Docker", isCorrect: false },
                ],
              },
              {
                text: "What does horizontal scaling do?",
                options: [
                  {
                    id: "a",
                    text: "Adds more machines to handle load",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Makes a machine more powerful",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Reduces number of instances",
                    isCorrect: false,
                  },
                  {
                    id: "d",
                    text: "Updates code automatically",
                    isCorrect: false,
                  },
                ],
              },
              {
                text: "What is rolling deployment?",
                options: [
                  {
                    id: "a",
                    text: "Gradually replace instances with new versions",
                    isCorrect: true,
                  },
                  {
                    id: "b",
                    text: "Deploy to all servers at once",
                    isCorrect: false,
                  },
                  {
                    id: "c",
                    text: "Rollback only on failure",
                    isCorrect: false,
                  },
                  { id: "d", text: "Backup databases", isCorrect: false },
                ],
              },
              {
                text: "Which system is used to collect and visualize logs?",
                options: [
                  {
                    id: "a",
                    text: "ELK stack (Elasticsearch, Logstash, Kibana)",
                    isCorrect: true,
                  },
                  { id: "b", text: "MySQL", isCorrect: false },
                  { id: "c", text: "Nginx", isCorrect: false },
                  { id: "d", text: "Redis", isCorrect: false },
                ],
              },
            ],
            hard: [
              {
                text: "Which approach improves deployment reliability by running old and new versions concurrently?",
                options: [
                  { id: "a", text: "Blue-green deployment", isCorrect: true },
                  { id: "b", text: "Canary testing", isCorrect: false },
                  { id: "c", text: "Shadowing", isCorrect: false },
                  { id: "d", text: "A/B testing", isCorrect: false },
                ],
              },
              {
                text: "What is infrastructure drift?",
                options: [
                  {
                    id: "a",
                    text: "Mismatch between declared and actual infrastructure state",
                    isCorrect: true,
                  },
                  { id: "b", text: "Network latency spikes", isCorrect: false },
                  { id: "c", text: "High CPU usage", isCorrect: false },
                  { id: "d", text: "Data corruption", isCorrect: false },
                ],
              },
              {
                text: "Which protocol is commonly used for secure remote server access?",
                options: [
                  { id: "a", text: "SSH", isCorrect: true },
                  { id: "b", text: "FTP", isCorrect: false },
                  { id: "c", text: "HTTP", isCorrect: false },
                  { id: "d", text: "Telnet", isCorrect: false },
                ],
              },
              {
                text: "Which metric is important for service responsiveness?",
                options: [
                  { id: "a", text: "Latency", isCorrect: true },
                  { id: "b", text: "Storage size", isCorrect: false },
                  { id: "c", text: "CPU temperature", isCorrect: false },
                  { id: "d", text: "Disk fragmentation", isCorrect: false },
                ],
              },
              {
                text: "Which tool helps manage secrets for applications?",
                options: [
                  { id: "a", text: "Vault (HashiCorp)", isCorrect: true },
                  { id: "b", text: "Grep", isCorrect: false },
                  { id: "c", text: "SSH", isCorrect: false },
                  { id: "d", text: "Cron", isCorrect: false },
                ],
              },
            ],
          },
        };

        const bank = (curated[theme.name] && curated[theme.name][d.key]) || [];
        const qs = [];

        // Use curated questions when available; otherwise fallback to generic placeholders
        if (bank.length > 0) {
          for (let i = 0; i < Math.min(5, bank.length); i++) {
            const q = bank[i];
            qs.push({
              quizId: quiz._id,
              text: q.text,
              type: "multiple",
              options: q.options,
              difficulty: d.key,
            });
          }

          // If bank had fewer than 5, pad with generic variants
          for (let i = bank.length; i < 5; i++) {
            qs.push({
              quizId: quiz._id,
              text: `${theme.name} — ${d.key} question ${i + 1}`,
              type: "multiple",
              options: [
                {
                  id: "a",
                  text: `${theme.name} ${d.key} correct ${i + 1}`,
                  isCorrect: true,
                },
                {
                  id: "b",
                  text: `${theme.name} ${d.key} wrong A ${i + 1}`,
                  isCorrect: false,
                },
                {
                  id: "c",
                  text: `${theme.name} ${d.key} wrong B ${i + 1}`,
                  isCorrect: false,
                },
                {
                  id: "d",
                  text: `${theme.name} ${d.key} distractor ${i + 1}`,
                  isCorrect: false,
                },
              ],
              difficulty: d.key,
            });
          }
        } else {
          for (let i = 0; i < 5; i++) {
            const qText = `${theme.name} — ${d.key} question ${i + 1}`;
            const options = [
              {
                id: "a",
                text: `${theme.name} ${d.key} correct answer ${i + 1}`,
                isCorrect: true,
              },
              {
                id: "b",
                text: `${theme.name} ${d.key} common misconception ${i + 1}`,
                isCorrect: false,
              },
              {
                id: "c",
                text: `${theme.name} ${d.key} incorrect detail ${i + 1}`,
                isCorrect: false,
              },
              {
                id: "d",
                text: `${theme.name} ${d.key} distractor ${i + 1}`,
                isCorrect: false,
              },
            ];

            qs.push({
              quizId: quiz._id,
              text: qText,
              type: "multiple",
              options,
              difficulty: d.key,
            });
          }
        }

        await Question.insertMany(qs);
      }
    }

    console.log("✅ Quizzes and questions created");
    console.log("✅ Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
