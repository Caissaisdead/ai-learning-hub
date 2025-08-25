// Learning App JavaScript
class LearningApp {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.tasks = this.loadTasks();
        this.stats = this.loadStats();
        this.currentSyllabus = this.createSyllabus();
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCalendar();
        this.setupNotifications();
        this.loadDashboard();
        this.loadSyllabus();
        this.setupTaskManagement();
        this.updateProgress();
        this.setupChapterButtons();
        
        // Show notification modal after 2 seconds
        setTimeout(() => {
            this.showNotificationModal();
        }, 2000);
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(nl => nl.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Show corresponding section
                const sectionId = link.dataset.section;
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    // Dashboard Functions
    loadDashboard() {
        // Update stats
        document.getElementById('streak-count').textContent = this.stats.streak;
        document.getElementById('completed-tasks').textContent = this.stats.completedTasks;
        document.getElementById('study-hours').textContent = this.stats.studyHours;
        document.getElementById('achievements').textContent = this.stats.achievements;

        // Load today's tasks
        this.loadTodaysTasks();
        
        // Update motivational quote
        this.updateDailyQuote();
    }

    loadTodaysTasks() {
        const today = this.formatDate(new Date());
        const todayTasks = this.tasks[today] || [];
        
        const todayTasksContainer = document.getElementById('today-tasks');
        
        if (todayTasks.length === 0) {
            todayTasksContainer.innerHTML = `
                <div class="no-tasks">
                    <i class="fas fa-calendar-plus" style="font-size: 2rem; color: #3b82f6; margin-bottom: 1rem;"></i>
                    <h3>No tasks scheduled for today</h3>
                    <p>Go to the Calendar section to add your daily learning goals!</p>
                </div>
            `;
        } else {
            todayTasksContainer.innerHTML = `
                <h3>Today's Learning Goals:</h3>
                <div class="today-tasks-list">
                    ${todayTasks.map(task => `
                        <div class="today-task-item ${task.completed ? 'completed' : ''}">
                            <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                            <span>${task.text}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    updateDailyQuote() {
        const quotes = [
            "The expert in anything was once a beginner who refused to give up.",
            "Code is like humor. When you have to explain it, it's bad.",
            "The best time to plant a tree was 20 years ago. The second best time is now.",
            "AI is the new electricity. It will transform every industry.",
            "Learning never exhausts the mind. - Leonardo da Vinci",
            "The only way to do great work is to love what you do. - Steve Jobs",
            "In the middle of difficulty lies opportunity. - Albert Einstein",
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('daily-quote').textContent = randomQuote;
    }

    // Syllabus Creation
    createSyllabus() {
        return [
            {
                phase: "Phase 1: Programming Foundations",
                duration: "3-4 months",
                description: "Build your programming fundamentals",
                topics: [
                    "Variables, Data Types & Control Structures",
                    "Functions & Scope",
                    "Object-Oriented Programming",
                    "Error Handling & Debugging",
                    "File I/O & Data Processing",
                    "Version Control with Git",
                    "Testing & Code Quality",
                    "Command Line & Development Tools"
                ]
            },
            {
                phase: "Phase 2: Data Structures & Algorithms",
                duration: "4-5 months",
                description: "Master the core of computer science",
                topics: [
                    "Arrays, Lists & Strings",
                    "Stacks, Queues & Hash Tables",
                    "Trees & Binary Search Trees",
                    "Graphs & Graph Algorithms",
                    "Sorting & Searching Algorithms",
                    "Dynamic Programming",
                    "Recursion & Backtracking",
                    "Complexity Analysis (Big O)"
                ]
            },
            {
                phase: "Phase 3: Web Development",
                duration: "3-4 months",
                description: "Create powerful web applications",
                topics: [
                    "HTML5 & Semantic Markup",
                    "CSS3 & Modern Styling",
                    "JavaScript ES6+ Features",
                    "DOM Manipulation & Events",
                    "Asynchronous JavaScript",
                    "API Integration & Fetch",
                    "Modern Frameworks (React/Vue)",
                    "Backend Development (Node.js)"
                ]
            },
            {
                phase: "Phase 4: Database & Backend Systems",
                duration: "3-4 months",
                description: "Build scalable backend systems",
                topics: [
                    "SQL & Database Design",
                    "NoSQL Databases (MongoDB)",
                    "RESTful API Design",
                    "Authentication & Security",
                    "Microservices Architecture",
                    "Containerization (Docker)",
                    "Cloud Platforms (AWS/GCP)",
                    "Performance Optimization"
                ]
            },
            {
                phase: "Phase 5: Mathematics for AI",
                duration: "4-5 months",
                description: "Essential math foundation for AI",
                topics: [
                    "Linear Algebra & Vectors",
                    "Calculus & Derivatives",
                    "Statistics & Probability",
                    "Matrix Operations",
                    "Optimization Techniques",
                    "Information Theory",
                    "Graph Theory",
                    "Numerical Methods"
                ]
            },
            {
                phase: "Phase 6: Machine Learning Fundamentals",
                duration: "5-6 months",
                description: "Core machine learning concepts",
                topics: [
                    "Supervised vs Unsupervised Learning",
                    "Linear & Logistic Regression",
                    "Decision Trees & Random Forests",
                    "Support Vector Machines",
                    "K-Means & Clustering",
                    "Cross-Validation & Model Selection",
                    "Feature Engineering",
                    "Bias-Variance Tradeoff"
                ]
            },
            {
                phase: "Phase 7: Deep Learning",
                duration: "6-8 months",
                description: "Neural networks and deep learning",
                topics: [
                    "Neural Network Fundamentals",
                    "Backpropagation Algorithm",
                    "Convolutional Neural Networks",
                    "Recurrent Neural Networks",
                    "LSTM & GRU Networks",
                    "Autoencoders & GANs",
                    "Transfer Learning",
                    "PyTorch & TensorFlow"
                ]
            },
            {
                phase: "Phase 8: Advanced AI Topics",
                duration: "6-8 months",
                description: "Cutting-edge AI technologies",
                topics: [
                    "Natural Language Processing",
                    "Computer Vision",
                    "Reinforcement Learning",
                    "Transformers & Attention",
                    "BERT, GPT & Large Language Models",
                    "Diffusion Models",
                    "Multi-Modal AI",
                    "AI Ethics & Fairness"
                ]
            },
            {
                phase: "Phase 9: MLOps & Production",
                duration: "4-5 months",
                description: "Deploy AI systems at scale",
                topics: [
                    "Model Deployment Strategies",
                    "CI/CD for Machine Learning",
                    "Model Monitoring & Maintenance",
                    "A/B Testing for Models",
                    "Kubernetes for ML",
                    "Feature Stores",
                    "Data Pipelines",
                    "Model Versioning"
                ]
            },
            {
                phase: "Phase 10: Research & Innovation",
                duration: "Ongoing",
                description: "Stay current with latest developments",
                topics: [
                    "Reading Research Papers",
                    "Implementing Novel Architectures",
                    "Contributing to Open Source",
                    "Building Personal Projects",
                    "Conference Presentations",
                    "Networking & Community",
                    "Mentoring Others",
                    "Continuous Learning"
                ]
            }
        ];
    }

    loadSyllabus() {
        const syllabusContainer = document.getElementById('syllabus-content');
        
        syllabusContainer.innerHTML = this.currentSyllabus.map((phase, index) => `
            <div class="phase-card" style="animation-delay: ${index * 0.1}s">
                <div class="phase-header">
                    <div>
                        <h3 class="phase-title">${phase.phase}</h3>
                        <p class="phase-duration">Duration: ${phase.duration}</p>
                        <p style="color: #9ca3af; margin-top: 0.5rem;">${phase.description}</p>
                    </div>
                </div>
                <div class="topics-grid">
                    ${phase.topics.map(topic => `
                        <div class="topic-item">${topic}</div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Calendar System
    setupCalendar() {
        this.renderCalendar();
        
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        
        document.getElementById('current-month').textContent = 
            `${monthNames[currentMonth]} ${currentYear}`;
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        const calendarGrid = document.getElementById('calendar-grid');
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const headerElement = document.createElement('div');
            headerElement.className = 'calendar-day-header';
            headerElement.textContent = day;
            headerElement.style.cssText = `
                background: rgba(59, 130, 246, 0.2);
                color: #3b82f6;
                font-weight: 600;
                font-size: 0.875rem;
                padding: 0.75rem;
                text-align: center;
            `;
            calendarGrid.appendChild(headerElement);
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            emptyDay.style.opacity = '0.3';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const dateStr = this.formatDate(new Date(currentYear, currentMonth, day));
            
            // Check if it's today
            if (currentYear === today.getFullYear() && 
                currentMonth === today.getMonth() && 
                day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Check if day has tasks
            if (this.tasks[dateStr] && this.tasks[dateStr].length > 0) {
                dayElement.classList.add('has-tasks');
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(d => 
                    d.classList.remove('selected'));
                dayElement.classList.add('selected');
                
                this.selectedDate = dateStr;
                this.showDayDetails(dateStr);
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    showDayDetails(dateStr) {
        const dayDetails = document.getElementById('day-details');
        const selectedDateElement = document.getElementById('selected-date');
        const tasksListElement = document.getElementById('tasks-list');
        
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        selectedDateElement.textContent = formattedDate;
        
        const dayTasks = this.tasks[dateStr] || [];
        
        tasksListElement.innerHTML = dayTasks.map((task, index) => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn" onclick="app.toggleTask('${dateStr}', ${index})">
                        <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="delete-btn" onclick="app.deleteTask('${dateStr}', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        dayDetails.style.display = 'block';
    }

    // Task Management
    setupTaskManagement() {
        const addTaskButton = document.getElementById('add-task');
        const newTaskInput = document.getElementById('new-task');
        
        addTaskButton.addEventListener('click', () => this.addTask());
        newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    addTask() {
        const newTaskInput = document.getElementById('new-task');
        const taskText = newTaskInput.value.trim();
        
        if (taskText && this.selectedDate) {
            if (!this.tasks[this.selectedDate]) {
                this.tasks[this.selectedDate] = [];
            }
            
            this.tasks[this.selectedDate].push({
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            });
            
            newTaskInput.value = '';
            this.saveTasks();
            this.showDayDetails(this.selectedDate);
            this.renderCalendar(); // Refresh calendar to show task indicator
            this.loadTodaysTasks(); // Update dashboard if today
        }
    }

    toggleTask(dateStr, taskIndex) {
        if (this.tasks[dateStr] && this.tasks[dateStr][taskIndex]) {
            this.tasks[dateStr][taskIndex].completed = !this.tasks[dateStr][taskIndex].completed;
            
            // Update stats if task was completed
            if (this.tasks[dateStr][taskIndex].completed) {
                this.stats.completedTasks++;
            } else {
                this.stats.completedTasks--;
            }
            
            this.saveTasks();
            this.saveStats();
            this.showDayDetails(dateStr);
            this.loadDashboard();
        }
    }

    deleteTask(dateStr, taskIndex) {
        if (this.tasks[dateStr] && this.tasks[dateStr][taskIndex]) {
            // Decrease completed tasks count if task was completed
            if (this.tasks[dateStr][taskIndex].completed) {
                this.stats.completedTasks--;
            }
            
            this.tasks[dateStr].splice(taskIndex, 1);
            
            // Remove date entry if no tasks left
            if (this.tasks[dateStr].length === 0) {
                delete this.tasks[dateStr];
            }
            
            this.saveTasks();
            this.saveStats();
            this.showDayDetails(dateStr);
            this.renderCalendar();
            this.loadDashboard();
        }
    }

    // Notification System
    setupNotifications() {
        // Request notification permission when user enables
        document.getElementById('enable-notifications').addEventListener('click', () => {
            this.requestNotificationPermission();
        });
        
        document.getElementById('skip-notifications').addEventListener('click', () => {
            this.hideNotificationModal();
        });
        
        // Set up daily notifications
        this.setupDailyNotifications();
    }

    showNotificationModal() {
        if (Notification.permission === 'default') {
            document.getElementById('notification-modal').style.display = 'block';
        }
    }

    hideNotificationModal() {
        document.getElementById('notification-modal').style.display = 'none';
    }

    requestNotificationPermission() {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                this.showNotification('Notifications Enabled!', 
                    'You\'ll receive daily reminders to stay on track with your learning goals.');
                this.hideNotificationModal();
                this.setupDailyNotifications();
            }
        });
    }

    showNotification(title, message, options = {}) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚀</text></svg>',
                badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
                ...options
            });
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }
    }

    setupDailyNotifications() {
        if (Notification.permission === 'granted') {
            // Send notification every day at 9 AM
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(9, 0, 0, 0);
            
            const timeUntilNotification = tomorrow.getTime() - now.getTime();
            
            setTimeout(() => {
                this.sendDailyNotification();
                // Set up recurring daily notifications
                setInterval(() => {
                    this.sendDailyNotification();
                }, 24 * 60 * 60 * 1000); // 24 hours
            }, timeUntilNotification);
        }
    }

    sendDailyNotification() {
        const today = this.formatDate(new Date());
        const todayTasks = this.tasks[today] || [];
        const incompleteTasks = todayTasks.filter(task => !task.completed);
        
        let message;
        if (incompleteTasks.length === 0) {
            message = "Ready to conquer new learning goals today?";
        } else {
            message = `You have ${incompleteTasks.length} learning task${incompleteTasks.length > 1 ? 's' : ''} waiting for you!`;
        }
        
        this.showNotification('Time to Learn! 🧠', message);
    }

    // Progress Tracking
    updateProgress() {
        // Calculate overall progress based on completed phases/chapters
        const totalPhases = this.currentSyllabus.length;
        const completedPhases = 0; // This would be dynamic based on actual progress
        const progressPercentage = Math.round((completedPhases / totalPhases) * 100);
        
        // Update progress ring
        const circumference = 2 * Math.PI * 54; // radius = 54
        const offset = circumference - (progressPercentage / 100) * circumference;
        
        const progressRing = document.querySelector('.progress-ring-circle:nth-child(2)');
        if (progressRing) {
            progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
            progressRing.style.strokeDashoffset = offset;
        }
        
        // Update percentage text
        const percentageElement = document.querySelector('.progress-percentage');
        if (percentageElement) {
            percentageElement.textContent = `${progressPercentage}%`;
        }
    }

    // Data Persistence
    loadTasks() {
        const saved = localStorage.getItem('learningApp_tasks');
        return saved ? JSON.parse(saved) : {};
    }

    saveTasks() {
        localStorage.setItem('learningApp_tasks', JSON.stringify(this.tasks));
    }

    loadStats() {
        const saved = localStorage.getItem('learningApp_stats');
        return saved ? JSON.parse(saved) : {
            streak: 0,
            completedTasks: 0,
            studyHours: 0,
            achievements: 0
        };
    }

    saveStats() {
        localStorage.setItem('learningApp_stats', JSON.stringify(this.stats));
    }

    // Chapter System
    setupChapterButtons() {
        console.log('Setting up chapter buttons...');
        
        // Add click handlers for chapter buttons
        document.addEventListener('click', (e) => {
            console.log('Click detected:', e.target);
            console.log('Button classes:', e.target.classList);
            console.log('Button text:', e.target.textContent);
            
            if (e.target.classList.contains('btn-primary') && e.target.textContent.trim() === 'Start Chapter') {
                console.log('Start Chapter button clicked!');
                this.startChapter(e.target);
            }
            if (e.target.classList.contains('btn-primary') && e.target.textContent.trim() === 'Start Exercise') {
                alert('Complete Chapter 1 first to unlock exercises!');
            }
        });
        
        console.log('Chapter buttons setup complete');
    }

    startChapter(button) {
        const chapterCard = button.closest('.chapter-card');
        const chapterTitle = chapterCard.querySelector('h3').textContent;
        
        if (chapterTitle.includes('Chapter 1')) {
            this.loadChapter1();
        } else {
            alert('This chapter will be unlocked after completing previous chapters!');
        }
    }

    loadChapter1() {
        // Create chapter content modal
        const modal = document.createElement('div');
        modal.className = 'modal chapter-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content chapter-content">
                <div class="chapter-header">
                    <h2>📘 Chapter 1: Variables & Data Types</h2>
                    <button class="close-chapter" onclick="this.closest('.modal').remove()">×</button>
                </div>
                
                <div class="chapter-body">
                    <div class="lesson-nav">
                        <button class="lesson-btn active" data-lesson="introduction">Introduction</button>
                        <button class="lesson-btn" data-lesson="datatypes">Data Types</button>
                        <button class="lesson-btn" data-lesson="examples">Examples</button>
                        <button class="lesson-btn" data-lesson="exercises">Exercises</button>
                        <button class="lesson-btn" data-lesson="quiz">Quiz</button>
                    </div>
                    
                    <div class="lesson-content" id="lesson-content">
                        ${this.getIntroductionContent()}
                    </div>
                    
                    <div class="lesson-footer">
                        <button class="btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                        <button class="btn-primary next-lesson">Next: Data Types →</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupLessonNavigation(modal);
    }

    setupLessonNavigation(modal) {
        const lessonBtns = modal.querySelectorAll('.lesson-btn');
        const lessonContent = modal.querySelector('#lesson-content');
        const nextBtn = modal.querySelector('.next-lesson');
        
        lessonBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                lessonBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Load lesson content
                const lesson = btn.dataset.lesson;
                lessonContent.innerHTML = this.getLessonContent(lesson);
                
                // Update next button
                this.updateNextButton(lesson, nextBtn);
            });
        });
        
        nextBtn.addEventListener('click', () => {
            const activeBtn = modal.querySelector('.lesson-btn.active');
            const currentLesson = activeBtn.dataset.lesson;
            const lessons = ['introduction', 'datatypes', 'examples', 'exercises', 'quiz'];
            const currentIndex = lessons.indexOf(currentLesson);
            
            if (currentIndex < lessons.length - 1) {
                const nextLesson = lessons[currentIndex + 1];
                const nextBtn = modal.querySelector(`[data-lesson="${nextLesson}"]`);
                nextBtn.click();
            }
        });
    }

