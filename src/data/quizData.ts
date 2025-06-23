
export interface Question {
  question: string;
  options: string[];
  correctAnswer?: string;
}

export interface QuizData {
  [subject: string]: Question[];
}

export const quizData: QuizData = {
  "Computer Networks": [
    {
      question: "What does IP stand for?",
      options: ["Internet Protocol", "Internal Program", "Internet Procedure", "Input Protocol"],
      correctAnswer: "Internet Protocol"
    },
    {
      question: "Which of the following is an example of a protocol?",
      options: ["HTML", "HTTP", "URL", "IP Address"],
      correctAnswer: "HTTP"
    },
    {
      question: "Which device is used to connect different networks?",
      options: ["Switch", "Router", "Hub", "Bridge"],
      correctAnswer: "Router"
    },
    {
      question: "Which layer of the OSI model handles data encryption?",
      options: ["Network", "Presentation", "Data Link", "Session"],
      correctAnswer: "Presentation"
    },
    {
      question: "True/False: A MAC address is the same as an IP address.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "C Language": [
    {
      question: "Which of the following is a valid variable name in C?",
      options: ["1var", "_value", "int", "float number"],
      correctAnswer: "_value"
    },
    {
      question: "What is the output of: printf(\"%d\", 5 + 2 * 3);",
      options: ["21", "11", "16", "5"],
      correctAnswer: "11"
    },
    {
      question: "True/False: scanf() is used to display output on the screen.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "if"],
      correctAnswer: "do-while"
    },
    {
      question: "What is the default return type of main() in C?",
      options: ["void", "int", "char", "float"],
      correctAnswer: "int"
    }
  ],
  "Data Structures using C": [
    {
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Array"],
      correctAnswer: "Queue"
    },
    {
      question: "True/False: Insertion in an array is faster than insertion in a linked list.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      correctAnswer: "O(log n)"
    },
    {
      question: "Which traversal gives sorted output for BST?",
      options: ["Preorder", "Postorder", "Inorder", "Level-order"],
      correctAnswer: "Inorder"
    },
    {
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correctAnswer: "Stack"
    }
  ],
  "DBMS": [
    {
      question: "What is the full form of DBMS?",
      options: ["Data Backup Management System", "Database Management System", "Data Business Machine System", "Direct Base Main Storage"],
      correctAnswer: "Database Management System"
    },
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["UPDATE", "SELECT", "DELETE", "INSERT"],
      correctAnswer: "SELECT"
    },
    {
      question: "True/False: A primary key can be NULL.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: "2NF"
    },
    {
      question: "What is the difference between WHERE and HAVING clause?",
      options: ["WHERE is used with GROUP BY, HAVING is not", "WHERE filters rows before grouping, HAVING filters groups after grouping", "No difference", "WHERE is faster than HAVING"],
      correctAnswer: "WHERE filters rows before grouping, HAVING filters groups after grouping"
    }
  ],
  "OOPs using C++": [
    {
      question: "Which concept of OOP is used to hide data?",
      options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
      correctAnswer: "Encapsulation"
    },
    {
      question: "What is the correct syntax to create an object of class Car?",
      options: ["Car obj();", "Car:obj;", "Car obj;", "new Car();"],
      correctAnswer: "Car obj;"
    },
    {
      question: "True/False: A constructor has a return type.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question: "Which OOP concept allows the same function name to act differently?",
      options: ["Inheritance", "Abstraction", "Polymorphism", "Encapsulation"],
      correctAnswer: "Polymorphism"
    },
    {
      question: "What is the difference between public and private access specifiers?",
      options: ["No difference", "Public members are accessible outside class, private are not", "Private members are accessible outside class, public are not", "Both are same"],
      correctAnswer: "Public members are accessible outside class, private are not"
    }
  ],
  "Software Engineering": [
    {
      question: "What does SDLC stand for?",
      options: ["Software Development Life Cycle", "System Design Logic Control", "Software Design Level Code", "System Direct Logic Cycle"],
      correctAnswer: "Software Development Life Cycle"
    },
    {
      question: "True/False: Agile is a rigid, fixed-phase model.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question: "Which model uses prototyping?",
      options: ["Waterfall", "Spiral", "V-Model", "Agile"],
      correctAnswer: "Spiral"
    },
    {
      question: "What is the first phase of SDLC?",
      options: ["Design", "Coding", "Requirements Analysis", "Testing"],
      correctAnswer: "Requirements Analysis"
    },
    {
      question: "Define functional requirement with an example.",
      options: ["Performance requirements", "User interface requirements", "What the system should do - e.g., login functionality", "Hardware requirements"],
      correctAnswer: "What the system should do - e.g., login functionality"
    }
  ],
  "Operating System": [
    {
      question: "What is the role of the Operating System?",
      options: ["Compiling Code", "Managing hardware and software", "Sending Emails", "Browsing"],
      correctAnswer: "Managing hardware and software"
    },
    {
      question: "What is a deadlock?",
      options: ["A type of virus", "A situation where processes are blocked forever", "A hardware failure", "A programming error"],
      correctAnswer: "A situation where processes are blocked forever"
    },
    {
      question: "Which is not a type of OS?",
      options: ["Batch", "Time-sharing", "Interactive", "Chrome"],
      correctAnswer: "Chrome"
    },
    {
      question: "True/False: Round-robin is a type of process scheduling algorithm.",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      question: "What is the kernel?",
      options: ["A type of virus", "Core part of OS that manages system resources", "A programming language", "A type of hardware"],
      correctAnswer: "Core part of OS that manages system resources"
    }
  ],
  "PHP": [
    {
      question: "What does PHP stand for?",
      options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Pre Hyper Processor", "Post HTML Parser"],
      correctAnswer: "PHP: Hypertext Preprocessor"
    },
    {
      question: "What is the correct syntax to print in PHP?",
      options: ["print(\"Hello\");", "echo(\"Hello\");", "println(\"Hello\");", "console.log(\"Hello\");"],
      correctAnswer: "echo(\"Hello\");"
    },
    {
      question: "True/False: PHP can interact with MySQL.",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      question: "What symbol is used to start a PHP variable?",
      options: ["@", "#", "$", "%"],
      correctAnswer: "$"
    },
    {
      question: "Which of these is a server-side scripting language?",
      options: ["PHP", "HTML", "CSS", "JavaScript"],
      correctAnswer: "PHP"
    }
  ],
  "MySQL": [
    {
      question: "Which command is used to create a database?",
      options: ["MAKE DATABASE", "CREATE DATABASE", "NEW DATABASE", "INIT DATABASE"],
      correctAnswer: "CREATE DATABASE"
    },
    {
      question: "True/False: MySQL is an open-source database.",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      question: "What is the function of JOIN in SQL?",
      options: ["To delete records", "To combine rows from multiple tables", "To create tables", "To update records"],
      correctAnswer: "To combine rows from multiple tables"
    },
    {
      question: "What is the syntax to select all from a table named users?",
      options: ["SELECT * FROM users;", "GET ALL FROM users;", "FETCH * FROM users;", "SHOW ALL users;"],
      correctAnswer: "SELECT * FROM users;"
    },
    {
      question: "What type of key uniquely identifies a record in a table?",
      options: ["Foreign Key", "Primary Key", "Unique Key", "Composite Key"],
      correctAnswer: "Primary Key"
    }
  ],
  "Web Development": [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighText Machine Language", "Hyperloop Text Machine Language", "None"],
      correctAnswer: "HyperText Markup Language"
    },
    {
      question: "Which tag is used for inserting an image in HTML?",
      options: ["<image>", "<img>", "<picture>", "<src>"],
      correctAnswer: "<img>"
    },
    {
      question: "True/False: CSS is used to add style to HTML pages.",
      options: ["True", "False"],
      correctAnswer: "True"
    },
    {
      question: "What does <a href=\"\"> do?",
      options: ["Creates a link", "Inserts an image", "Creates a paragraph", "Makes text bold"],
      correctAnswer: "Creates a link"
    },
    {
      question: "Which HTML tag is used to make a form?",
      options: ["<form>", "<input>", "<field>", "<data>"],
      correctAnswer: "<form>"
    }
  ],
  "Java": [
    {
      question: "Java is:",
      options: ["Compiled only", "Interpreted only", "Both compiled and interpreted", "None"],
      correctAnswer: "Both compiled and interpreted"
    },
    {
      question: "What is JVM?",
      options: ["Java Virtual Machine", "Java Variable Method", "Java Version Manager", "Java Visual Machine"],
      correctAnswer: "Java Virtual Machine"
    },
    {
      question: "True/False: In Java, everything is an object.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question: "What is the default value of an int in Java?",
      options: ["0", "1", "null", "undefined"],
      correctAnswer: "0"
    },
    {
      question: "What keyword is used to inherit a class in Java?",
      options: ["inherits", "extends", "implements", "super"],
      correctAnswer: "extends"
    }
  ],
  "Quantitative Aptitude": [
    {
      question: "What is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2"
    },
    {
      question: "Divide ₹60 between A and B in the ratio 2:1. What is B's share?",
      options: ["₹10", "₹20", "₹30", "₹40"],
      correctAnswer: "₹20"
    },
    {
      question: "Find the LCM of 4 and 5.",
      options: ["9", "10", "20", "15"],
      correctAnswer: "20"
    },
    {
      question: "What is the ratio of milk to water if a 30 L mixture contains 20 L milk?",
      options: ["2:1", "1:2", "3:2", "1:3"],
      correctAnswer: "2:1"
    },
    {
      question: "If A can do a job in 5 days, how much work does A do in one day?",
      options: ["1/2", "1/5", "1/10", "5"],
      correctAnswer: "1/5"
    }
  ],
  "Logical Ability": [
    {
      question: "All cats are animals. Some animals are dogs. Can some cats be dogs?",
      options: ["Yes", "No", "Can't say"],
      correctAnswer: "No"
    },
    {
      question: "What comes next: 2, 4, 6, 8, __?",
      options: ["9", "10", "12", "14"],
      correctAnswer: "10"
    },
    {
      question: "A is north of B. B is east of C. In which direction is A from C?",
      options: ["North-East", "North-West", "South-East", "South-West"],
      correctAnswer: "North-East"
    },
    {
      question: "Find the odd one: Apple, Banana, Tomato, Carrot",
      options: ["Apple", "Tomato", "Carrot", "Banana"],
      correctAnswer: "Carrot"
    },
    {
      question: "If marks > 40 and attendance > 75%, then eligible. Rahul has 45 marks and 80% attendance. Is he eligible?",
      options: ["Yes", "No"],
      correctAnswer: "Yes"
    }
  ],
  "Verbal Ability": [
    {
      question: "Choose the correct sentence:",
      options: ["She don't like coffee", "She doesn't like coffee", "She not like coffee", "She no like coffee"],
      correctAnswer: "She doesn't like coffee"
    },
    {
      question: "He ___ to school daily.",
      options: ["go", "goes", "going", "gone"],
      correctAnswer: "goes"
    },
    {
      question: "Where does the sun rise?",
      options: ["West", "North", "South", "East"],
      correctAnswer: "East"
    },
    {
      question: "Synonym of 'happy'?",
      options: ["Sad", "Joyful", "Angry", "Tired"],
      correctAnswer: "Joyful"
    },
    {
      question: "I ___ a movie yesterday.",
      options: ["watch", "watched", "watching", "watches"],
      correctAnswer: "watched"
    }
  ],
  "Basic Coding": [
    {
      question: "Write a Java program to print all even numbers from 1 to 10. What would be the output?",
      options: ["1 3 5 7 9", "2 4 6 8 10", "0 2 4 6 8 10", "1 2 3 4 5"],
      correctAnswer: "2 4 6 8 10"
    },
    {
      question: "In Python, what is the sum of elements in list [2, 4, 6]?",
      options: ["8", "10", "12", "14"],
      correctAnswer: "12"
    },
    {
      question: "Which SQL query displays all records from the 'students' table?",
      options: ["SELECT * FROM students", "GET ALL FROM students", "SHOW students", "DISPLAY students"],
      correctAnswer: "SELECT * FROM students"
    },
    {
      question: "In Java, what is the default value of an int variable?",
      options: ["null", "0", "1", "undefined"],
      correctAnswer: "0"
    },
    {
      question: "Which SQL query counts the number of rows in the 'orders' table?",
      options: ["COUNT(*) FROM orders", "SELECT COUNT(*) FROM orders", "TOTAL FROM orders", "SUM FROM orders"],
      correctAnswer: "SELECT COUNT(*) FROM orders"
    }
  ]
};
