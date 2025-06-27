-- USERS (Learners)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mobile TEXT,
    targetExam TEXT,
    preferredLanguage TEXT,
    role TEXT DEFAULT 'learner', -- 'learner' or 'educator'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EDUCATORS
CREATE TABLE IF NOT EXISTS educators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mobile TEXT,
    subjects TEXT,
    qualification TEXT,
    experience INTEGER,
    bio TEXT,
    role TEXT DEFAULT 'educator'
);

-- COURSES
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    educator_id INTEGER NOT NULL,
    target_exam TEXT,
    duration TEXT,
    validity TEXT,
    price INTEGER,
    discounted_price INTEGER,
    type TEXT, -- recorded or live
    language TEXT,
    rating REAL DEFAULT 0,
    enrolled_students INTEGER DEFAULT 0,
    thumbnail TEXT,
    highlights TEXT, -- Comma-separated highlights
    FOREIGN KEY (educator_id) REFERENCES educators(id)
);

-- LESSONS
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    chapter TEXT,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    duration INTEGER,
    lesson_order INTEGER,
    is_free BOOLEAN DEFAULT 0,
    resources TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- LIVE CLASSES
CREATE TABLE IF NOT EXISTS live_classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    educator_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    scheduled_at TEXT,
    duration INTEGER,
    max_students INTEGER,
    enrolled INTEGER DEFAULT 0,
    recording_url TEXT,
    status TEXT DEFAULT 'scheduled',
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (educator_id) REFERENCES educators(id)
);

-- ENROLLMENTS
CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    purchase_date TEXT,
    expiry_date TEXT,
    progress INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(user_id, course_id)
);

-- WATCH HISTORY
CREATE TABLE IF NOT EXISTS watch_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    watched_duration INTEGER,
    total_duration INTEGER,
    completed BOOLEAN DEFAULT 0,
    last_watched TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    UNIQUE(user_id, lesson_id)
);

-- TESTS
CREATE TABLE IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    type TEXT, -- mock/practice/chapter
    subject TEXT,
    questions_count INTEGER,
    duration INTEGER,
    max_marks INTEGER,
    difficulty TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- TEST ATTEMPTS
CREATE TABLE IF NOT EXISTS test_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    test_id INTEGER NOT NULL,
    score INTEGER,
    time_taken INTEGER,
    answers TEXT, -- JSON stringified
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan_name TEXT,
    price INTEGER,
    duration TEXT,
    benefits TEXT,
    purchased_at TEXT,
    expires_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- DOUBTS
CREATE TABLE IF NOT EXISTS doubts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    lesson_id INTEGER,
    question TEXT,
    attachments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- DOUBT ANSWERS
CREATE TABLE IF NOT EXISTS doubt_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doubt_id INTEGER NOT NULL,
    educator_id INTEGER NOT NULL,
    answer TEXT NOT NULL,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doubt_id) REFERENCES doubts(id),
    FOREIGN KEY (educator_id) REFERENCES educators(id)
);

-- STUDY MATERIALS
CREATE TABLE IF NOT EXISTS study_materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    title TEXT,
    chapter TEXT,
    type TEXT, -- pdf, notes, etc.
    url TEXT,
    size TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- MATERIAL DOWNLOADS
CREATE TABLE IF NOT EXISTS material_downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    material_id INTEGER NOT NULL,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (material_id) REFERENCES study_materials(id)
);

-- NOTES
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    timestamp INTEGER,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- COURSE REVIEWS
CREATE TABLE IF NOT EXISTS course_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    rating INTEGER,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(user_id, course_id)
);