    getLessonContent(lesson) {
        const content = {
            introduction: this.getIntroductionContent(),
            datatypes: this.getDataTypesContent(),
            examples: this.getExamplesContent(),
            exercises: this.getExercisesContent(),
            quiz: this.getQuizContent()
        };
        
        return content[lesson] || '<p>Content coming soon...</p>';
    }

    getIntroductionContent() {
        return `
            <div class="lesson-section">
                <h3>🎯 Welcome to Your First Programming Lesson!</h3>
                <p>Variables are the foundation of all programming. Think of them as <strong>labeled containers</strong> that store information your program needs to remember.</p>
                
                <div class="concept-box">
                    <h4>Why Variables Matter:</h4>
                    <ul>
                        <li>🔄 <strong>Reusability</strong> - Use the same data multiple times</li>
                        <li>📖 <strong>Readability</strong> - Makes code easier to understand</li>
                        <li>🔧 <strong>Flexibility</strong> - Easy to update values</li>
                        <li>💾 <strong>Memory</strong> - Efficient data storage</li>
                    </ul>
                </div>
                
                <div class="code-example">
                    <h4>Your First Variable:</h4>
                    <pre><code class="language-python"># Creating a variable is like labeling a box
name = "Your Name"
print(f"Hello, $\{name}!")  # Output: Hello, Your Name!</code></pre>
                </div>
                
                <p>In this simple example, <code>name</code> is a variable that stores the text "Your Name". We can use it anywhere in our program!</p>
            </div>
        `;
    }

