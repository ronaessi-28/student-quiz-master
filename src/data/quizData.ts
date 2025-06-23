
export interface Question {
  question: string;
  options: string[];
  correctAnswer?: string;
  type?: 'multiple-choice' | 'coding';
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
    },
    {
      question: "If x = 2, what is the value of 2x + 3?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7"
    },
    {
      question: "Pipe A fills a tank in 6 hours. How much of the tank is filled in 2 hours?",
      options: ["1/2", "1/3", "1/6", "2/3"],
      correctAnswer: "1/3"
    },
    {
      question: "Find the average of 2, 4, and 6.",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "A car covers 60 km in 2 hours. What is the speed?",
      options: ["20 km/h", "30 km/h", "40 km/h", "60 km/h"],
      correctAnswer: "30 km/h"
    },
    {
      question: "Rahul is 10 years older than Amit. If Amit is 20, what is Rahul's age?",
      options: ["25", "30", "20", "35"],
      correctAnswer: "30"
    },
    {
      question: "A boat goes 12 km downstream in 1 hour. What is the speed?",
      options: ["10 km/h", "11 km/h", "12 km/h", "13 km/h"],
      correctAnswer: "12 km/h"
    },
    {
      question: "If a pen costs ₹20 and is sold at ₹25, what is the profit?",
      options: ["₹5", "₹10", "₹15", "₹20"],
      correctAnswer: "₹5"
    },
    {
      question: "What is 25% of 80?",
      options: ["10", "15", "20", "25"],
      correctAnswer: "20"
    },
    {
      question: "SI on ₹1000 at 5% for 2 years = ?",
      options: ["₹50", "₹100", "₹150", "₹200"],
      correctAnswer: "₹100"
    },
    {
      question: "What is the probability of getting heads in a coin toss?",
      options: ["0", "1", "1/2", "1/3"],
      correctAnswer: "1/2"
    },
    {
      question: "A triangle has sides 3 cm, 4 cm, and 5 cm. Is it a right triangle?",
      options: ["Yes", "No"],
      correctAnswer: "Yes"
    },
    {
      question: "If 1st Jan is a Monday, what day is 8th Jan?",
      options: ["Monday", "Tuesday", "Sunday", "Wednesday"],
      correctAnswer: "Monday"
    },
    {
      question: "If CAT = DBU, then DOG = ?",
      options: ["EPH", "EQH", "DPH", "ERI"],
      correctAnswer: "EPH"
    },
    {
      question: "CI on ₹1000 at 10% for 1 year?",
      options: ["₹100", "₹110", "₹105", "₹115"],
      correctAnswer: "₹100"
    },
    {
      question: "What is the value of (2 + 3) × 2?",
      options: ["10", "8", "6", "12"],
      correctAnswer: "10"
    },
    {
      question: "Area of a rectangle (l = 5, b = 4)?",
      options: ["10", "20", "25", "30"],
      correctAnswer: "20"
    },
    {
      question: "How many ways can you arrange A, B, and C?",
      options: ["3", "4", "6", "9"],
      correctAnswer: "6"
    },
    {
      question: "Volume of cube with side 2 cm = ?",
      options: ["4", "6", "8", "10"],
      correctAnswer: "8"
    },
    {
      question: "What is the angle between the hands of a clock at 3:00?",
      options: ["30°", "45°", "90°", "60°"],
      correctAnswer: "90°"
    },
    {
      question: "If tan θ = 1, then θ = ?",
      options: ["30°", "45°", "60°", "90°"],
      correctAnswer: "45°"
    },
    {
      question: "A runs at 5 km/h and B at 6 km/h. Who is faster?",
      options: ["A", "B", "Both same", "Cannot determine"],
      correctAnswer: "B"
    },
    {
      question: "What is the 4th term of 2, 4, 6, ...?",
      options: ["6", "8", "10", "12"],
      correctAnswer: "8"
    },
    {
      question: "log₁₀10 = ?",
      options: ["0", "1", "2", "10"],
      correctAnswer: "1"
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
    },
    {
      question: "A, B, C are sitting in a row. A is left of B and right of C. Who is in the middle?",
      options: ["A", "B", "C", "Can't say"],
      correctAnswer: "A"
    },
    {
      question: "What comes next: 5, 10, 15, __?",
      options: ["18", "20", "25", "30"],
      correctAnswer: "20"
    },
    {
      question: "Arrange: infant, teenager, child, adult",
      options: ["Infant, Child, Teenager, Adult", "Child, Infant, Teenager, Adult", "Infant, Teenager, Child, Adult", "Adult, Teenager, Child, Infant"],
      correctAnswer: "Infant, Child, Teenager, Adult"
    },
    {
      question: "Pen : Write :: Knife : ?",
      options: ["Cut", "Eat", "Fight", "Chop"],
      correctAnswer: "Cut"
    },
    {
      question: "Is A older than B? 1) A is older than C. 2) C is older than B.",
      options: ["Only 1", "Only 2", "Both", "Either"],
      correctAnswer: "Both"
    },
    {
      question: "Complete the series: 1, 1, 2, 3, 5, __?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "8"
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
    },
    {
      question: "It ___ raining since morning.",
      options: ["has been", "have been", "is", "was"],
      correctAnswer: "has been"
    },
    {
      question: "Hot : Cold :: Tall : ?",
      options: ["Short", "Thin", "Long", "Huge"],
      correctAnswer: "Short"
    },
    {
      question: "Arrange: 1. goes 2. to school 3. She",
      options: ["She goes to school", "Goes she to school", "To school she goes", "School goes she to"],
      correctAnswer: "She goes to school"
    },
    {
      question: "Choose the correct sentence:",
      options: ["He is a good boy", "He are a good boy", "He am a good boy", "He be a good boy"],
      correctAnswer: "He is a good boy"
    },
    {
      question: "Synonym of 'fast'?",
      options: ["Slow", "Quick", "Late", "Stop"],
      correctAnswer: "Quick"
    },
    {
      question: "___ is my best friend.",
      options: ["He", "His", "Him", "Her"],
      correctAnswer: "He"
    },
    {
      question: "Identify the verb: She sings well.",
      options: ["She", "sings", "well", "none"],
      correctAnswer: "sings"
    },
    {
      question: "She ___ to school.",
      options: ["go", "goes", "going", "gone"],
      correctAnswer: "goes"
    },
    {
      question: "He ran ___ fast.",
      options: ["very", "many", "too", "so"],
      correctAnswer: "very"
    },
    {
      question: "The book is ___ the table.",
      options: ["on", "in", "at", "to"],
      correctAnswer: "on"
    },
    {
      question: "She is ___ honest girl.",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an"
    },
    {
      question: "I wanted to go, ___ I was tired.",
      options: ["but", "and", "because", "so"],
      correctAnswer: "but"
    },
    {
      question: "The past tense of 'run' is:",
      options: ["ran", "run", "running", "runs"],
      correctAnswer: "ran"
    }
  ],
  "Basic Coding": [
    {
      question: "Java Q1: Print Even Numbers from 1 to 10. Write a Java program to print all even numbers from 1 to 10. Expected Output: 2 4 6 8 10",
      options: [],
      type: "coding"
    },
    {
      question: "Java Q2: Check Positive or Negative Number. Write a Java program to check whether a number is positive, negative, or zero. Hint: Use if-else condition.",
      options: [],
      type: "coding"
    },
    {
      question: "Python Q1: Sum of List Elements. Write a Python program to calculate the sum of elements in a list. Example: list = [2, 4, 6]. Expected Output: 12",
      options: [],
      type: "coding"
    },
    {
      question: "Python Q2: Check if Number is Prime. Write a Python program to check if a number entered by the user is a prime number.",
      options: [],
      type: "coding"
    },
    {
      question: "SQL Q1: Select All Records. Write an SQL query to display all records from the table named 'students'.",
      options: [],
      type: "coding"
    },
    {
      question: "SQL Q2: Count Rows in a Table. Write an SQL query to count the number of rows in the 'orders' table.",
      options: [],
      type: "coding"
    }
  ]
};
