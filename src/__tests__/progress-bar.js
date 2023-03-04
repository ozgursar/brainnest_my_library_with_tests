import ProgressBar from "../progress-bar"

// Test library for 75% of books read case
const testLibrary = [
  {
    title: "Test Book 1",
    author: "Test Author 1",
    pages: "11",
    language: "English",
    publishDate: "2020-01-03T22:35:20.413Z",
    isRead: true
  },
  {
    title: "Test Book 2",
    author: "Test Author 2",
    pages: "22",
    language: "German",
    publishDate: "2020-01-03T22:35:20.413Z",
    isRead: false
  },
  {
    title: "Test Book 3",
    author: "Test Author 3",
    pages: "33",
    language: "Dutch",
    publishDate: "2020-01-03T22:35:20.413Z",
    isRead: true
  },
  {
    title: "Test Book 4",
    author: "Test Author 4",
    pages: "44",
    language: "Serbian",
    publishDate: "2020-01-03T22:35:20.413Z",
    isRead: true
  }
]

// Test library for no books read case
const testLibrary2 = [
  {
    title: "Test Book 1",
    author: "Test Author 1",
    pages: "11",
    language: "English",
    publishDate: "2020-01-03T22:35:20.413Z",
    isRead: false
  },
  {
    title: "Test Book 2",
    author: "Test Author 2",
    pages: "22",
    language: "German",
    publishDate: "2020-01-03T22:35:20.413Z",
    isRead: false
  }
]

beforeEach(() => {
  const progressElement = document.createElement("div")
  progressElement.className = "progress"

  const barElement = document.createElement("div")
  barElement.classList.add("bar", "pattern")

  const spanElement = document.createElement("span")
  barElement.append(spanElement)
  progressElement.append(barElement)
  document.body.appendChild(progressElement)

  const mockSmallElement = document.createElement("small")
  mockSmallElement.className="nobooksread"
  document.body.appendChild(mockSmallElement) 
})

test('Returns correct read percent', () => { 
  // Expect 75 percent read
  expect(ProgressBar.updateProgress(testLibrary)).toBe(75)
})

test('Handles no books read case', () => {  
  // Expect zero percent read
  expect(ProgressBar.updateProgress(testLibrary2)).toBe(0)
})