    getDataTypesContent() {
        return `
            <div class="lesson-section">
                <h3>📊 Essential Data Types</h3>
                <p>Different types of data require different containers. Here are the fundamental types:</p>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>🔢 Integers (int)</h4>
                        <p>Whole numbers: positive, negative, or zero</p>
                        <pre><code>age = 25
score = -10
year = 2024</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🎯 Floats (float)</h4>
                        <p>Numbers with decimal points</p>
                        <pre><code>price = 19.99
height = 5.8
pi = 3.14159</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>📝 Strings (str)</h4>
                        <p>Text data enclosed in quotes</p>
                        <pre><code>name = "Alice"
message = 'Hello World!'
address = "123 Main St"</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>✅ Booleans (bool)</h4>
                        <p>True or False values</p>
                        <pre><code>is_student = True
has_job = False
is_adult = age >= 18</code></pre>
                    </div>
                </div>
                
                <div class="pro-tip">
                    <h4>💡 Pro Tip:</h4>
                    <p>Use <code>type(variable_name)</code> to check what type your variable is!</p>
                    <pre><code>print(type(age))     # <class 'int'>
print(type(price))   # <class 'float'>
print(type(name))    # <class 'str'></code></pre>
                </div>
            </div>
        `;
    }

    getExamplesContent() {
        return `
            <div class="lesson-section">
                <h3>💡 Real-World Examples</h3>
                
                <div class="example-section">
                    <h4>🎓 Student Profile System</h4>
                    <pre><code class="language-python"># Student information
student_name = "Sarah Johnson"
student_id = 12345
gpa = 3.75
is_honors = True
courses = ["Math", "Science", "History"]

# Using the variables
print(f"Student: $\{student_name}")
print(f"ID: $\{student_id}")
print(f"GPA: $\{gpa}")
print(f"Honors Student: $\{is_honors}")
print(f"Courses: $\{len(courses)}")
</code></pre>
                </div>
                
                <div class="example-section">
                    <h4>🛒 Shopping Cart Calculator</h4>
                    <pre><code class="language-python"># Product details
product = "Laptop"
price = 999.99
quantity = 2
tax_rate = 0.08

# Calculations
subtotal = price * quantity
tax = subtotal * tax_rate
total = subtotal + tax

print(f"Product: $\{product}")
print(f"Quantity: $\{quantity}")
print(f"Subtotal: $\{subtotal:.2f}")
print(f"Tax: $\{tax:.2f}")
print(f"Total: $\{total:.2f}")
</code></pre>
                </div>
                
                <div class="interactive-demo">
                    <h4>🎮 Try It Yourself!</h4>
                    <p>Copy this code and change the values to see what happens:</p>
                    <pre><code># Your turn - modify these values!
your_name = "Enter your name here"
favorite_number = 7
is_learning_fun = True

print(f"Hi $\{your_name}!")
print(f"Your favorite number is $\{favorite_number}")
print(f"Learning is fun: $\{is_learning_fun}")
</code></pre>
                </div>
            </div>
        `;
    }

