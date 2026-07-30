# Product Requirements Document (PRD)

## 1. Product Overview
- **Product Name**: BookVerse
- **Tagline**: Frictionless, distraction-free browser-based reading platform.
- **Vision**: Provide a high-performance web reading platform allowing users to discover, purchase, read, and annotate books across devices seamlessly.

---

## 2. Target Users & Persona Mapping
1. **Student / Researcher**: Requires search within books, text highlighting, chapter jumping, and citation note-taking.
2. **Casual Reader**: Seeks dark/light/sepia themes, customized typography, reading progress sync, and quick bookmarks across mobile and desktop browsers.
3. **Library / Educational Institution**: Needs bulk access, role-based controls, analytics, and content access governance.
4. **Admin / Content Manager**: Needs dashboard for book uploads (EPUB/PDF), metadata tagging, user management, and platform analytics.

---

## 3. MVP Scope & Functional Requirements

### 3.1 Authentication & User Management
- **Auth Protocols**: JWT with Refresh Tokens & NextAuth / Auth.js integration.
- **Methods**: Email/Password registration, Login, Google OAuth 2.0.
- **Account Features**: Password reset via email token, email verification, profile management (Avatar, Display Name, Reading Preferences).

### 3.2 Library & Discovery
- **Catalog Browsing**: Grid and list views categorized by genre, author, and tags.
- **Search & Filtering**: Real-time search by Title, Author, Genre, and ISBN; filters for Trending, Top Rated, and Recently Added.
- **User Collections**: Favorites, Currently Reading list, Reading History.

### 3.3 Web Reader Engine (EPUB & PDF)
- **Supported Formats**: `.epub` (parsed via `epubjs`) and `.pdf` (rendered via `pdfjs-dist`).
- **Typography & Theme Controls**:
  - Font Size adjustments (12px to 32px)
  - Font Family switcher (Serif, Sans-Serif, Monospace, Dyslexic-friendly)
  - Line Spacing (1.2, 1.5, 2.0) & Margins
  - Color Themes: Light, Dark, Sepia, Midnight
- **Reading Controls**:
  - Paginated & continuous scroll modes
  - Table of Contents navigation
  - Fullscreen reading toggle
  - Keyboard shortcuts (Left/Right arrows, `F` for fullscreen, `B` for bookmark)
- **Progress Tracking**: Automatic position saving (CFI for EPUB, Page number for PDF), progress percentage calculation.
- **Bookmarks & Annotations**: Create, list, and delete bookmarks; text highlighting and note attachment.

### 3.4 Admin Dashboard
- **Content Management**: Secure upload for EPUB/PDF files to Cloudflare R2 / AWS S3, automatic page/chapter metadata extraction.
- **Metadata Management**: Edit book details, cover image upload, category management.
- **User & Analytics**: View active users, reading stats, platform usage reports.

---

## 4. Non-Functional Requirements (NFRs)
- **Performance**: Initial page load `< 2s` (TTFB `< 400ms`); reader view interactive `< 1s`.
- **Availability**: `99.9%` uptime SLA with CDN edge caching for static assets.
- **Responsiveness**: Mobile-first fluid responsive layout (320px to 4K displays).
- **Accessibility**: Compliance with WCAG 2.1 Level AA standards (screen reader support, ARIA labels, contrast ratio `>= 4.5:1`).
- **SEO**: Server-side rendering (SSR) for landing, category, and public book detail pages.

---

## 5. Success Metrics (KPIs)
- Daily Active Users (DAU) and Monthly Active Users (MAU).
- Average Daily Reading Time per user.
- Book Completion Rate.
- Reader Load Latency (`< 1.5s`).

---

## 6. Appendix: 120 Book Reference Catalog

Reference Library Seed Set: 120 books across classic fiction, modern fiction, psychology, business, philosophy, science, self-help, YA, mystery, fantasy, sci-fi, and nonfiction. Used for featured books, search indexing, category pages, recommendations, and demo content.

### 1) Classic Fiction
1. *Pride and Prejudice* by Jane Austen
2. *Moby-Dick* by Herman Melville
3. *Jane Eyre* by Charlotte Brontë
4. *Wuthering Heights* by Emily Brontë
5. *Great Expectations* by Charles Dickens
6. *The Odyssey* by Homer
7. *Crime and Punishment* by Fyodor Dostoevsky
8. *War and Peace* by Leo Tolstoy
9. *The Count of Monte Cristo* by Alexandre Dumas
10. *Middlemarch* by George Eliot

### 2) Modern Fiction
1. *The Great Gatsby* by F. Scott Fitzgerald
2. *To Kill a Mockingbird* by Harper Lee
3. *1984* by George Orwell
4. *Brave New World* by Aldous Huxley
5. *The Catcher in the Rye* by J.D. Salinger
6. *Beloved* by Toni Morrison
7. *One Hundred Years of Solitude* by Gabriel García Márquez
8. *Midnight's Children* by Salman Rushdie
9. *The Road* by Cormac McCarthy
10. *Life of Pi* by Yann Martel

### 3) Psychology / Behavior
1. *Influence* by Robert B. Cialdini
2. *The Lucifer Effect* by Philip Zimbardo
3. *The Psychopath Test* by Jon Ronson
4. *Thinking, Fast and Slow* by Daniel Kahneman
5. *Man's Search for Meaning* by Viktor E. Frankl
6. *The Social Animal* by Elliot Aronson
7. *Games People Play* by Eric Berne
8. *Predictably Irrational* by Dan Ariely
9. *Emotional Intelligence* by Daniel Goleman
10. *Quiet* by Susan Cain

