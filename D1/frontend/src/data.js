const users = [
  {
    id: 1,
    username: "hannah@example.com",
    password: "pass123",
    pronouns: "she/her",
    birthday: "1995-08-15",
    work: "Software Engineer",
    contact: "123-456-7890",
    connections: [2, 3, 4, 5],
    projects: [1],
    friends: [2, 3, 4],
  },
  {
    id: 2,
    username: "ryan@example.com",
    password: "pass456",
    pronouns: "he/him",
    birthday: "1990-02-20",
    work: "Product Manager",
    contact: "987-654-3210",
    connections: [1, 3],
    projects: [2],
    friends: [1, 3],
  },
  {
    id: 3,
    username: "clay@example.com",
    password: "pass789",
    pronouns: "they/them",
    birthday: "1992-06-10",
    work: "UX Designer",
    contact: "555-123-4567",
    connections: [1, 2],
    projects: [3],
    friends: [1, 2],
  },
  {
    id: 4,
    username: "conno@example.com",
    password: "pass321",
    pronouns: "he/him",
    birthday: "1994-04-22",
    work: "DevOps Engineer",
    contact: "444-555-6666",
    connections: [1, 5],
    projects: [],
    friends: [1, 5],
  },
  {
    id: 5,
    username: "nix@example.com",
    password: "pass654",
    pronouns: "she/her",
    birthday: "1993-12-30",
    work: "Data Scientist",
    contact: "777-888-9999",
    connections: [1, 4],
    projects: [],
    friends: [1, 4],
  },
];

const localFeedData = [
  {
    id: 1,
    name: "MatchaLatte",
    owner: 1,
    participants: [1, 2, 3],
    members: [1, 2, 4],
    date: "10/10/2010",
    popularity: 12,
    downloads: 35,
    hashtags: ["JavaScript", "React"],
    type: "Web Application",
    version: "1.0.0",
    status: "Checked In",
    files: ["index.js", "App.js"],
    activity: [
      { userId: 1, action: "checked in", message: "Initial commit", timestamp: "10/10/2010" },
      { userId: 2, action: "checked in", message: "Added header component", timestamp: "10/12/2010" }
    ],
    discussion: [
      { userId: 1, text: "Let's get started with the main layout." },
      { userId: 2, text: "I'll work on the navigation bar." }
    ]
  },
  {
    id: 2,
    name: "CoffeeBrew",
    owner: 2,
    participants: [2, 3],
    members: [2, 3, 5],
    date: "11/11/2011",
    popularity: 25,
    downloads: 50,
    hashtags: ["Python"],
    type: "Desktop Application",
    version: "1.0.0",
    status: "Checked Out",
    files: ["brew.py", "utils.py"],
    activity: [
      { userId: 2, action: "checked out", message: "Working on feature X", timestamp: "11/11/2011" },
      { userId: 3, action: "checked in", message: "UI layout updated", timestamp: "11/12/2011" }
    ],
    discussion: [
      { userId: 2, text: "Database schema is ready." },
      { userId: 3, text: "I'll integrate the GUI next." }
    ]
  },
  {
    id: 3,
    name: "HotChoccies",
    owner: 3,
    participants: [3, 1],
    members: [1, 3, 4, 5],
    date: "12/12/2012",
    popularity: 8,
    downloads: 20,
    hashtags: ["CSS", "HTML"],
    type: "Web Application",
    version: "1.0.0",
    status: "Checked In",
    files: ["style.css", "index.html"],
    activity: [
      { userId: 3, action: "checked in", message: "Initial commit", timestamp: "12/12/2012" },
      { userId: 1, action: "checked in", message: "Added responsive layout", timestamp: "12/15/2012" }
    ],
    discussion: [
      { userId: 3, text: "Main styles done, review please." },
      { userId: 1, text: "Looks good, will add media queries." }
    ]
  },
];

const globalFeedData = [
  {
    id: 101,
    name: "SandySandwich",
    description: "Sandwich ordering app",
    owner: 1,
    participants: [1, 2],
    members: [1, 2, 4],
    hashtags: ["#Java", "#Spring"],
    type: "Web Application",
    version: "1.2.1",
    image: "/images/sandysandwich.png",
    status: "Checked In",
    activity: [
      { userId: 1, action: "Checked In", message: "Initial backend setup", timestamp: "2025-08-25T09:00:00" },
      { userId: 2, action: "Checked In", message: "Frontend prototype added", timestamp: "2025-08-26T14:00:00" }
    ],
    date: "2025-08-25",
    popularity: 90,
    downloads: 120,
    files: ["Main.java", "SandwichController.java", "index.html"],
    discussion: [
      { userId: 1, text: "Backend setup complete." },
      { userId: 2, text: "Frontend ready for integration." }
    ]
  },
  {
    id: 102,
    name: "MuffinMahem",
    description: "Muffin shop management system",
    owner: 2,
    participants: [2, 3],
    members: [2, 3, 5],
    hashtags: ["#Python", "#Flask"],
    type: "Web Application",
    version: "0.8.0",
    image: "/images/muffinmahem.png",
    status: "Checked Out",
    activity: [
      { userId: 2, action: "Checked In", message: "Database schema ready", timestamp: "2025-08-20T12:00:00" },
      { userId: 3, action: "Checked In", message: "UI design completed", timestamp: "2025-08-21T16:00:00" }
    ],
    date: "2025-08-20",
    popularity: 65,
    downloads: 95,
    files: ["app.py", "templates/index.html"],
    discussion: [
      { userId: 2, text: "Database ready." },
      { userId: 3, text: "UI mockups done." }
    ]
  },
  {
    id: 103,
    name: "CookieCraze",
    description: "Cookie recipe sharing platform",
    owner: 3,
    participants: [1, 3],
    members: [1, 3, 4, 5],
    hashtags: ["#JavaScript", "#VueJS"],
    type: "Web Application",
    version: "1.1.0",
    image: "/images/cookiecraze.png",
    status: "Checked In",
    activity: [
      { userId: 3, action: "Checked In", message: "Added recipe module", timestamp: "2025-08-15T11:00:00" },
      { userId: 1, action: "Checked In", message: "Integrated search feature", timestamp: "2025-08-16T13:00:00" }
    ],
    date: "2025-08-15",
    popularity: 100,
    downloads: 200,
    files: ["app.js", "recipes.vue"],
    discussion: [
      { userId: 3, text: "Recipe module completed." },
      { userId: 1, text: "Search feature integrated." }
    ]
  }
];

export { users, localFeedData, globalFeedData };