    getExercisesContent() {
        return `
            <div class="lesson-section">
                <h3>🏋️‍♂️ Practice Exercises</h3>
                
                <div class="exercise-card">
                    <h4>Exercise 1: Personal Profile</h4>
                    <p>Create variables to store information about yourself:</p>
                    <pre><code># Fill in your information
first_name = ""  # Your first name
last_name = ""   # Your last name
age = 0          # Your age
favorite_color = ""  # Your favorite color

# Create a full name and birth year
full_name = # Combine first and last name
birth_year = # Calculate: 2024 - age

# Print your profile
print(f"Name: $\{full_name}")
print(f"Age: $\{age}")
print(f"Born: $\{birth_year}")
print(f"Favorite Color: $\{favorite_color}")
</code></pre>
                </div>
                
                <div class="exercise-card">
                    <h4>Exercise 2: Simple Calculator</h4>
                    <p>Practice with numbers and calculations:</p>
                    <pre><code># Two numbers for calculation
num1 = 15
num2 = 8

# Perform calculations
addition = # num1 + num2
subtraction = # num1 - num2
multiplication = # num1 * num2
division = # num1 / num2

# Display results
print(f"$\{num1} + $\{num2} = $\{addition}")
print(f"$\{num1} - $\{num2} = $\{subtraction}")
print(f"$\{num1} * $\{num2} = $\{multiplication}")
print(f"$\{num1} / $\{num2} = $\{division:.2f}")
</code></pre>
                </div>
                
                <div class="challenge-box">
                    <h4>🎯 Challenge: Grade Calculator</h4>
                    <p>Create a program that calculates a student's average grade:</p>
                    <pre><code># Student grades (out of 100)
math_grade = 85
english_grade = 92
science_grade = 78
history_grade = 88

# Calculate average
total_points = # Sum all grades
average = # Divide by number of subjects

# Determine letter grade
if average >= 90:
    letter_grade = "A"
elif average >= 80:
    letter_grade = "B"
elif average >= 70:
    letter_grade = "C"
else:
    letter_grade = "F"

print(f"Average: $\{average:.1f} ($\{letter_grade})")
</code></pre>
                </div>
            </div>
        `;
    }

