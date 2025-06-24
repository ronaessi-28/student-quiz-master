
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
      question: "Which layer of the OSI model is responsible for end-to-end delivery of messages?",
      options: ["Session Layer", "Transport Layer", "Network Layer", "Application Layer"],
      correctAnswer: "Transport Layer"
    },
    {
      question: "In which scenario would a switch fail to forward a frame?",
      options: ["If it doesn't know the destination MAC", "If it knows the source MAC", "If the frame is too long", "If it uses UDP"],
      correctAnswer: "If the frame is too long"
    },
    {
      question: "What is the purpose of the TTL field in an IP packet?",
      options: ["Error detection", "Packet sequencing", "Prevent routing loops", "Ensure encryption"],
      correctAnswer: "Prevent routing loops"
    },
    {
      question: "Which protocol uses 3-way handshaking?",
      options: ["FTP", "TCP", "UDP", "ICMP"],
      correctAnswer: "TCP"
    },
    {
      question: "Which of the following IP addresses belongs to Class B?",
      options: ["10.5.4.3", "172.16.0.1", "192.168.1.1", "224.0.0.1"],
      correctAnswer: "172.16.0.1"
    },
    {
      question: "What is the main purpose of ARP (Address Resolution Protocol)?",
      options: ["Convert IP to hostname", "Convert MAC to IP", "Convert IP to MAC", "Encrypt IP packets"],
      correctAnswer: "Convert IP to MAC"
    },
    {
      question: "Which of the following is true about UDP socket programming?",
      options: ["Connection is established before data is sent", "Reliable delivery is ensured", "Server must bind the socket", "Acknowledgments are mandatory"],
      correctAnswer: "Server must bind the socket"
    },
    {
      question: "Which command would show the routing table on a Unix system?",
      options: ["ping", "nslookup", "traceroute", "netstat -r"],
      correctAnswer: "netstat -r"
    },
    {
      question: "Consider the output of ping command: Reply from 192.168.1.1: bytes=32 time<1ms TTL=64. What does TTL=64 indicate?",
      options: ["Time left to transmit", "Delay in ms", "Number of hops remaining", "MAC address"],
      correctAnswer: "Number of hops remaining"
    },
    {
      question: "True/False: The OSI model has a total of 5 layers.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "C Language": [
    {
      question: "What will happen if a break statement is used outside a loop or switch?",
      options: ["Syntax error", "Skips the next line", "Program terminates", "Compiles but causes segmentation fault"],
      correctAnswer: "Syntax error"
    },
    {
      question: "Which of the following is not a valid storage class in C?",
      options: ["static", "register", "auto", "dynamic"],
      correctAnswer: "dynamic"
    },
    {
      question: "If a variable is declared as static inside a function, what is its scope and lifetime?",
      options: ["Global scope, function lifetime", "Function scope, global lifetime", "File scope, static lifetime", "Local scope, function lifetime"],
      correctAnswer: "Function scope, global lifetime"
    },
    {
      question: "What is the output of the expression 5 + 2 * 3?",
      options: ["21", "11", "15", "10"],
      correctAnswer: "11"
    },
    {
      question: "What does sizeof('A') return in C?",
      options: ["1", "2", "4", "Implementation dependent"],
      correctAnswer: "4"
    },
    {
      question: "What is the return type of main() in modern C standards?",
      options: ["void", "int", "float", "Depends on compiler"],
      correctAnswer: "int"
    },
    {
      question: "What will be the output of the following code? int a = 10; printf(\"%d %d\", a++, ++a);",
      options: ["10 11", "11 11", "Undefined behavior", "11 12"],
      correctAnswer: "Undefined behavior"
    },
    {
      question: "What is the output? char *p = \"Hello\"; printf(\"%c\", *&*p);",
      options: ["H", "e", "p", "Error"],
      correctAnswer: "H"
    },
    {
      question: "Which one causes a segmentation fault? int *p; *p = 10;",
      options: ["Always", "If memory not allocated", "Never", "Only on 32-bit systems"],
      correctAnswer: "If memory not allocated"
    },
    {
      question: "True/False: malloc() automatically initializes the allocated memory to zero.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "Data Structures using C": [
    {
      question: "In which of the following operations does a stack overflow occur?",
      options: ["When trying to pop from an empty stack", "When pushing into a full stack", "When accessing the top element", "When stack is initialized"],
      correctAnswer: "When pushing into a full stack"
    },
    {
      question: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: "O(1)"
    },
    {
      question: "In a circular queue, the condition front == rear means:",
      options: ["The queue is empty", "The queue is full", "An error has occurred", "It depends on initialization"],
      correctAnswer: "It depends on initialization"
    },
    {
      question: "What is the maximum number of nodes in a binary tree of height h?",
      options: ["2^h", "2^(h+1) - 1", "h", "2*h"],
      correctAnswer: "2^(h+1) - 1"
    },
    {
      question: "Which of the following sorting algorithms is not stable?",
      options: ["Bubble sort", "Merge sort", "Insertion sort", "Quick sort"],
      correctAnswer: "Quick sort"
    },
    {
      question: "Which traversal method results in nodes being visited in sorted order for a BST?",
      options: ["Pre-order", "Post-order", "In-order", "Level-order"],
      correctAnswer: "In-order"
    },
    {
      question: "What will be the output of the following code? int a[] = {10, 20, 30, 40}; printf(\"%d\", *(a + 2));",
      options: ["10", "20", "30", "Garbage"],
      correctAnswer: "30"
    },
    {
      question: "Suppose you implement a stack using an array. What does the following condition indicate? if(top == SIZE - 1)",
      options: ["Stack underflow", "Stack overflow", "Stack is empty", "Top element is about to be deleted"],
      correctAnswer: "Stack overflow"
    },
    {
      question: "What does this code segment do? struct node { int data; struct node *next; }; struct node *p = NULL; if (!p) printf(\"Empty\");",
      options: ["Prints address", "Prints \"Empty\"", "Error", "Nothing"],
      correctAnswer: "Prints \"Empty\""
    },
    {
      question: "True/False: A doubly linked list requires less memory than a singly linked list.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "DBMS": [
    {
      question: "Which of the following ensures referential integrity in a database?",
      options: ["Primary key", "Foreign key", "Unique key", "Super key"],
      correctAnswer: "Foreign key"
    },
    {
      question: "Which SQL statement is used to revoke previously granted privileges?",
      options: ["REMOVE", "GRANT", "DENY", "REVOKE"],
      correctAnswer: "REVOKE"
    },
    {
      question: "In ACID properties, isolation refers to:",
      options: ["Restricting unauthorized access", "Ensuring transactions do not interfere", "Saving all changes", "Recovering from failure"],
      correctAnswer: "Ensuring transactions do not interfere"
    },
    {
      question: "Which normal form eliminates transitive dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: "3NF"
    },
    {
      question: "Which of the following is not a DDL command?",
      options: ["CREATE", "ALTER", "UPDATE", "DROP"],
      correctAnswer: "UPDATE"
    },
    {
      question: "Which type of join returns all rows from the left table and matched rows from the right table?",
      options: ["INNER JOIN", "FULL JOIN", "LEFT JOIN", "RIGHT JOIN"],
      correctAnswer: "LEFT JOIN"
    },
    {
      question: "What will be the result of the following query? SELECT COUNT(*) FROM Students WHERE marks IS NULL;",
      options: ["Count of all students", "Count of students with marks = 0", "Count of students with no marks entered", "Syntax error"],
      correctAnswer: "Count of students with no marks entered"
    },
    {
      question: "Consider the tables: Employee(EID, Name, DeptID), Department(DeptID, DeptName). Which query returns employee names with their department names?",
      options: ["SELECT Name, DeptName FROM Employee, Department;", "SELECT Name, DeptName FROM Employee JOIN Department ON Employee.DeptID = Department.DeptID;", "SELECT Name FROM Employee;", "SELECT * FROM Employee FULL JOIN Department;"],
      correctAnswer: "SELECT Name, DeptName FROM Employee JOIN Department ON Employee.DeptID = Department.DeptID;"
    },
    {
      question: "What is the output of: SELECT 10 / 2 + 5 * 2;",
      options: ["10", "20", "15", "25"],
      correctAnswer: "15"
    },
    {
      question: "True/False: A candidate key can have multiple attributes.",
      options: ["True", "False"],
      correctAnswer: "True"
    }
  ],
  "OOPs using C++": [
    {
      question: "Which concept allows different functions to have the same name with different arguments?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Overloading"],
      correctAnswer: "Overloading"
    },
    {
      question: "What happens when a constructor is declared private in a class?",
      options: ["Object creation is not possible outside the class", "Destructor cannot be called", "It causes a compile-time error", "Only base class can access it"],
      correctAnswer: "Object creation is not possible outside the class"
    },
    {
      question: "Which of the following cannot be inherited in C++?",
      options: ["Private members", "Public members", "Protected members", "Constructors"],
      correctAnswer: "Constructors"
    },
    {
      question: "What is early binding also known as?",
      options: ["Static binding", "Runtime binding", "Late binding", "Dynamic dispatch"],
      correctAnswer: "Static binding"
    },
    {
      question: "Which operator must be overloaded as a member function?",
      options: ["<<", "[]", "+", "=="],
      correctAnswer: "[]"
    },
    {
      question: "In multiple inheritance, if two base classes have a function with the same signature, what happens?",
      options: ["Compile-time error", "Ambiguity occurs", "Calls both functions", "No error"],
      correctAnswer: "Ambiguity occurs"
    },
    {
      question: "What will be the output? class A { public: A() { cout << \"A\"; } }; class B : public A { public: B() { cout << \"B\"; } }; B obj;",
      options: ["A", "AB", "BA", "Compilation Error"],
      correctAnswer: "AB"
    },
    {
      question: "What is the output? class Base { public: virtual void show() { cout << \"Base\"; } }; class Derived : public Base { public: void show() { cout << \"Derived\"; } }; Base *b = new Derived(); b->show();",
      options: ["Base", "Derived", "Error", "BaseDerived"],
      correctAnswer: "Derived"
    },
    {
      question: "What does the following indicate? class A { public: A operator+(A a); };",
      options: ["Syntax error", "Function overloading", "Operator overloading", "Virtual function"],
      correctAnswer: "Operator overloading"
    },
    {
      question: "True/False: A class in C++ can have multiple destructors.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "Software Engineering": [
    {
      question: "In the Waterfall model, which phase comes immediately after requirements gathering?",
      options: ["Maintenance", "Design", "Testing", "Coding"],
      correctAnswer: "Design"
    },
    {
      question: "Which of the following is not a software process model?",
      options: ["Spiral", "V-Model", "Hybrid", "Machine Learning"],
      correctAnswer: "Machine Learning"
    },
    {
      question: "What is the main goal of software maintenance?",
      options: ["To reduce memory", "To fix bugs and improve performance", "To test software", "To rewrite software from scratch"],
      correctAnswer: "To fix bugs and improve performance"
    },
    {
      question: "In Agile, the term \"sprint\" refers to:",
      options: ["Full testing phase", "A fixed development timebox", "Project end date", "Error logging mechanism"],
      correctAnswer: "A fixed development timebox"
    },
    {
      question: "Which of the following is not a valid activity in Software Configuration Management (SCM)?",
      options: ["Version control", "Risk analysis", "Change control", "Status reporting"],
      correctAnswer: "Risk analysis"
    },
    {
      question: "What is coupling in software design?",
      options: ["Dependency between modules", "Complexity of algorithms", "Code indentation level", "Size of documentation"],
      correctAnswer: "Dependency between modules"
    },
    {
      question: "Which design principle supports reusability and minimal duplication?",
      options: ["DRY (Don't Repeat Yourself)", "KISS (Keep it simple stupid)", "YAGNI (You aren't gonna need it)", "SOLID"],
      correctAnswer: "DRY (Don't Repeat Yourself)"
    },
    {
      question: "Which model is best suited for software with unclear or changing requirements?",
      options: ["Waterfall", "V-Model", "Spiral", "Big Bang"],
      correctAnswer: "Spiral"
    },
    {
      question: "What is the Cyclomatic Complexity of a function with 5 decision points?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6"
    },
    {
      question: "True/False: A functional requirement describes how a system will do something rather than what it does.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "Operating System": [
    {
      question: "Which of the following scheduling algorithms may lead to starvation?",
      options: ["Round Robin", "FCFS", "Shortest Job First (SJF)", "Multilevel Queue"],
      correctAnswer: "Shortest Job First (SJF)"
    },
    {
      question: "Which of the following is not a valid state of a process?",
      options: ["New", "Running", "Waiting", "Compiling"],
      correctAnswer: "Compiling"
    },
    {
      question: "What is the purpose of paging in OS?",
      options: ["Increase security", "Manage CPU usage", "Provide virtual memory management", "Speed up network access"],
      correctAnswer: "Provide virtual memory management"
    },
    {
      question: "In a deadlock prevention strategy, which condition is typically denied?",
      options: ["Mutual Exclusion", "Hold and Wait", "Circular Wait", "Preemption"],
      correctAnswer: "Circular Wait"
    },
    {
      question: "What is a context switch?",
      options: ["Changing programming language", "Switching from user mode to kernel mode", "Saving and restoring state of a process", "Switching between two CPUs"],
      correctAnswer: "Saving and restoring state of a process"
    },
    {
      question: "Which of the following is true about thrashing?",
      options: ["It improves system performance", "It occurs when there is excess CPU usage", "It happens when the system spends more time swapping than executing", "It is related to cache memory"],
      correctAnswer: "It happens when the system spends more time swapping than executing"
    },
    {
      question: "If a system has 3 processes sharing 4 instances of a resource R, and each process can request at most 2 instances, will the system be in safe state?",
      options: ["Yes", "No", "Depends on initial allocation", "Can't be determined"],
      correctAnswer: "Yes"
    },
    {
      question: "Which command in Unix/Linux is used to list all running processes?",
      options: ["cd", "top", "kill", "ls"],
      correctAnswer: "top"
    },
    {
      question: "Which of the following page replacement algorithms can suffer from Belady's anomaly?",
      options: ["LRU", "Optimal", "FIFO", "LFU"],
      correctAnswer: "FIFO"
    },
    {
      question: "True/False: In preemptive scheduling, a running process can be interrupted and moved to ready state.",
      options: ["True", "False"],
      correctAnswer: "True"
    }
  ],
  "PHP": [
    {
      question: "Which of the following is the correct way to define a constant in PHP?",
      options: ["$CONSTANT = \"value\";", "const CONSTANT = \"value\";", "define(\"CONSTANT\", \"value\");", "Both b and c"],
      correctAnswer: "Both b and c"
    },
    {
      question: "What is the default method used for form submission if the method is not specified?",
      options: ["GET", "POST", "PUT", "REQUEST"],
      correctAnswer: "GET"
    },
    {
      question: "What does the isset() function check in PHP?",
      options: ["Whether a variable is true", "Whether a variable is empty", "Whether a variable is declared and not null", "Whether a variable is false"],
      correctAnswer: "Whether a variable is declared and not null"
    },
    {
      question: "What is the output type of echo in PHP?",
      options: ["String", "Void", "Boolean", "Integer"],
      correctAnswer: "Void"
    },
    {
      question: "Which superglobal holds cookie data in PHP?",
      options: ["$_POST", "$_GET", "$_COOKIE", "$_SESSION"],
      correctAnswer: "$_COOKIE"
    },
    {
      question: "Which of the following is true about PHP variables?",
      options: ["Variable names must start with a number", "Variables are case-insensitive", "Variables start with a $ sign", "PHP variables must be declared before use"],
      correctAnswer: "Variables start with a $ sign"
    },
    {
      question: "What will be the output of the following? $a = 5; $b = \"5\"; if ($a === $b) { echo \"Equal\"; } else { echo \"Not Equal\"; }",
      options: ["Equal", "Not Equal", "Error", "5"],
      correctAnswer: "Not Equal"
    },
    {
      question: "What will be the output? $arr = array(1 => \"One\", 2 => \"Two\", 3 => \"Three\"); echo $arr[2];",
      options: ["One", "Two", "Three", "Error"],
      correctAnswer: "Two"
    },
    {
      question: "What does the following code do? $x = NULL; var_dump(isset($x));",
      options: ["true", "false", "NULL", "0"],
      correctAnswer: "false"
    },
    {
      question: "True/False: In PHP, variable names are case-sensitive.",
      options: ["True", "False"],
      correctAnswer: "True"
    }
  ],
  "MySQL": [
    {
      question: "Which MySQL command is used to change the structure of an existing table?",
      options: ["MODIFY", "UPDATE", "ALTER", "CHANGE"],
      correctAnswer: "ALTER"
    },
    {
      question: "Which data type is best for storing precise currency values?",
      options: ["FLOAT", "INT", "DECIMAL", "DOUBLE"],
      correctAnswer: "DECIMAL"
    },
    {
      question: "What does the NOT NULL constraint do?",
      options: ["Disallows duplicate values", "Disallows blank entries", "Disallows NULL entries", "Disallows zero"],
      correctAnswer: "Disallows NULL entries"
    },
    {
      question: "In MySQL, what does the AUTO_INCREMENT attribute do?",
      options: ["Prevents NULL values", "Increases the column width", "Automatically increments the column value by 1", "Forces the column to be unique"],
      correctAnswer: "Automatically increments the column value by 1"
    },
    {
      question: "Which SQL clause is used to filter grouped results?",
      options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
      correctAnswer: "HAVING"
    },
    {
      question: "Which of the following will give the current date and time in MySQL?",
      options: ["CURRENT_DATE", "SYSDATE()", "CURDATE()", "NOW()"],
      correctAnswer: "NOW()"
    },
    {
      question: "What will be the output of this query? SELECT LENGTH(\"MySQL\") AS Length;",
      options: ["5", "6", "MySQL", "Error"],
      correctAnswer: "5"
    },
    {
      question: "Consider the table students(name, score). What will this query return? SELECT AVG(score) FROM students;",
      options: ["Highest score", "Sum of scores", "Mean score", "Score of first student"],
      correctAnswer: "Mean score"
    },
    {
      question: "What is the result of: SELECT 10 DIV 3;",
      options: ["3", "3.33", "10.00", "1"],
      correctAnswer: "3"
    },
    {
      question: "True/False: The GROUP BY clause must always be used with aggregate functions.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "Web Development": [
    {
      question: "Which of the following HTML elements is semantically correct for marking up navigation links?",
      options: ["<nav>", "<div>", "<ul>", "<section>"],
      correctAnswer: "<nav>"
    },
    {
      question: "In CSS, what does position: absolute; do?",
      options: ["Positions relative to its own element", "Positions relative to the nearest non-static parent", "Fixes it at the bottom", "Makes it float"],
      correctAnswer: "Positions relative to the nearest non-static parent"
    },
    {
      question: "What HTTP status code indicates a redirect?",
      options: ["200", "301", "404", "500"],
      correctAnswer: "301"
    },
    {
      question: "Which tag is used to link an external CSS file in HTML?",
      options: ["<css>", "<link>", "<style>", "<script>"],
      correctAnswer: "<link>"
    },
    {
      question: "What does the defer attribute in a <script> tag do?",
      options: ["Delays page load", "Loads the script after HTML parsing", "Prevents script execution", "Pauses DOM loading"],
      correctAnswer: "Loads the script after HTML parsing"
    },
    {
      question: "Which of the following is not a valid JavaScript data type?",
      options: ["String", "Boolean", "Character", "Undefined"],
      correctAnswer: "Character"
    },
    {
      question: "What is the output of the following JavaScript? console.log(2 + '2');",
      options: ["4", "22", "NaN", "Error"],
      correctAnswer: "22"
    },
    {
      question: "Consider this CSS: div { background-color: red; } .box { background-color: blue; } And HTML: <div class=\"box\"></div>. What is the background color of the div?",
      options: ["Red", "Blue", "Error", "Transparent"],
      correctAnswer: "Blue"
    },
    {
      question: "Which of the following uses AJAX correctly?",
      options: ["Submitting a form without page reload", "Redirecting to another page", "Styling a component dynamically", "Creating popups"],
      correctAnswer: "Submitting a form without page reload"
    },
    {
      question: "True/False: In HTML, the <div> tag is a semantic element.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ],
  "Java": [
    {
      question: "What is the default value of a boolean variable in Java?",
      options: ["true", "false", "null", "0"],
      correctAnswer: "false"
    },
    {
      question: "Which of the following is true about Java?",
      options: ["Java supports multiple inheritance using classes", "Java is platform dependent", "Java uses automatic garbage collection", "Java does not support multithreading"],
      correctAnswer: "Java uses automatic garbage collection"
    },
    {
      question: "What is the output of System.out.println(10 + 20 + \"30\")?",
      options: ["3030", "102030", "3030", "3030"],
      correctAnswer: "3030"
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["inherits", "extend", "extends", "implements"],
      correctAnswer: "extends"
    },
    {
      question: "Which of the following is not a feature of Java?",
      options: ["Object-oriented", "Platform independent", "Supports pointers", "Robust"],
      correctAnswer: "Supports pointers"
    },
    {
      question: "What is the size of an int in Java?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on system"],
      correctAnswer: "4 bytes"
    },
    {
      question: "What will this code output? int x = 5; System.out.println(++x * 2);",
      options: ["10", "12", "11", "14"],
      correctAnswer: "12"
    },
    {
      question: "What happens when an exception is not caught in Java?",
      options: ["Compiles but skips the error", "The program terminates abnormally", "The exception is ignored", "The JVM automatically recovers"],
      correctAnswer: "The program terminates abnormally"
    },
    {
      question: "What is the output? String s1 = \"abc\"; String s2 = new String(\"abc\"); System.out.println(s1 == s2);",
      options: ["true", "false", "Compile error", "NullPointerException"],
      correctAnswer: "false"
    },
    {
      question: "True/False: Java supports operator overloading like C++.",
      options: ["True", "False"],
      correctAnswer: "False"
    }
  ]
};