### 4) Business / Leadership
1. *Good to Great* by Jim Collins
2. *The Lean Startup* by Eric Ries
3. *Zero to One* by Peter Thiel
4. *The 7 Habits of Highly Effective People* by Stephen R. Covey
5. *Atomic Habits* by James Clear
6. *Start with Why* by Simon Sinek
7. *The Hard Thing About Hard Things* by Ben Horowitz
8. *How to Win Friends and Influence People* by Dale Carnegie
9. *Blue Ocean Strategy* by W. Chan Kim & Renée Mauborgne
10. *Leaders Eat Last* by Simon Sinek

### 5) Philosophy / Mind
1. *Meditations* by Marcus Aurelius
2. *Beyond Good and Evil* by Friedrich Nietzsche
3. *The Republic* by Plato
4. *The Myth of Sisyphus* by Albert Camus
5. *Nicomachean Ethics* by Aristotle
6. *Critique of Pure Reason* by Immanuel Kant
7. *The Prince* by Niccolò Machiavelli
8. *The Bhagavad Gita*
9. *Tao Te Ching* by Lao Tzu
10. *Being and Time* by Martin Heidegger

### 6) Science / Popular Science
1. *A Brief History of Time* by Stephen Hawking
2. *The Selfish Gene* by Richard Dawkins
3. *The Gene* by Siddhartha Mukherjee
4. *Sapiens* by Yuval Noah Harari
5. *Cosmos* by Carl Sagan
6. *The Elegant Universe* by Brian Greene
7. *Astrophysics for People in a Hurry* by Neil deGrasse Tyson
8. *The Origin of Species* by Charles Darwin
9. *Silent Spring* by Rachel Carson
10. *The Immortal Life of Henrietta Lacks* by Rebecca Skloot

### 7) Self-Help / Personal Development
1. *The Power of Habit* by Charles Duhigg
2. *Deep Work* by Cal Newport
3. *Essentialism* by Greg McKeown
4. *Can't Hurt Me* by David Goggins
5. *The Subtle Art of Not Giving a F*ck* by Mark Manson
6. *Mindset* by Carol S. Dweck
7. *Grit* by Angela Duckworth
8. *The Mountain Is You* by Brianna Wiest
9. *Daring Greatly* by Brené Brown
10. *The Four Agreements* by Don Miguel Ruiz

### 8) Young Adult / Coming-of-Age
1. *Harry Potter and the Sorcerer's Stone* by J.K. Rowling
2. *The Hunger Games* by Suzanne Collins
3. *The Fault in Our Stars* by John Green
4. *Divergent* by Veronica Roth
5. *Percy Jackson and the Olympians: The Lightning Thief* by Rick Riordan
6. *Anne of Green Gables* by L.M. Montgomery
7. *Little Women* by Louisa May Alcott
8. *The Book Thief* by Markus Zusak
9. *Wonder* by R.J. Palacio
10. *Looking for Alaska* by John Green

### 9) Mystery / Thriller
1. *The Girl with the Dragon Tattoo* by Stieg Larsson
2. *Gone Girl* by Gillian Flynn
3. *The Da Vinci Code* by Dan Brown
4. *And Then There Were None* by Agatha Christie
5. *The Big Sleep* by Raymond Chandler
6. *Sherlock Holmes: The Complete Novels and Stories* by Arthur Conan Doyle
7. *In the Woods* by Tana French
8. *The Silent Patient* by Alex Michaelides
9. *The Maltese Falcon* by Dashiell Hammett
10. *The Woman in White* by Wilkie Collins

### 10) Fantasy
1. *The Hobbit* by J.R.R. Tolkien
2. *The Fellowship of the Ring* by J.R.R. Tolkien
3. *The Two Towers* by J.R.R. Tolkien
4. *The Return of the King* by J.R.R. Tolkien
5. *A Game of Thrones* by George R.R. Martin
6. *Harry Potter and the Chamber of Secrets* by J.K. Rowling
7. *The Name of the Wind* by Patrick Rothfuss
8. *Mistborn* by Brandon Sanderson
9. *The Lion, the Witch and the Wardrobe* by C.S. Lewis
10. *American Gods* by Neil Gaiman

### 11) Science Fiction
1. *Dune* by Frank Herbert
2. *Neuromancer* by William Gibson
3. *Foundation* by Isaac Asimov
4. *Ender's Game* by Orson Scott Card
5. *The Left Hand of Darkness* by Ursula K. Le Guin
6. *Fahrenheit 451* by Ray Bradbury
7. *Do Androids Dream of Electric Sheep?* by Philip K. Dick
8. *The Martian* by Andy Weir
9. *Snow Crash* by Neal Stephenson
10. *Hyperion* by Dan Simmons

### 12) Nonfiction / History
1. *The Diary of a Young Girl* by Anne Frank
2. *The Silk Roads* by Peter Frankopan
3. *Guns, Germs, and Steel* by Jared Diamond
4. *The Wright Brothers* by David McCullough
5. *Team of Rivals* by Doris Kearns Goodwin
6. *The Warmth of Other Suns* by Isabel Wilkerson
7. *Into Thin Air* by Jon Krakauer
8. *Educated* by Tara Westover
9. *The Rise and Fall of the Third Reich* by William L. Shirer
10. *A People's History of the United States* by Howard Zinn

