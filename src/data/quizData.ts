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
  ],
  "Quantitative Aptitude": [
    {
      question: "Find the smallest number which when divided by 12, 18, and 30 leaves a remainder of 4 in each case.",
      options: ["184", "364", "368", "188"],
      correctAnswer: "184"
    },
    {
      question: "The LCM of two numbers is 240 and their HCF is 12. If one number is 60, find the other.",
      options: ["36", "48", "72", "60"],
      correctAnswer: "48"
    },
    {
      question: "A can complete a work in 15 days and B in 10 days. They worked together for 5 days. What fraction of the work is left?",
      options: ["1/4", "1/3", "1/2", "2/3"],
      correctAnswer: "1/6"
    },
    {
      question: "A pipe can fill a tank in 12 minutes, and another empties it in 8 minutes. Both open together. Time to empty full tank?",
      options: ["48 min", "24 min", "32 min", "96 min"],
      correctAnswer: "24 min"
    },
    {
      question: "A train at 60 km/hr crosses a pole in 9 seconds. What is its length?",
      options: ["150 m", "135 m", "180 m", "120 m"],
      correctAnswer: "150 m"
    },
    {
      question: "A boat covers 40 km downstream in 4 hrs and returns in 5 hrs. Stream speed?",
      options: ["1 km/hr", "2 km/hr", "3 km/hr", "4 km/hr"],
      correctAnswer: "1 km/hr"
    },
    {
      question: "A's income is 20% more than B's. How much less is B's income compared to A's?",
      options: ["16.67%", "20%", "25%", "12.5%"],
      correctAnswer: "16.67%"
    },
    {
      question: "Two dice are thrown. What is the probability the sum is divisible by 3?",
      options: ["1/3", "2/9", "5/18", "1/2"],
      correctAnswer: "1/3"
    },
    {
      question: "What day of the week was 26th January 1950?",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      correctAnswer: "Thursday"
    },
    {
      question: "CI on ₹8000 for 2 years at 10% per annum compounded yearly is:",
      options: ["₹1600", "₹1680", "₹1760", "₹1800"],
      correctAnswer: "₹1680"
    },
    {
      question: "Area of a sector with radius 7 cm and angle 60° is:",
      options: ["25.67 cm²", "22.5 cm²", "27.5 cm²", "30.25 cm²"],
      correctAnswer: "25.67 cm²"
    },
    {
      question: "Volume of a cone with radius 3 cm and height 4 cm?",
      options: ["12π cm³", "16π cm³", "18π cm³", "24π cm³"],
      correctAnswer: "12π cm³"
    },
    {
      question: "Angle of depression = 30°, height = 60 m. Distance of car?",
      options: ["60√3 m", "60 m", "30√3 m", "60/√3 m"],
      correctAnswer: "60√3 m"
    },
    {
      question: "15th term of A.P. 7, 11, 15, …?",
      options: ["63", "59", "67", "69"],
      correctAnswer: "63"
    },
    {
      question: "A:B:C invest ₹10000, ₹15000, ₹20000. Profit = ₹42000. B's share?",
      options: ["₹12000", "₹14000", "₹15000", "₹16000"],
      correctAnswer: "₹14000"
    },
    {
      question: "Mix ₹10/kg rice with ₹15/kg rice to get ₹12/kg. Ratio?",
      options: ["3:2", "2:3", "1:2", "2:1"],
      correctAnswer: "3:2"
    },
    {
      question: "Solve: x² - 5x + 6 = 0",
      options: ["x = 2 or 3", "x = -2 or -3", "x = 1 or 6", "x = -1 or -6"],
      correctAnswer: "x = 2 or 3"
    },
    {
      question: "Average of 5 consecutive odd numbers is 35. Smallest number?",
      options: ["31", "33", "29", "35"],
      correctAnswer: "31"
    },
    {
      question: "A + B = 45, 5 years ago A = 2×B. Find A.",
      options: ["25", "30", "35", "20"],
      correctAnswer: "35"
    },
    {
      question: "Gain = 12% after 10% discount. MP = ₹250. CP?",
      options: ["₹180", "₹200", "₹210", "₹225"],
      correctAnswer: "₹200"
    },
    {
      question: "SI on ₹5000 for 3 yrs is ₹900. Rate?",
      options: ["4%", "5%", "6%", "7%"],
      correctAnswer: "6%"
    },
    {
      question: "Angles in ratio 3:4:5. Largest angle?",
      options: ["60°", "90°", "75°", "100°"],
      correctAnswer: "75°"
    },
    {
      question: "\"MOBILE\" → \"OMCJNG\". \"TABLET\" = ?",
      options: ["VBMDGU", "VBCDUG", "UACMFS", "UBODVG"],
      correctAnswer: "VBCDUG"
    },
    {
      question: "√784 + √625 − √121 = ?",
      options: ["50", "48", "46", "44"],
      correctAnswer: "46"
    },
    {
      question: "How many ways to arrange \"MATHS\"?",
      options: ["120", "60", "24", "100"],
      correctAnswer: "120"
    },
    {
      question: "Angle at 3:30 between hands?",
      options: ["90°", "75°", "105°", "60°"],
      correctAnswer: "75°"
    },
    {
      question: "A gives B 100 m in 1 km race and still wins by 40 m. In 1 mile (1609 m), how much headstart does A give B?",
      options: ["140 m", "160 m", "180 m", "120 m"],
      correctAnswer: "160 m"
    },
    {
      question: "Solve: log₂(8x) = 5",
      options: ["4", "8", "2", "1"],
      correctAnswer: "4"
    },
    {
      question: "What day of the week will be 15th August 2047?",
      options: ["Thursday", "Friday", "Saturday", "Sunday"],
      correctAnswer: "Thursday"
    },
    {
      question: "A card drawn from pack. P(Even number < 9)?",
      options: ["4/13", "6/13", "3/13", "2/13"],
      correctAnswer: "4/13"
    },
    {
      question: "CP of 2 items = ₹300 each. One sold at 20% profit, other at 20% loss. Overall % gain/loss?",
      options: ["0%", "2% gain", "4% loss", "5% gain"],
      correctAnswer: "4% loss"
    }
  ],
  "Logical Ability": [
    {
      question: "All apples are fruits. Some fruits are bananas. Conclusion?",
      options: ["Some bananas are apples", "Some apples are bananas", "All fruits are apples", "No conclusion"],
      correctAnswer: "No conclusion"
    },
    {
      question: "2, 6, 12, 20, 30, ?",
      options: ["40", "42", "36", "38"],
      correctAnswer: "42"
    },
    {
      question: "Walks 3 km North, turns right 4 km, then left 5 km. Direction from start?",
      options: ["North-East", "South-East", "North-West", "South-West"],
      correctAnswer: "North-East"
    },
    {
      question: "2, 3, 5, 7, 11, 14, 17, 19",
      options: ["11", "14", "17", "3"],
      correctAnswer: "14"
    },
    {
      question: "Needs 60% in both Maths and English. Scored 65% Maths, 58% English. Result?",
      options: ["Pass", "Fail", "Not Clear", "Depends"],
      correctAnswer: "Fail"
    },
    {
      question: "A, B, C, D, E in row. C right of D, left of B. A one end, E other end. Center?",
      options: ["A", "C", "B", "D"],
      correctAnswer: "D"
    },
    {
      question: "1, 4, 9, 16, ?",
      options: ["24", "25", "36", "30"],
      correctAnswer: "25"
    },
    {
      question: "Seed, Tree, Plant, Fruit, Flower",
      options: ["Seed, Plant, Tree, Flower, Fruit", "Seed, Plant, Flower, Tree, Fruit", "Seed, Plant, Tree, Fruit, Flower", "Plant, Seed, Tree, Fruit, Flower"],
      correctAnswer: "Seed, Plant, Tree, Flower, Fruit"
    },
    {
      question: "Foot : Shoe :: Hand : ?",
      options: ["Watch", "Glove", "Ring", "Sleeve"],
      correctAnswer: "Glove"
    },
    {
      question: "Is A older than B? (1) A > C (2) C > B",
      options: ["Only 1", "Only 2", "Both", "Either"],
      correctAnswer: "Both"
    },
    {
      question: "Pen, Pencil, Eraser, Bottle",
      options: ["Pen", "Pencil", "Eraser", "Bottle"],
      correctAnswer: "Bottle"
    },
    {
      question: "Facing North, turns right, walks 5 m, turns right again, walks 5 m. Final direction?",
      options: ["South", "North", "East", "West"],
      correctAnswer: "South"
    },
    {
      question: "6 persons sit around table. A between B and C, D opposite B. Who is right of D?",
      options: ["C", "A", "E", "F"],
      correctAnswer: "A"
    }
  ],
  "Verbal Ability": [
    {
      question: "He don't know how to drive.",
      options: ["doesn't know", "don't knows", "does knows", "No correction"],
      correctAnswer: "doesn't know"
    },
    {
      question: "The sun ____ in the east.",
      options: ["rise", "rises", "rising", "rose"],
      correctAnswer: "rises"
    },
    {
      question: "(Give a passage in exam. Sample Q): What is the main idea of the paragraph?",
      options: ["Supportive", "Informative", "Persuasive", "Descriptive"],
      correctAnswer: "Informative"
    },
    {
      question: "The paragraph talks about saving nature. Theme?",
      options: ["Pollution", "Green Economy", "Environmental Awareness", "GDP"],
      correctAnswer: "Environmental Awareness"
    },
    {
      question: "It was raining heavily, so I ____ home.",
      options: ["stay", "stayed", "staying", "stays"],
      correctAnswer: "stayed"
    },
    {
      question: "Cat : Kitten :: Dog : ?",
      options: ["Cub", "Puppy", "Foal", "Calf"],
      correctAnswer: "Puppy"
    },
    {
      question: "(A) to the market (B) I went (C) buy vegetables (D) to",
      options: ["B-D-A-C", "A-C-D-B", "B-A-D-C", "C-D-B-A"],
      correctAnswer: "B-A-D-C"
    },
    {
      question: "Synonym of \"Elegant\":",
      options: ["Rough", "Graceful", "Dirty", "Cheap"],
      correctAnswer: "Graceful"
    },
    {
      question: "He go to school everyday.",
      options: ["He goes", "He went", "He going", "No error"],
      correctAnswer: "He goes"
    },
    {
      question: "\"Brilliant\":",
      options: ["Dull", "Sharp", "Intelligent", "Clever"],
      correctAnswer: "Intelligent"
    },
    {
      question: "By next week, he ____ his work.",
      options: ["will complete", "will have completed", "completed", "completes"],
      correctAnswer: "will have completed"
    },
    {
      question: "Each of the students must bring ____ own lunch.",
      options: ["his", "their", "our", "her"],
      correctAnswer: "his"
    },
    {
      question: "She is singing beautifully. Pick the main verb.",
      options: ["is", "singing", "beautifully", "she"],
      correctAnswer: "singing"
    },
    {
      question: "Either my brother or sister ____ going.",
      options: ["are", "is", "were", "be"],
      correctAnswer: "is"
    },
    {
      question: "He runs very fast. Identify adverb.",
      options: ["runs", "very", "fast", "He"],
      correctAnswer: "fast"
    },
    {
      question: "She was born ____ Delhi.",
      options: ["on", "in", "at", "to"],
      correctAnswer: "in"
    },
    {
      question: "He is ____ honest man.",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an"
    },
    {
      question: "Combine: He is poor. He is honest.",
      options: ["although", "but", "and", "yet"],
      correctAnswer: "but"
    },
    {
      question: "Antonym of \"Bold\":",
      options: ["Brave", "Cowardly", "Loud", "Strong"],
      correctAnswer: "Cowardly"
    },
    {
      question: "Pick correct spelling:",
      options: ["Achievment", "Achievement", "Acheivment", "Achievemant"],
      correctAnswer: "Achievement"
    },
    {
      question: "The letter was written by me. Active voice?",
      options: ["I wrote the letter", "Me wrote the letter", "I have written the letter", "I had wrote"],
      correctAnswer: "I wrote the letter"
    },
    {
      question: "She said, \"I am tired.\"",
      options: ["She said that she is tired.", "She said that she was tired.", "She said she were tired.", "She says she is tired."],
      correctAnswer: "She said that she was tired."
    }
  ],
  "Coding Questions": [
    {
      question: "Write a Java function that takes a sentence as input and reverses each word individually while maintaining the word order.\nInput: \"OpenAI builds AI\"\nExpected Output: \"IAnepO sdiulb IA\"",
      options: [],
      type: "coding"
    },
    {
      question: "Write a Java method that returns the first non-repeating character in a given string. Return '_' if all characters repeat.\nInput: \"programming\"\nExpected Output: 'p'",
      options: [],
      type: "coding"
    },
    {
      question: "Write a Python function that takes a list of words and groups them into anagrams.\nInput: [\"bat\", \"tab\", \"tap\", \"pat\", \"rat\"]\nExpected Output: [['bat', 'tab'], ['tap', 'pat'], ['rat']] (Order doesn't matter)",
      options: [],
      type: "coding"
    },
    {
      question: "Write a Python program that prints elements of a 2D matrix in spiral order.\nInput:\nmatrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n]\nExpected Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]",
      options: [],
      type: "coding"
    },
    {
      question: "Given a table employees(emp_id, name, department, salary), write an SQL query to return the department(s) having the highest average salary.",
      options: [],
      type: "coding"
    },
    {
      question: "Given a table users(id INT, email VARCHAR), write an SQL query to find all duplicate email addresses (those that appear more than once).",
      options: [],
      type: "coding"
    },
    {
      question: "Write a C function that returns 1 if a number is a power of 2, otherwise 0. Do not use loops or recursion.\nExample Input: 16\nExpected Output: 1",
      options: [],
      type: "coding"
    },
    {
      question: "Write your own function in C to reverse a string (similar to strrev() in some compilers). Do not use library functions.\nInput: \"Coding\"\nExpected Output: \"gnidoC\"",
      options: [],
      type: "coding"
    }
  ]
};