    getQuizContent() {
        return `
            <div class="lesson-section">
                <h3>🎯 Knowledge Check Quiz</h3>
                <div id="quiz-container">
                    <div class="quiz-question active" data-question="0">
                        <h4>Question 1 of 5</h4>
                        <p>What is a variable in programming?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q1" value="a"> A type of computer</label>
                            <label><input type="radio" name="q1" value="b"> A container that stores data</label>
                            <label><input type="radio" name="q1" value="c"> A programming language</label>
                            <label><input type="radio" name="q1" value="d"> A website</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="1">
                        <h4>Question 2 of 5</h4>
                        <p>Which data type would you use to store someone's age?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q2" value="a"> String</label>
                            <label><input type="radio" name="q2" value="b"> Boolean</label>
                            <label><input type="radio" name="q2" value="c"> Integer</label>
                            <label><input type="radio" name="q2" value="d"> Float</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="2">
                        <h4>Question 3 of 5</h4>
                        <p>What would this code output? <code>name = "Alice"; print(f"Hello $\{name}!")</code></p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q3" value="a"> Hello Alice!</label>
                            <label><input type="radio" name="q3" value="b"> Hello name!</label>
                            <label><input type="radio" name="q3" value="c"> name Alice</label>
                            <label><input type="radio" name="q3" value="d"> Error</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="3">
                        <h4>Question 4 of 5</h4>
                        <p>Which is a Boolean value?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q4" value="a"> "True"</label>
                            <label><input type="radio" name="q4" value="b"> True</label>
                            <label><input type="radio" name="q4" value="c"> 1</label>
                            <label><input type="radio" name="q4" value="d"> yes</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="4">
                        <h4>Question 5 of 5</h4>
                        <p>What's the best variable name for storing a user's email address?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q5" value="a"> e</label>
                            <label><input type="radio" name="q5" value="b"> var1</label>
                            <label><input type="radio" name="q5" value="c"> user_email</label>
                            <label><input type="radio" name="q5" value="d"> data</label>
                        </div>
                    </div>
                    
                    <div class="quiz-navigation">
                        <button class="btn-secondary" id="prev-question" disabled>← Previous</button>
                        <button class="btn-primary" id="next-question">Next →</button>
                        <button class="btn-primary" id="submit-quiz" style="display: none;">Submit Quiz</button>
                    </div>
                </div>
                
                <div id="quiz-results" style="display: none;">
                    <h4>🎉 Quiz Results</h4>
                    <div id="score-display"></div>
                    <div id="feedback-message"></div>
                    <button class="btn-primary" onclick="location.reload()">Continue Learning</button>
                </div>
            </div>
        `;
    }

