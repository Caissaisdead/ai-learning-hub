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
        } else if (chapterTitle.includes('Chapter 2')) {
            this.loadChapter2();
        } else if (chapterTitle.includes('Chapter 3')) {
            this.loadChapter3();
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
            exercises: this.getInteractiveExercisesContent(),
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

    getInteractiveExercisesContent() {
        return `
            <div class="exercises-section">
                <h3>🏃‍♂️ Interactive Practice Exercises</h3>
                <p>Let's practice what we've learned with hands-on exercises!</p>
                
                <div class="exercise-item interactive">
                    <h4>Exercise 1: Variable Creation Challenge</h4>
                    <p>Create variables for a personal profile:</p>
                    <div class="interactive-exercise">
                        <div class="input-group">
                            <label>Your Name:</label>
                            <input type="text" id="ex1-name" placeholder="Enter your name">
                        </div>
                        <div class="input-group">
                            <label>Your Age:</label>
                            <input type="number" id="ex1-age" placeholder="Enter your age">
                        </div>
                        <div class="input-group">
                            <label>Your Height (ft):</label>
                            <input type="number" step="0.1" id="ex1-height" placeholder="5.8">
                        </div>
                        <div class="input-group">
                            <label>Are you a student?</label>
                            <select id="ex1-student">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button class="try-exercise" onclick="app.runExercise1()">Generate Your Code!</button>
                        <div class="exercise-output" id="ex1-output"></div>
                    </div>
                </div>

                <div class="exercise-item interactive">
                    <h4>Exercise 2: Math Calculator</h4>
                    <p>Build a calculator and see the results:</p>
                    <div class="interactive-exercise">
                        <div class="input-group">
                            <label>First Number:</label>
                            <input type="number" id="calc-num1" placeholder="Enter first number">
                        </div>
                        <div class="input-group">
                            <label>Second Number:</label>
                            <input type="number" id="calc-num2" placeholder="Enter second number">
                        </div>
                        <button class="try-exercise" onclick="app.runCalculator()">Calculate All Operations!</button>
                        <div class="exercise-output" id="calc-output"></div>
                    </div>
                </div>

                <div class="exercise-item interactive">
                    <h4>Exercise 3: Data Type Detective</h4>
                    <p>Guess the data types of different values:</p>
                    <div class="interactive-exercise">
                        <div class="type-quiz">
                            <div class="quiz-item" id="type-quiz-1">
                                <span class="value-display">"Hello World"</span>
                                <select class="type-selector">
                                    <option value="">Select type...</option>
                                    <option value="str">String</option>
                                    <option value="int">Integer</option>
                                    <option value="float">Float</option>
                                    <option value="bool">Boolean</option>
                                </select>
                            </div>
                            <div class="quiz-item" id="type-quiz-2">
                                <span class="value-display">42</span>
                                <select class="type-selector">
                                    <option value="">Select type...</option>
                                    <option value="str">String</option>
                                    <option value="int">Integer</option>
                                    <option value="float">Float</option>
                                    <option value="bool">Boolean</option>
                                </select>
                            </div>
                            <div class="quiz-item" id="type-quiz-3">
                                <span class="value-display">3.14</span>
                                <select class="type-selector">
                                    <option value="">Select type...</option>
                                    <option value="str">String</option>
                                    <option value="int">Integer</option>
                                    <option value="float">Float</option>
                                    <option value="bool">Boolean</option>
                                </select>
                            </div>
                            <div class="quiz-item" id="type-quiz-4">
                                <span class="value-display">True</span>
                                <select class="type-selector">
                                    <option value="">Select type...</option>
                                    <option value="str">String</option>
                                    <option value="int">Integer</option>
                                    <option value="float">Float</option>
                                    <option value="bool">Boolean</option>
                                </select>
                            </div>
                        </div>
                        <button class="try-exercise" onclick="app.checkDataTypes()">Check My Answers!</button>
                        <div class="exercise-output" id="type-output"></div>
                    </div>
                </div>

                <div class="exercise-item">
                    <h4>Exercise 4: Code Reading Challenge</h4>
                    <p>What will this code output? Think before you click!</p>
                    <div class="code-exercise">
                        <pre><code># Mystery Code - What's the output?
x = "5"
y = "10" 
result = x + y
print(result)

# Another mystery
a = 7
b = 3
c = a * b + 2
print(f"The answer is {c}")
</code></pre>
                    </div>
                    <button class="try-exercise" onclick="app.revealCodeOutput()">Reveal Answer!</button>
                    <div class="exercise-output" id="code-output" style="display:none;">
                        <h5>Output:</h5>
                        <pre>510
The answer is 23</pre>
                        <p><strong>Explanation:</strong></p>
                        <ul>
                            <li>x + y concatenates strings: "5" + "10" = "510"</li>
                            <li>a * b + 2 = 7 * 3 + 2 = 21 + 2 = 23</li>
                        </ul>
                    </div>
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

    // Chapter 2: Control Structures
    loadChapter2() {
        const modal = document.createElement('div');
        modal.className = 'modal chapter-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content chapter-content">
                <div class="chapter-header">
                    <h2>🔀 Chapter 2: Control Structures</h2>
                    <button class="close-chapter" onclick="this.closest('.modal').remove()">×</button>
                </div>
                
                <div class="chapter-body">
                    <div class="lesson-nav">
                        <button class="lesson-btn active" data-lesson="intro-control">Introduction</button>
                        <button class="lesson-btn" data-lesson="conditionals">If Statements</button>
                        <button class="lesson-btn" data-lesson="loops">Loops</button>
                        <button class="lesson-btn" data-lesson="exercises-2">Exercises</button>
                        <button class="lesson-btn" data-lesson="quiz-2">Quiz</button>
                    </div>
                    
                    <div class="lesson-content" id="lesson-content-2">
                        $\\{this.getControlIntroContent()}
                    </div>
                    
                    <div class="lesson-footer">
                        <button class="btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                        <button class="btn-primary next-lesson-2">Next: If Statements →</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupChapter2Navigation(modal);
    }

    setupChapter2Navigation(modal) {
        const lessonBtns = modal.querySelectorAll('.lesson-btn');
        const lessonContent = modal.querySelector('#lesson-content-2');
        const nextBtn = modal.querySelector('.next-lesson-2');
        
        lessonBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                lessonBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const lesson = btn.dataset.lesson;
                lessonContent.innerHTML = this.getChapter2Content(lesson);
                
                this.updateChapter2NextButton(lesson, nextBtn);
            });
        });
        
        nextBtn.addEventListener('click', () => {
            const activeBtn = modal.querySelector('.lesson-btn.active');
            const currentLesson = activeBtn.dataset.lesson;
            const lessons = ['intro-control', 'conditionals', 'loops', 'exercises-2', 'quiz-2'];
            const currentIndex = lessons.indexOf(currentLesson);
            
            if (currentIndex < lessons.length - 1) {
                const nextLesson = lessons[currentIndex + 1];
                const nextBtn = modal.querySelector(`[data-lesson="${nextLesson}"]`);
                nextBtn.click();
            }
        });
    }

    getChapter2Content(lesson) {
        const content = {
            'intro-control': this.getControlIntroContent(),
            'conditionals': this.getConditionalsContent(),
            'loops': this.getLoopsContent(),
            'exercises-2': this.getChapter2ExercisesContent(),
            'quiz-2': this.getChapter2QuizContent()
        };
        
        return content[lesson] || '<p>Content coming soon...</p>';
    }

    getControlIntroContent() {
        return `
            <div class="lesson-section">
                <h3>🔀 Welcome to Control Structures!</h3>
                <p>Control structures are the <strong>decision-making</strong> and <strong>repetition</strong> tools in programming. They control the flow of your program!</p>
                
                <div class="concept-box">
                    <h4>Why Control Structures Matter:</h4>
                    <ul>
                        <li>🤔 <strong>Decision Making</strong> - Your program can choose what to do</li>
                        <li>🔄 <strong>Repetition</strong> - Avoid writing the same code over and over</li>
                        <li>⚡ <strong>Efficiency</strong> - Make your programs smart and dynamic</li>
                        <li>🎯 <strong>Logic</strong> - Build complex behaviors from simple rules</li>
                    </ul>
                </div>
                
                <div class="code-example">
                    <h4>Simple Example - Age Checker:</h4>
                    <pre><code class="language-python"># Your program can make decisions!
age = 20

if age >= 18:
    print("You can vote!")
else:
    print("Too young to vote yet")
    
# Output: You can vote!</code></pre>
                </div>
                
                <div class="interactive-demo">
                    <h4>🎮 Real-World Analogy:</h4>
                    <p>Think of control structures like:</p>
                    <ul>
                        <li><strong>Traffic lights</strong> - If red, stop. If green, go.</li>
                        <li><strong>Recipes</strong> - Repeat stirring until mixture thickens.</li>
                        <li><strong>Video games</strong> - If health < 0, game over.</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getConditionalsContent() {
        return `
            <div class="lesson-section">
                <h3>🤔 If Statements - Making Decisions</h3>
                <p>If statements let your program choose different paths based on conditions.</p>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>🔍 Simple If</h4>
                        <p>Do something only if condition is true</p>
                        <pre><code>if temperature > 30:
    print("It's hot today!")
    print("Stay hydrated!")</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>⚖️ If-Else</h4>
                        <p>Choose between two options</p>
                        <pre><code>if score >= 60:
    print("You passed!")
else:
    print("Try again next time")</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🎯 If-Elif-Else</h4>
                        <p>Multiple conditions to check</p>
                        <pre><code>if grade >= 90:
    letter = "A"
elif grade >= 80:
    letter = "B"
elif grade >= 70:
    letter = "C"
else:
    letter = "F"</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🔗 Logical Operators</h4>
                        <p>Combine conditions with and, or, not</p>
                        <pre><code>if age >= 18 and has_license:
    print("Can drive!")
    
if day == "weekend" or is_holiday:
    print("No work today!")</code></pre>
                    </div>
                </div>
                
                <div class="example-section">
                    <h4>🎮 Interactive Example - Grade Calculator</h4>
                    <pre><code class="language-python"># Grade calculator with multiple conditions
student_name = "Alice"
math_score = 85
english_score = 92
science_score = 78

# Calculate average
average = (math_score + english_score + science_score) / 3

# Determine grade and message
if average >= 90:
    grade = "A"
    message = "Excellent work!"
elif average >= 80:
    grade = "B"
    message = "Great job!"
elif average >= 70:
    grade = "C"
    message = "Good effort!"
elif average >= 60:
    grade = "D"
    message = "Need to improve"
else:
    grade = "F"
    message = "Must retake"

# Check for honor roll (all subjects above 85)
if math_score >= 85 and english_score >= 85 and science_score >= 85:
    honor_status = "Honor Roll!"
else:
    honor_status = "Not on honor roll"

print(f"Student: $\\{student_name}")
print(f"Average: $\\{average:.1f} (Grade: $\\{grade})")
print(f"Message: $\\{message}")
print(f"Status: $\\{honor_status}")
</code></pre>
                </div>
            </div>
        `;
    }

    getLoopsContent() {
        return `
            <div class="lesson-section">
                <h3>🔄 Loops - Repetition Made Easy</h3>
                <p>Loops let you repeat code without writing it multiple times. Essential for efficiency!</p>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>🔢 For Loop</h4>
                        <p>Repeat a specific number of times</p>
                        <pre><code># Count from 1 to 5
for i in range(1, 6):
    print(f"Count: $\\{i}")
    
# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like $\\{fruit}")</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🔄 While Loop</h4>
                        <p>Repeat while condition is true</p>
                        <pre><code># Countdown
count = 5
while count > 0:
    print(f"$\\{count}...")
    count -= 1
print("Blast off!")</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🛑 Loop Control</h4>
                        <p>Control loop behavior with break and continue</p>
                        <pre><code># Find first even number
for num in [1, 3, 7, 8, 9, 12]:
    if num % 2 == 0:
        print(f"Found even: $\\{num}")
        break  # Exit loop
        
# Skip odd numbers
for num in range(10):
    if num % 2 == 1:
        continue  # Skip to next iteration
    print(f"Even: $\\{num}")</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🎯 Nested Loops</h4>
                        <p>Loops inside loops for complex patterns</p>
                        <pre><code># Create a simple multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f"$\\{i} x $\\{j} = $\\{result}")
    print("---")</code></pre>
                    </div>
                </div>
                
                <div class="example-section">
                    <h4>🎮 Real-World Example - Password Validator</h4>
                    <pre><code class="language-python"># Password strength checker
def check_password_strength(password):
    # Initialize criteria checks
    has_upper = False
    has_lower = False
    has_digit = False
    has_special = False
    special_chars = "!@#$%^&*"
    
    # Check each character in password
    for char in password:
        if char.isupper():
            has_upper = True
        elif char.islower():
            has_lower = True
        elif char.isdigit():
            has_digit = True
        elif char in special_chars:
            has_special = True
    
    # Calculate strength
    strength_score = 0
    criteria_met = []
    
    if len(password) >= 8:
        strength_score += 1
        criteria_met.append("8+ characters")
    
    if has_upper:
        strength_score += 1
        criteria_met.append("uppercase letter")
    
    if has_lower:
        strength_score += 1  
        criteria_met.append("lowercase letter")
    
    if has_digit:
        strength_score += 1
        criteria_met.append("number")
    
    if has_special:
        strength_score += 1
        criteria_met.append("special character")
    
    # Determine strength level
    if strength_score >= 4:
        strength = "Strong"
    elif strength_score >= 3:
        strength = "Medium"
    elif strength_score >= 2:
        strength = "Weak"
    else:
        strength = "Very Weak"
    
    return strength, criteria_met, strength_score

# Test the function
test_passwords = ["password", "Password1", "MyP@ssw0rd!", "abc"]

for pwd in test_passwords:
    strength, criteria, score = check_password_strength(pwd)
    print(f"Password: '$\\{pwd}'")
    print(f"Strength: $\\{strength} ($\\{score}/5)")
    print(f"Criteria met: $\\{', '.join(criteria)}")
    print("---")
</code></pre>
                </div>
            </div>
        `;
    }

    getChapter2ExercisesContent() {
        return `
            <div class="lesson-section">
                <h3>🏋️‍♂️ Control Structures Practice</h3>
                
                <div class="exercise-card">
                    <h4>Exercise 1: Number Guessing Game</h4>
                    <p>Create a simple number guessing game using loops and conditionals:</p>
                    <pre><code>import random

# Generate secret number
secret_number = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("🎯 Number Guessing Game!")
print("I'm thinking of a number between 1 and 100")
print(f"You have $\\{max_attempts} attempts")

while attempts < max_attempts:
    # Get user input
    guess = int(input("Enter your guess: "))
    attempts += 1
    
    # Check guess
    if guess == secret_number:
        print(f"🎉 Correct! You got it in $\\{attempts} attempts!")
        break
    elif guess < secret_number:
        print("📈 Too low!")
    else:
        print("📉 Too high!")
    
    # Show remaining attempts
    remaining = max_attempts - attempts
    if remaining > 0:
        print(f"$\\{remaining} attempts remaining")
    else:
        print(f"💥 Game over! The number was $\\{secret_number}")
</code></pre>
                </div>
                
                <div class="exercise-card">
                    <h4>Exercise 2: Grade Book System</h4>
                    <p>Build a student grade management system:</p>
                    <pre><code># Student grade book
students = {
    "Alice": [85, 92, 78, 96],
    "Bob": [79, 85, 88, 82],
    "Charlie": [95, 91, 89, 94],
    "Diana": [73, 67, 81, 79]
}

print("📊 Student Grade Report")
print("=" * 40)

for student_name, grades in students.items():
    # Calculate average
    average = sum(grades) / len(grades)
    
    # Determine letter grade
    if average >= 90:
        letter = "A"
        status = "Excellent"
    elif average >= 80:
        letter = "B"
        status = "Good"
    elif average >= 70:
        letter = "C"
        status = "Satisfactory"
    elif average >= 60:
        letter = "D"
        status = "Needs Improvement"
    else:
        letter = "F"
        status = "Failing"
    
    # Find highest and lowest scores
    highest = max(grades)
    lowest = min(grades)
    
    # Check for honor roll (average >= 85 and no grade below 80)
    honor_roll = average >= 85 and all(grade >= 80 for grade in grades)
    
    # Print student report
    print(f"Student: $\\{student_name}")
    print(f"Grades: $\\{grades}")
    print(f"Average: $\\{average:.1f} ($\\{letter})")
    print(f"Status: $\\{status}")
    print(f"Range: $\\{lowest} - $\\{highest}")
    
    if honor_roll:
        print("🏆 HONOR ROLL!")
    
    print("-" * 30)
</code></pre>
                </div>
                
                <div class="challenge-box">
                    <h4>🎯 Challenge: ATM Machine Simulator</h4>
                    <p>Create an ATM interface with multiple operations:</p>
                    <pre><code># ATM Machine Simulator
class ATM:
    def __init__(self):
        self.balance = 1000  # Starting balance
        self.pin = "1234"    # Default PIN
        self.attempts = 0
        self.max_attempts = 3
    
    def verify_pin(self):
        while self.attempts < self.max_attempts:
            entered_pin = input("Enter your PIN: ")
            
            if entered_pin == self.pin:
                print("✅ PIN verified!")
                return True
            else:
                self.attempts += 1
                remaining = self.max_attempts - self.attempts
                
                if remaining > 0:
                    print(f"❌ Wrong PIN. $\\{remaining} attempts remaining")
                else:
                    print("🔒 Account locked. Too many failed attempts")
                    return False
        return False
    
    def show_menu(self):
        print("\\n🏧 ATM Menu:")
        print("1. Check Balance")
        print("2. Deposit Money")  
        print("3. Withdraw Money")
        print("4. Exit")
    
    def run(self):
        print("🏧 Welcome to Python ATM!")
        
        if not self.verify_pin():
            return
        
        while True:
            self.show_menu()
            choice = input("Select option (1-4): ")
            
            if choice == "1":
                print(f"💰 Your balance: $$\\{self.balance:.2f}")
            
            elif choice == "2":
                amount = float(input("Enter deposit amount: $"))
                if amount > 0:
                    self.balance += amount
                    print(f"✅ Deposited $$\\{amount:.2f}")
                    print(f"💰 New balance: $$\\{self.balance:.2f}")
                else:
                    print("❌ Invalid amount")
            
            elif choice == "3":
                amount = float(input("Enter withdrawal amount: $"))
                if amount > 0 and amount <= self.balance:
                    self.balance -= amount
                    print(f"✅ Withdrawn $$\\{amount:.2f}")
                    print(f"💰 Remaining balance: $$\\{self.balance:.2f}")
                elif amount > self.balance:
                    print("❌ Insufficient funds")
                else:
                    print("❌ Invalid amount")
            
            elif choice == "4":
                print("👋 Thank you for using Python ATM!")
                break
            
            else:
                print("❌ Invalid option. Please try again")

# Run the ATM
atm = ATM()
atm.run()
</code></pre>
                </div>
            </div>
        `;
    }

    getChapter2QuizContent() {
        return `
            <div class="lesson-section">
                <h3>🎯 Control Structures Quiz</h3>
                <div id="quiz-container-2">
                    <div class="quiz-question active" data-question="0">
                        <h4>Question 1 of 5</h4>
                        <p>What will this code output?</p>
                        <pre><code>x = 15
if x > 10:
    print("Big")
elif x > 5:
    print("Medium")
else:
    print("Small")</code></pre>
                        <div class="quiz-options">
                            <label><input type="radio" name="q1" value="a"> Big</label>
                            <label><input type="radio" name="q1" value="b"> Medium</label>
                            <label><input type="radio" name="q1" value="c"> Small</label>
                            <label><input type="radio" name="q1" value="d"> Nothing</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="1">
                        <h4>Question 2 of 5</h4>
                        <p>How many times will this loop run?</p>
                        <pre><code>for i in range(3, 8):
    print(i)</code></pre>
                        <div class="quiz-options">
                            <label><input type="radio" name="q2" value="a"> 3 times</label>
                            <label><input type="radio" name="q2" value="b"> 5 times</label>
                            <label><input type="radio" name="q2" value="c"> 8 times</label>
                            <label><input type="radio" name="q2" value="d"> 6 times</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="2">
                        <h4>Question 3 of 5</h4>
                        <p>Which logical operator means "and both conditions must be true"?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q3" value="a"> or</label>
                            <label><input type="radio" name="q3" value="b"> and</label>
                            <label><input type="radio" name="q3" value="c"> not</label>
                            <label><input type="radio" name="q3" value="d"> if</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="3">
                        <h4>Question 4 of 5</h4>
                        <p>What does 'break' do in a loop?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q4" value="a"> Pauses the loop temporarily</label>
                            <label><input type="radio" name="q4" value="b"> Exits the loop completely</label>
                            <label><input type="radio" name="q4" value="c"> Skips to the next iteration</label>
                            <label><input type="radio" name="q4" value="d"> Restarts the loop</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="4">
                        <h4>Question 5 of 5</h4>
                        <p>When should you use a while loop instead of a for loop?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q5" value="a"> When you know exactly how many iterations</label>
                            <label><input type="radio" name="q5" value="b"> When you don't know how many iterations needed</label>
                            <label><input type="radio" name="q5" value="c"> When working with lists</label>
                            <label><input type="radio" name="q5" value="d"> Never, for loops are always better</label>
                        </div>
                    </div>
                    
                    <div class="quiz-navigation">
                        <button class="btn-secondary" id="prev-question-2" disabled>← Previous</button>
                        <button class="btn-primary" id="next-question-2">Next →</button>
                        <button class="btn-primary" id="submit-quiz-2" style="display: none;">Submit Quiz</button>
                    </div>
                </div>
            </div>
        `;
    }

    updateChapter2NextButton(lesson, button) {
        const buttonText = {
            'intro-control': 'Next: If Statements →',
            'conditionals': 'Next: Loops →',
            'loops': 'Next: Exercises →',
            'exercises-2': 'Next: Quiz →',
            'quiz-2': 'Complete Chapter ✓'
        };
        
        button.textContent = buttonText[lesson] || 'Next →';
        
        if (lesson === 'quiz-2') {
            button.onclick = () => {
                alert('🎉 Chapter 2 Complete!\\n\\nYou\\'ve mastered control structures! Ready for Chapter 3: Functions & Scope?');
                button.closest('.modal').remove();
            };
        }
    }

    // Chapter 3: Functions & Scope
    loadChapter3() {
        const modal = document.createElement('div');
        modal.className = 'modal chapter-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content chapter-content">
                <div class="chapter-header">
                    <h2>⚡ Chapter 3: Functions & Scope</h2>
                    <button class="close-chapter" onclick="this.closest('.modal').remove()">×</button>
                </div>
                
                <div class="chapter-body">
                    <div class="lesson-nav">
                        <button class="lesson-btn active" data-lesson="intro-functions">Introduction</button>
                        <button class="lesson-btn" data-lesson="creating-functions">Creating Functions</button>
                        <button class="lesson-btn" data-lesson="parameters">Parameters & Returns</button>
                        <button class="lesson-btn" data-lesson="scope">Scope & Variables</button>
                        <button class="lesson-btn" data-lesson="exercises-3">Exercises</button>
                        <button class="lesson-btn" data-lesson="quiz-3">Quiz</button>
                    </div>
                    
                    <div class="lesson-content" id="lesson-content-3">
                        $\\{this.getFunctionsIntroContent()}
                    </div>
                    
                    <div class="lesson-footer">
                        <button class="btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                        <button class="btn-primary next-lesson-3">Next: Creating Functions →</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupChapter3Navigation(modal);
    }

    setupChapter3Navigation(modal) {
        const lessonBtns = modal.querySelectorAll('.lesson-btn');
        const lessonContent = modal.querySelector('#lesson-content-3');
        const nextBtn = modal.querySelector('.next-lesson-3');
        
        lessonBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                lessonBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const lesson = btn.dataset.lesson;
                lessonContent.innerHTML = this.getChapter3Content(lesson);
                
                this.updateChapter3NextButton(lesson, nextBtn);
            });
        });
        
        nextBtn.addEventListener('click', () => {
            const activeBtn = modal.querySelector('.lesson-btn.active');
            const currentLesson = activeBtn.dataset.lesson;
            const lessons = ['intro-functions', 'creating-functions', 'parameters', 'scope', 'exercises-3', 'quiz-3'];
            const currentIndex = lessons.indexOf(currentLesson);
            
            if (currentIndex < lessons.length - 1) {
                const nextLesson = lessons[currentIndex + 1];
                const nextBtn = modal.querySelector(`[data-lesson="${nextLesson}"]`);
                nextBtn.click();
            }
        });
    }

    getChapter3Content(lesson) {
        const content = {
            'intro-functions': this.getFunctionsIntroContent(),
            'creating-functions': this.getCreatingFunctionsContent(),
            'parameters': this.getParametersContent(),
            'scope': this.getScopeContent(),
            'exercises-3': this.getChapter3ExercisesContent(),
            'quiz-3': this.getChapter3QuizContent()
        };
        
        return content[lesson] || '<p>Content coming soon...</p>';
    }

    getFunctionsIntroContent() {
        return `
            <div class="lesson-section">
                <h3>⚡ Welcome to Functions!</h3>
                <p>Functions are <strong>reusable blocks of code</strong> that perform specific tasks. They're the building blocks of organized programming!</p>
                
                <div class="concept-box">
                    <h4>Why Functions Are Amazing:</h4>
                    <ul>
                        <li>🔄 <strong>Reusability</strong> - Write once, use many times</li>
                        <li>📦 <strong>Organization</strong> - Break complex problems into smaller pieces</li>
                        <li>🔧 <strong>Maintainability</strong> - Fix bugs in one place</li>
                        <li>🤝 <strong>Collaboration</strong> - Share code with others easily</li>
                    </ul>
                </div>
                
                <div class="code-example">
                    <h4>Your First Function:</h4>
                    <pre><code class="language-python"># Define a function
def greet_user(name):
    return f"Hello, $\\{name}! Welcome to programming!"

# Use the function
message = greet_user("Alice")
print(message)  # Output: Hello, Alice! Welcome to programming!

# Use it again with different input
print(greet_user("Bob"))  # Output: Hello, Bob! Welcome to programming!
</code></pre>
                </div>
                
                <div class="interactive-demo">
                    <h4>🎮 Real-World Analogy:</h4>
                    <p>Think of functions like:</p>
                    <ul>
                        <li><strong>Kitchen appliances</strong> - Blender takes ingredients, returns smoothie</li>
                        <li><strong>Vending machine</strong> - Insert money, select item, get snack</li>
                        <li><strong>Calculator</strong> - Input numbers, perform operation, get result</li>
                    </ul>
                </div>
                
                <div class="pro-tip">
                    <h4>💡 Function Benefits:</h4>
                    <p>Without functions, you'd repeat the same code everywhere. With functions, you create once and reuse everywhere!</p>
                </div>
            </div>
        `;
    }

    getCreatingFunctionsContent() {
        return `
            <div class="lesson-section">
                <h3>🛠️ Creating Your Own Functions</h3>
                <p>Learn the anatomy of functions and how to create powerful, reusable code!</p>
                
                <div class="example-section">
                    <h4>📋 Function Anatomy:</h4>
                    <pre><code class="language-python"># Function definition syntax
def function_name(parameters):
    """Optional docstring describing what the function does"""
    # Function body - the code that runs
    # Process the parameters
    return result  # Optional return statement

# Function call/usage
result = function_name(arguments)
</code></pre>
                </div>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>🎯 Simple Function</h4>
                        <p>No parameters, no return value</p>
                        <pre><code>def say_hello():
    print("Hello, World!")
    print("Nice to meet you!")

# Call the function
say_hello()</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>📥 Function with Parameters</h4>
                        <p>Takes input to work with</p>
                        <pre><code>def calculate_area(length, width):
    area = length * width
    print(f"Area: $\\{area} square units")

# Call with arguments
calculate_area(5, 3)  # Area: 15 square units</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>📤 Function with Return</h4>
                        <p>Returns a result you can use</p>
                        <pre><code>def multiply(x, y):
    result = x * y
    return result

# Use the returned value
answer = multiply(4, 7)
print(answer)  # 28</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🎨 Complete Function</h4>
                        <p>Parameters, processing, and return</p>
                        <pre><code>def format_name(first, last):
    """Format a person's name properly"""
    full_name = f"$\\{first.title()} $\\{last.title()}"
    return full_name

name = format_name("john", "DOE")
print(name)  # John Doe</code></pre>
                    </div>
                </div>
                
                <div class="example-section">
                    <h4>🎮 Real Example - Temperature Converter</h4>
                    <pre><code class="language-python"># Temperature conversion functions
def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    celsius = (fahrenheit - 32) * 5/9
    return celsius

def get_temperature_info(temp, scale):
    """Get comprehensive temperature information"""
    if scale.lower() == "c":
        celsius = temp
        fahrenheit = celsius_to_fahrenheit(temp)
        freezing_water = temp <= 0
        boiling_water = temp >= 100
    else:  # Fahrenheit
        fahrenheit = temp
        celsius = fahrenheit_to_celsius(temp)
        freezing_water = fahrenheit <= 32
        boiling_water = fahrenheit >= 212
    
    return {
        "celsius": round(celsius, 1),
        "fahrenheit": round(fahrenheit, 1),
        "freezing": freezing_water,
        "boiling": boiling_water
    }

# Test the functions
temp_info = get_temperature_info(25, "C")
print(f"Temperature: $\\{temp_info['celsius']}°C / $\\{temp_info['fahrenheit']}°F")
print(f"Water freezes: $\\{temp_info['freezing']}")
print(f"Water boils: $\\{temp_info['boiling']}")
</code></pre>
                </div>
            </div>
        `;
    }

    getParametersContent() {
        return `
            <div class="lesson-section">
                <h3>🎛️ Parameters & Return Values</h3>
                <p>Master the art of function inputs and outputs to create flexible, powerful functions!</p>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>🔢 Multiple Parameters</h4>
                        <p>Functions can take many inputs</p>
                        <pre><code>def create_profile(name, age, city, hobby):
    profile = f"$\\{name} is $\\{age} years old, lives in $\\{city}, and loves $\\{hobby}"
    return profile

info = create_profile("Alice", 25, "NYC", "coding")
print(info)</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>⚙️ Default Parameters</h4>
                        <p>Set default values for optional parameters</p>
                        <pre><code>def greet(name, greeting="Hello", punctuation="!"):
    return f"$\\{greeting}, $\\{name}$\\{punctuation}"

print(greet("Bob"))  # Hello, Bob!
print(greet("Alice", "Hi"))  # Hi, Alice!
print(greet("Charlie", "Hey", "?"))  # Hey, Charlie?</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>📋 Keyword Arguments</h4>
                        <p>Call functions with named parameters</p>
                        <pre><code>def order_pizza(size, crust, topping):
    return f"$\\{size} $\\{crust} pizza with $\\{topping}"

# Keyword arguments - any order!
pizza1 = order_pizza(topping="pepperoni", size="large", crust="thin")
pizza2 = order_pizza(size="medium", crust="thick", topping="cheese")</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🌟 *args and **kwargs</h4>
                        <p>Handle variable number of arguments</p>
                        <pre><code>def calculate_average(*numbers):
    return sum(numbers) / len(numbers)

def create_user(**details):
    return f"User: $\\{details}"

avg = calculate_average(85, 90, 78, 92)
user = create_user(name="John", age=30, city="LA")</code></pre>
                    </div>
                </div>
                
                <div class="example-section">
                    <h4>🎮 Advanced Example - Shopping Cart Calculator</h4>
                    <pre><code class="language-python">def calculate_order_total(*items, tax_rate=0.08, discount=0, shipping=0):
    """
    Calculate total order cost with tax, discount, and shipping
    
    Parameters:
    *items: Variable number of item prices
    tax_rate: Tax percentage (default 8%)
    discount: Discount amount in dollars (default 0)
    shipping: Shipping cost (default 0)
    """
    # Calculate subtotal
    subtotal = sum(items)
    
    # Apply discount
    discounted_subtotal = subtotal - discount
    
    # Calculate tax on discounted amount
    tax_amount = discounted_subtotal * tax_rate
    
    # Calculate final total
    total = discounted_subtotal + tax_amount + shipping
    
    # Return detailed breakdown
    return {
        "items": items,
        "subtotal": round(subtotal, 2),
        "discount": discount,
        "tax_rate": tax_rate * 100,
        "tax_amount": round(tax_amount, 2),
        "shipping": shipping,
        "total": round(total, 2)
    }

def print_receipt(order_details):
    """Print a formatted receipt"""
    print("🧾 ORDER RECEIPT")
    print("=" * 30)
    
    for i, price in enumerate(order_details["items"], 1):
        print(f"Item $\\{i}: $$\\{price:.2f}")
    
    print("-" * 30)
    print(f"Subtotal: $$\\{order_details['subtotal']:.2f}")
    
    if order_details["discount"] > 0:
        print(f"Discount: -$$\\{order_details['discount']:.2f}")
    
    print(f"Tax ($\\{order_details['tax_rate']:.1f}%): $$\\{order_details['tax_amount']:.2f}")
    
    if order_details["shipping"] > 0:
        print(f"Shipping: $$\\{order_details['shipping']:.2f}")
    
    print("=" * 30)
    print(f"TOTAL: $$\\{order_details['total']:.2f}")

# Example usage
order1 = calculate_order_total(29.99, 15.50, 8.75, tax_rate=0.0875, discount=5.00)
print_receipt(order1)

print("\\n" + "="*50 + "\\n")

order2 = calculate_order_total(99.99, 149.99, tax_rate=0.10, shipping=12.99)
print_receipt(order2)
</code></pre>
                </div>
            </div>
        `;
    }

    getScopeContent() {
        return `
            <div class="lesson-section">
                <h3>🎯 Variable Scope - Where Variables Live</h3>
                <p>Understanding scope helps you avoid bugs and write cleaner code by knowing where variables can be accessed!</p>
                
                <div class="concept-box">
                    <h4>Types of Scope:</h4>
                    <ul>
                        <li>🌍 <strong>Global Scope</strong> - Variables accessible everywhere</li>
                        <li>🏠 <strong>Function Scope</strong> - Variables only within the function</li>
                        <li>🔒 <strong>Local Scope</strong> - Variables in the current block</li>
                        <li>📦 <strong>Enclosing Scope</strong> - Variables in outer functions</li>
                    </ul>
                </div>
                
                <div class="example-section">
                    <h4>🌍 Global vs Local Scope:</h4>
                    <pre><code class="language-python"># Global variable - accessible everywhere
global_counter = 0

def increment_counter():
    # Local variable - only accessible in this function
    local_increment = 1
    
    # Access global variable (reading)
    print(f"Current global counter: $\\{global_counter}")
    
    # To modify global variable, use 'global' keyword
    global global_counter
    global_counter += local_increment
    
    print(f"Local increment: $\\{local_increment}")
    print(f"New global counter: $\\{global_counter}")

def another_function():
    # This function can access global_counter
    print(f"Global counter from another function: $\\{global_counter}")
    
    # But it CANNOT access local_increment from increment_counter()
    # print(local_increment)  # This would cause an error!

# Test the functions
print("Initial global counter:", global_counter)
increment_counter()
another_function()
</code></pre>
                </div>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>🏠 Function Scope</h4>
                        <p>Variables created inside functions</p>
                        <pre><code>def calculate_discount(price):
    # These are local to this function
    discount_rate = 0.10
    discount_amount = price * discount_rate
    final_price = price - discount_amount
    
    return final_price

# discount_rate is NOT accessible here
# print(discount_rate)  # Error!</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>📦 Enclosing Scope</h4>
                        <p>Nested functions and outer variables</p>
                        <pre><code>def outer_function(x):
    # Outer function variable
    multiplier = 2
    
    def inner_function(y):
        # Can access both x and multiplier
        return x * multiplier * y
    
    return inner_function

# Create a specialized function
double_x_5 = outer_function(5)
result = double_x_5(3)  # 5 * 2 * 3 = 30</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>🔄 Scope Chain</h4>
                        <p>Python searches for variables in order</p>
                        <pre><code># Python looks for variables in this order:
# 1. Local (current function)
# 2. Enclosing (outer functions)  
# 3. Global (module level)
# 4. Built-in (Python keywords)

name = "Global Alice"  # Global

def outer():
    name = "Enclosing Bob"  # Enclosing
    
    def inner():
        name = "Local Charlie"  # Local
        print(name)  # Prints: Local Charlie
    
    inner()</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>⚠️ Common Scope Mistakes</h4>
                        <p>Avoid these scope pitfalls</p>
                        <pre><code># Mistake 1: Forgetting 'global'
counter = 0
def increment():
    counter += 1  # Error! Need 'global counter'

# Mistake 2: Shadowing variables
x = 10
def test():
    print(x)  # Error! x is used before assignment
    x = 20    # This creates local x

# Mistake 3: Using mutable defaults
def add_item(item, items=[]):  # Don't do this!
    items.append(item)
    return items</code></pre>
                    </div>
                </div>
                
                <div class="example-section">
                    <h4>🎮 Real-World Example - Game Score Manager</h4>
                    <pre><code class="language-python">class GameScoreManager:
    """Manage game scores using proper scope practices"""
    
    # Class variable (shared across all instances)
    high_score = 0
    
    def __init__(self, player_name):
        # Instance variables (unique to each player)
        self.player_name = player_name
        self.current_score = 0
        self.level = 1
    
    def add_points(self, points):
        """Add points to current score"""
        # Local variable
        bonus_multiplier = self._calculate_bonus()
        
        # Calculate actual points with bonus
        actual_points = points * bonus_multiplier
        
        # Update instance variable
        self.current_score += actual_points
        
        # Update class variable if needed
        if self.current_score > GameScoreManager.high_score:
            GameScoreManager.high_score = self.current_score
        
        return actual_points
    
    def _calculate_bonus(self):
        """Private method to calculate bonus multiplier"""
        # Local function with access to instance variables
        if self.level >= 10:
            return 2.0
        elif self.level >= 5:
            return 1.5
        else:
            return 1.0
    
    def level_up(self):
        """Advance to next level"""
        self.level += 1
        
        # Nested function example
        def celebration_message():
            # Access to enclosing scope (method variables)
            return f"$\\{self.player_name} reached level $\\{self.level}!"
        
        print(celebration_message())
    
    def get_status(self):
        """Get current player status"""
        return {
            "player": self.player_name,
            "score": self.current_score,
            "level": self.level,
            "high_score": GameScoreManager.high_score
        }

# Example usage
player1 = GameScoreManager("Alice")
player2 = GameScoreManager("Bob")

# Each player has their own score
player1.add_points(100)
player2.add_points(150)

print("Player 1 status:", player1.get_status())
print("Player 2 status:", player2.get_status())

# Level up affects individual players
player1.level_up()
player1.add_points(200)  # Gets bonus for higher level

print("After level up:")
print("Player 1 status:", player1.get_status())
print("High score (shared):", GameScoreManager.high_score)
</code></pre>
                </div>
            </div>
        `;
    }

    getChapter3ExercisesContent() {
        return `
            <div class="lesson-section">
                <h3>🏋️‍♂️ Functions & Scope Exercises</h3>
                
                <div class="exercise-card">
                    <h4>Exercise 1: Personal Finance Calculator</h4>
                    <p>Create a comprehensive personal finance toolkit:</p>
                    <pre><code># Personal Finance Calculator Functions

def calculate_compound_interest(principal, rate, time, compounds_per_year=12):
    """
    Calculate compound interest
    
    Parameters:
    principal: Initial amount
    rate: Annual interest rate (as decimal, e.g., 0.05 for 5%)
    time: Time in years
    compounds_per_year: How often interest compounds (default monthly)
    """
    amount = principal * (1 + rate/compounds_per_year) ** (compounds_per_year * time)
    interest_earned = amount - principal
    
    return {
        "initial_amount": principal,
        "final_amount": round(amount, 2),
        "interest_earned": round(interest_earned, 2),
        "rate": rate * 100,
        "years": time
    }

def calculate_loan_payment(loan_amount, annual_rate, years):
    """Calculate monthly loan payment using the loan payment formula"""
    monthly_rate = annual_rate / 12
    num_payments = years * 12
    
    if monthly_rate == 0:  # Handle 0% interest
        monthly_payment = loan_amount / num_payments
    else:
        monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate)**num_payments) / ((1 + monthly_rate)**num_payments - 1)
    
    total_payment = monthly_payment * num_payments
    total_interest = total_payment - loan_amount
    
    return {
        "loan_amount": loan_amount,
        "monthly_payment": round(monthly_payment, 2),
        "total_payment": round(total_payment, 2),
        "total_interest": round(total_interest, 2),
        "annual_rate": annual_rate * 100
    }

def budget_analyzer(income, **expenses):
    """
    Analyze budget and provide recommendations
    
    Parameters:
    income: Monthly income
    **expenses: Various expense categories (housing, food, transport, etc.)
    """
    total_expenses = sum(expenses.values())
    remaining = income - total_expenses
    savings_rate = (remaining / income) * 100 if income > 0 else 0
    
    # Financial health analysis
    if savings_rate >= 20:
        status = "Excellent"
        advice = "Great job! You're on track for financial security."
    elif savings_rate >= 10:
        status = "Good"
        advice = "Good savings rate. Consider increasing if possible."
    elif savings_rate >= 0:
        status = "Fair"
        advice = "Try to cut expenses or increase income to save more."
    else:
        status = "Poor"
        advice = "You're spending more than you earn. Immediate budget review needed!"
    
    return {
        "income": income,
        "expenses": expenses,
        "total_expenses": total_expenses,
        "remaining": remaining,
        "savings_rate": round(savings_rate, 1),
        "status": status,
        "advice": advice
    }

def retirement_planner(current_age, retirement_age, current_savings, monthly_contribution, expected_return=0.07):
    """Plan for retirement with compound growth calculations"""
    years_to_retirement = retirement_age - current_age
    months_to_retirement = years_to_retirement * 12
    
    # Future value of current savings
    future_current = current_savings * (1 + expected_return) ** years_to_retirement
    
    # Future value of monthly contributions (annuity formula)
    monthly_return = expected_return / 12
    if monthly_return == 0:
        future_contributions = monthly_contribution * months_to_retirement
    else:
        future_contributions = monthly_contribution * (((1 + monthly_return) ** months_to_retirement - 1) / monthly_return)
    
    total_retirement = future_current + future_contributions
    
    return {
        "current_age": current_age,
        "retirement_age": retirement_age,
        "years_to_retirement": years_to_retirement,
        "current_savings": current_savings,
        "monthly_contribution": monthly_contribution,
        "expected_annual_return": expected_return * 100,
        "projected_retirement_fund": round(total_retirement, 2)
    }

# Test the functions
print("=== COMPOUND INTEREST CALCULATOR ===")
investment = calculate_compound_interest(10000, 0.06, 10)
print(f"Investing $10,000 at 6% for 10 years:")
print(f"Final amount: $$\\{investment['final_amount']:,}")
print(f"Interest earned: $$\\{investment['interest_earned']:,}")

print("\\n=== LOAN CALCULATOR ===")
mortgage = calculate_loan_payment(300000, 0.035, 30)
print(f"$300,000 mortgage at 3.5% for 30 years:")
print(f"Monthly payment: $$\\{mortgage['monthly_payment']:,}")
print(f"Total interest: $$\\{mortgage['total_interest']:,}")

print("\\n=== BUDGET ANALYZER ===")
budget = budget_analyzer(
    income=5000,
    housing=1500,
    food=600,
    transportation=400,
    entertainment=300,
    utilities=200,
    insurance=300,
    miscellaneous=200
)
print(f"Monthly budget analysis:")
print(f"Income: $$\\{budget['income']:,}")
print(f"Total expenses: $$\\{budget['total_expenses']:,}")
print(f"Remaining: $$\\{budget['remaining']:,}")
print(f"Savings rate: $\\{budget['savings_rate']}%")
print(f"Status: $\\{budget['status']}")
print(f"Advice: $\\{budget['advice']}")

print("\\n=== RETIREMENT PLANNER ===")
retirement = retirement_planner(25, 65, 10000, 500)
print(f"Retirement planning from age 25 to 65:")
print(f"Starting with $10,000, contributing $500/month")
print(f"Projected fund: $$\\{retirement['projected_retirement_fund']:,}")
</code></pre>
                </div>
                
                <div class="challenge-box">
                    <h4>🎯 Challenge: Advanced Calculator with Memory</h4>
                    <p>Build a calculator that remembers previous calculations:</p>
                    <pre><code># Advanced Calculator with Memory and History

# Global variables for calculator state
calculator_memory = 0
calculation_history = []
last_result = 0

def add_to_history(operation, result):
    """Add calculation to history"""
    global calculation_history
    calculation_history.append({
        "operation": operation,
        "result": result,
        "timestamp": "now"  # In real app, use datetime
    })
    
    # Keep only last 10 calculations
    if len(calculation_history) > 10:
        calculation_history.pop(0)

def basic_operation(num1, num2, operation):
    """Perform basic arithmetic operations"""
    global last_result
    
    if operation == "+":
        result = num1 + num2
        op_str = f"$\\{num1} + $\\{num2}"
    elif operation == "-":
        result = num1 - num2
        op_str = f"$\\{num1} - $\\{num2}"
    elif operation == "*":
        result = num1 * num2
        op_str = f"$\\{num1} × $\\{num2}"
    elif operation == "/":
        if num2 == 0:
            return {"error": "Cannot divide by zero!"}
        result = num1 / num2
        op_str = f"$\\{num1} ÷ $\\{num2}"
    elif operation == "**":
        result = num1 ** num2
        op_str = f"$\\{num1} ^ $\\{num2}"
    else:
        return {"error": f"Unknown operation: $\\{operation}"}
    
    last_result = result
    add_to_history(op_str, result)
    
    return {"result": result, "operation": op_str}

def memory_store(value=None):
    """Store value in calculator memory"""
    global calculator_memory
    
    if value is None:
        value = last_result
    
    calculator_memory = value
    return f"Stored $\\{value} in memory"

def memory_recall():
    """Recall value from calculator memory"""
    global calculator_memory
    return calculator_memory

def memory_clear():
    """Clear calculator memory"""
    global calculator_memory
    calculator_memory = 0
    return "Memory cleared"

def get_history(limit=5):
    """Get recent calculation history"""
    global calculation_history
    return calculation_history[-limit:]

def clear_history():
    """Clear calculation history"""
    global calculation_history
    calculation_history = []
    return "History cleared"

def scientific_operation(num, operation):
    """Perform scientific calculations"""
    import math
    global last_result
    
    operations = {
        "sqrt": lambda x: math.sqrt(x),
        "sin": lambda x: math.sin(math.radians(x)),
        "cos": lambda x: math.cos(math.radians(x)),
        "tan": lambda x: math.tan(math.radians(x)),
        "log": lambda x: math.log10(x),
        "ln": lambda x: math.log(x),
        "factorial": lambda x: math.factorial(int(x)) if x >= 0 and x == int(x) else None
    }
    
    if operation not in operations:
        return {"error": f"Unknown scientific operation: $\\{operation}"}
    
    try:
        result = operations[operation](num)
        if result is None:
            return {"error": "Invalid input for factorial"}
        
        last_result = result
        op_str = f"$\\{operation}($\\{num})"
        add_to_history(op_str, result)
        
        return {"result": result, "operation": op_str}
    except Exception as e:
        return {"error": f"Error in $\\{operation}: $\\{str(e)}"}

def calculator_session():
    """Interactive calculator session"""
    print("🧮 Advanced Calculator")
    print("Commands: +, -, *, /, **, sqrt, sin, cos, tan, log, ln, factorial")
    print("Memory: ms (store), mr (recall), mc (clear)")
    print("Other: history, clear, ans (last result), quit")
    print("="*50)
    
    while True:
        try:
            command = input("\\nCalculator> ").strip().lower()
            
            if command == "quit":
                print("Goodbye!")
                break
            elif command == "history":
                history = get_history()
                if history:
                    print("Recent calculations:")
                    for calc in history:
                        print(f"  $\\{calc['operation']} = $\\{calc['result']}")
                else:
                    print("No calculation history")
            elif command == "clear":
                clear_history()
                print("History cleared")
            elif command == "ms":
                print(memory_store())
            elif command == "mr":
                print(f"Memory: $\\{memory_recall()}")
            elif command == "mc":
                print(memory_clear())
            elif command == "ans":
                print(f"Last result: $\\{last_result}")
            else:
                # Parse calculation
                if any(op in command for op in ["+", "-", "*", "/", "**"]):
                    # Basic operation
                    parts = command.replace("**", "^").replace("*", " * ").replace("/", " / ").replace("+", " + ").replace("-", " - ").replace("^", " ** ").split()
                    if len(parts) == 3:
                        num1 = float(parts[0])
                        operation = parts[1].replace("^", "**")
                        num2 = float(parts[2])
                        result = basic_operation(num1, num2, operation)
                        
                        if "error" in result:
                            print(f"Error: $\\{result['error']}")
                        else:
                            print(f"$\\{result['operation']} = $\\{result['result']}")
                elif any(func in command for func in ["sqrt", "sin", "cos", "tan", "log", "ln", "factorial"]):
                    # Scientific operation
                    for func in ["sqrt", "sin", "cos", "tan", "log", "ln", "factorial"]:
                        if func in command:
                            num_str = command.replace(func, "").strip("() ")
                            num = float(num_str)
                            result = scientific_operation(num, func)
                            
                            if "error" in result:
                                print(f"Error: $\\{result['error']}")
                            else:
                                print(f"$\\{result['operation']} = $\\{result['result']}")
                            break
                else:
                    print("Invalid command. Type 'quit' to exit.")
        
        except Exception as e:
            print(f"Error: $\\{str(e)}")

# Test the calculator
if __name__ == "__main__":
    # Demo mode
    print("=== CALCULATOR DEMO ===")
    
    # Basic operations
    print(basic_operation(10, 5, "+"))
    print(basic_operation(10, 3, "/"))
    print(basic_operation(2, 8, "**"))
    
    # Memory operations
    print(memory_store(42))
    print(f"Memory recall: $\\{memory_recall()}")
    
    # Scientific operations
    print(scientific_operation(9, "sqrt"))
    print(scientific_operation(90, "sin"))
    print(scientific_operation(5, "factorial"))
    
    # Show history
    print("\\nCalculation History:")
    for calc in get_history():
        print(f"  $\\{calc['operation']} = $\\{calc['result']}")
    
    # Uncomment to run interactive session
    # calculator_session()
</code></pre>
                </div>
            </div>
        `;
    }

    getChapter3QuizContent() {
        return `
            <div class="lesson-section">
                <h3>🎯 Functions & Scope Quiz</h3>
                <div id="quiz-container-3">
                    <div class="quiz-question active" data-question="0">
                        <h4>Question 1 of 6</h4>
                        <p>What is the correct syntax for defining a function in Python?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q1" value="a"> function myFunction():</label>
                            <label><input type="radio" name="q1" value="b"> def myFunction():</label>
                            <label><input type="radio" name="q1" value="c"> create myFunction():</label>
                            <label><input type="radio" name="q1" value="d"> func myFunction():</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="1">
                        <h4>Question 2 of 6</h4>
                        <p>What does this function return?</p>
                        <pre><code>def multiply(a, b=2):
    return a * b

result = multiply(5)</code></pre>
                        <div class="quiz-options">
                            <label><input type="radio" name="q2" value="a"> 5</label>
                            <label><input type="radio" name="q2" value="b"> 10</label>
                            <label><input type="radio" name="q2" value="c"> 2</label>
                            <label><input type="radio" name="q2" value="d"> Error</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="2">
                        <h4>Question 3 of 6</h4>
                        <p>What is the scope of variable 'x' in this code?</p>
                        <pre><code>def my_function():
    x = 10
    print(x)</code></pre>
                        <div class="quiz-options">
                            <label><input type="radio" name="q3" value="a"> Global scope</label>
                            <label><input type="radio" name="q3" value="b"> Local scope</label>
                            <label><input type="radio" name="q3" value="c"> Built-in scope</label>
                            <label><input type="radio" name="q3" value="d"> Module scope</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="3">
                        <h4>Question 4 of 6</h4>
                        <p>Which keyword is used to modify a global variable inside a function?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q4" value="a"> nonlocal</label>
                            <label><input type="radio" name="q4" value="b"> global</label>
                            <label><input type="radio" name="q4" value="c"> extern</label>
                            <label><input type="radio" name="q4" value="d"> public</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="4">
                        <h4>Question 5 of 6</h4>
                        <p>What does *args allow a function to do?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q5" value="a"> Accept keyword arguments</label>
                            <label><input type="radio" name="q5" value="b"> Accept variable number of positional arguments</label>
                            <label><input type="radio" name="q5" value="c"> Return multiple values</label>
                            <label><input type="radio" name="q5" value="d"> Create nested functions</label>
                        </div>
                    </div>
                    
                    <div class="quiz-question" data-question="5">
                        <h4>Question 6 of 6</h4>
                        <p>What is the main benefit of using functions?</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q6" value="a"> Faster execution</label>
                            <label><input type="radio" name="q6" value="b"> Code reusability and organization</label>
                            <label><input type="radio" name="q6" value="c"> Less memory usage</label>
                            <label><input type="radio" name="q6" value="d"> Automatic error handling</label>
                        </div>
                    </div>
                    
                    <div class="quiz-navigation">
                        <button class="btn-secondary" id="prev-question-3" disabled>← Previous</button>
                        <button class="btn-primary" id="next-question-3">Next →</button>
                        <button class="btn-primary" id="submit-quiz-3" style="display: none;">Submit Quiz</button>
                    </div>
                </div>
            </div>
        `;
    }

    updateChapter3NextButton(lesson, button) {
        const buttonText = {
            'intro-functions': 'Next: Creating Functions →',
            'creating-functions': 'Next: Parameters →',
            'parameters': 'Next: Scope →',
            'scope': 'Next: Exercises →',
            'exercises-3': 'Next: Quiz →',
            'quiz-3': 'Complete Chapter ✓'
        };
        
        button.textContent = buttonText[lesson] || 'Next →';
        
        if (lesson === 'quiz-3') {
            button.onclick = () => {
                alert('🎉 Chapter 3 Complete!\\n\\nYou\\'ve mastered functions and scope! Ready for more advanced topics?');
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
    // Interactive Exercise Functions
    runExercise1() {
        const name = document.getElementById('ex1-name').value || 'Student';
        const age = parseInt(document.getElementById('ex1-age').value) || 20;
        const height = parseFloat(document.getElementById('ex1-height').value) || 5.8;
        const isStudent = document.getElementById('ex1-student').value === 'true';
        
        const output = document.getElementById('ex1-output');
        output.innerHTML = `
            <h5>✅ Your Generated Code:</h5>
            <div class="code-output">
                <pre><code># Personal Profile Variables
name = "${name}"
age = ${age}
height = ${height}
is_student = ${isStudent}

# Display your profile
print(f"Hello! I'm {name}")
print(f"I am {age} years old")
print(f"My height is {height} feet")
print(f"Am I a student? {is_student}")

# Output would be:
print("Hello! I'm ${name}")
print("I am ${age} years old") 
print("My height is ${height} feet")
print("Am I a student? ${isStudent}")
</code></pre>
            </div>
            <div class="success-message">
                🎉 Great! You just created variables and used them in your first program!
            </div>
        `;
        output.style.display = 'block';
    }

    runCalculator() {
        const num1 = parseFloat(document.getElementById('calc-num1').value) || 0;
        const num2 = parseFloat(document.getElementById('calc-num2').value) || 0;
        
        if (num1 === 0 && num2 === 0) {
            alert('Please enter some numbers to calculate!');
            return;
        }
        
        const addition = num1 + num2;
        const subtraction = num1 - num2;
        const multiplication = num1 * num2;
        const division = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero!';
        
        const output = document.getElementById('calc-output');
        output.innerHTML = `
            <h5>🧮 Calculator Results:</h5>
            <div class="calc-results">
                <div class="calc-row">
                    <span>${num1} + ${num2} = </span>
                    <strong>${addition}</strong>
                </div>
                <div class="calc-row">
                    <span>${num1} - ${num2} = </span>
                    <strong>${subtraction}</strong>
                </div>
                <div class="calc-row">
                    <span>${num1} × ${num2} = </span>
                    <strong>${multiplication}</strong>
                </div>
                <div class="calc-row">
                    <span>${num1} ÷ ${num2} = </span>
                    <strong>${typeof division === 'number' ? division.toFixed(2) : division}</strong>
                </div>
            </div>
            <div class="success-message">
                💪 Excellent! You're mastering basic arithmetic operations!
            </div>
        `;
        output.style.display = 'block';
    }

    checkDataTypes() {
        const answers = [
            { correct: 'str', value: '"Hello World"' },
            { correct: 'int', value: '42' },
            { correct: 'float', value: '3.14' },
            { correct: 'bool', value: 'True' }
        ];
        
        let score = 0;
        let feedback = [];
        
        answers.forEach((answer, index) => {
            const selector = document.querySelectorAll('.type-selector')[index];
            const userAnswer = selector.value;
            
            if (userAnswer === answer.correct) {
                score++;
                feedback.push(`✅ ${answer.value} is correctly identified as ${answer.correct === 'str' ? 'String' : answer.correct === 'int' ? 'Integer' : answer.correct === 'float' ? 'Float' : 'Boolean'}`);
            } else {
                const correctType = answer.correct === 'str' ? 'String' : answer.correct === 'int' ? 'Integer' : answer.correct === 'float' ? 'Float' : 'Boolean';
                feedback.push(`❌ ${answer.value} is actually a ${correctType}, not ${userAnswer || 'unselected'}`);
            }
        });
        
        const output = document.getElementById('type-output');
        const percentage = (score / answers.length) * 100;
        
        output.innerHTML = `
            <h5>📊 Data Type Quiz Results: ${score}/${answers.length} (${percentage}%)</h5>
            <div class="feedback-list">
                ${feedback.map(item => `<div class="feedback-item">${item}</div>`).join('')}
            </div>
            <div class="score-message ${percentage >= 75 ? 'success' : 'needs-improvement'}">
                ${percentage >= 75 ? '🎉 Excellent understanding of data types!' : '📚 Keep practicing! Data types are fundamental to programming.'}
            </div>
        `;
        output.style.display = 'block';
        
        // Update stats
        if (percentage >= 75) {
            this.stats.completedTasks++;
            this.saveStats();
            document.getElementById('completed-tasks').textContent = this.stats.completedTasks;
        }
    }

    revealCodeOutput() {
        const output = document.getElementById('code-output');
        output.style.display = 'block';
        
        // Update stats for code reading practice
        this.stats.completedTasks++;
        this.saveStats();
        document.getElementById('completed-tasks').textContent = this.stats.completedTasks;
    }
}

// Initialize AI Teacher
window.aiTeacher = new AITeacher();