    updateNextButton(lesson, button) {
        const buttonText = {
            introduction: 'Next: Data Types →',
            datatypes: 'Next: Examples →',
            examples: 'Next: Exercises →',
            exercises: 'Next: Quiz →',
            quiz: 'Complete Chapter ✓'
        };
        
        button.textContent = buttonText[lesson] || 'Next →';
        
        if (lesson === 'quiz') {
            button.onclick = () => {
                alert('🎉 Congratulations! You\'ve completed Chapter 1!\n\nYou\'re ready to move on to Chapter 2: Control Structures');
                button.closest('.modal').remove();
            };
        }
    }

    // Utility Functions
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new LearningApp();
    console.log('App initialized:', window.app);
});

// AI Teacher Integration
class AITeacher {
    constructor() {
        this.currentChapter = null;
        this.exercises = [];
        this.userProgress = {};
    }

    // Chapter Creation
    createChapter(topic, difficulty = 'beginner') {
        const chapterTemplates = {
            'programming-fundamentals': {
                title: 'Programming Fundamentals',
                sections: [
                    'Variables and Data Types',
                    'Control Structures',
                    'Functions',
                    'Error Handling'
                ],
                exercises: [
                    'Create a calculator program',
                    'Build a number guessing game',
                    'Write a function to validate email addresses'
                ]
            },
            'data-structures': {
                title: 'Data Structures & Algorithms',
                sections: [
                    'Arrays and Lists',
                    'Stacks and Queues',
                    'Trees and Graphs',
                    'Sorting Algorithms'
                ],
                exercises: [
                    'Implement a binary search tree',
                    'Create a sorting visualization',
                    'Build a graph traversal algorithm'
                ]
            }
        };

        return chapterTemplates[topic] || this.generateCustomChapter(topic, difficulty);
    }

    generateCustomChapter(topic, difficulty) {
        // This would integrate with Claude API to generate custom content
        return {
            title: `Custom Chapter: ${topic}`,
            sections: [`Introduction to ${topic}`, 'Core Concepts', 'Practical Applications'],
            exercises: [`Practice exercise for ${topic}`]
        };
    }

    // Exercise Generation
    generateExercise(topic, difficulty) {
        const exercises = {
            'variables': {
                question: 'Create a program that stores your name, age, and favorite programming language in variables, then prints a formatted message.',
                hint: 'Use string formatting to create a nice output message.',
                solution: `name = "Your Name"\\nage = 25\\nlanguage = "Python"\\nprint(f"Hi, I'm $\\{name}, I'm $\\{age} years old, and I love $\\{language}!")`
            },
            'functions': {
                question: 'Write a function that takes a list of numbers and returns the average.',
                hint: 'Remember to handle the case where the list might be empty.',
                solution: `def calculate_average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)`
            }
        };

        return exercises[topic] || this.generateCustomExercise(topic, difficulty);
    }

    generateCustomExercise(topic, difficulty) {
        return {
            question: `Practice exercise for ${topic} (${difficulty} level)`,
            hint: 'Break the problem into smaller steps.',
            solution: '# Solution would be generated based on the specific exercise'
        };
    }

    // Knowledge Testing
    createQuiz(topic, questionCount = 5) {
        const quizzes = {
            'programming-fundamentals': [
                {
                    question: 'What is a variable?',
                    options: [
                        'A container for storing data',
                        'A type of function',
                        'A programming language',
                        'A file extension'
                    ],
                    correct: 0,
                    explanation: 'A variable is a container that stores data values.'
                },
                {
                    question: 'Which of these is NOT a primitive data type?',
                    options: ['Integer', 'String', 'Boolean', 'Array'],
                    correct: 3,
                    explanation: 'Array is a composite data type, not primitive.'
                }
            ]
        };

        return quizzes[topic] || this.generateCustomQuiz(topic, questionCount);
    }

    generateCustomQuiz(topic, questionCount) {
        // This would generate custom quiz questions
        return [{
            question: `Sample question about ${topic}`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 0,
            explanation: 'This is a sample explanation.'
        }];
    }

    // Progress Assessment
    assessProgress(userAnswers, correctAnswers) {
        const score = userAnswers.reduce((acc, answer, index) => {
            return acc + (answer === correctAnswers[index] ? 1 : 0);
        }, 0);
        
        const percentage = (score / correctAnswers.length) * 100;
        
        return {
            score,
            total: correctAnswers.length,
            percentage,
            feedback: this.generateFeedback(percentage),
            nextSteps: this.suggestNextSteps(percentage)
        };
    }

    generateFeedback(percentage) {
        if (percentage >= 90) return "Excellent! You've mastered this topic.";
        if (percentage >= 75) return "Great job! You have a solid understanding.";
        if (percentage >= 60) return "Good effort! Review the areas you missed.";
        return "Keep practicing! Don't give up - learning takes time.";
    }

    suggestNextSteps(percentage) {
        if (percentage >= 80) return "You're ready to move to the next chapter!";
        if (percentage >= 60) return "Review the material and try some practice exercises.";
        return "Let's revisit the fundamentals with more examples and practice.";
    }
}

// Initialize AI Teacher
window.aiTeacher = new AITeacher();