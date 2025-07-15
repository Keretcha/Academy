const library = {
  books: [],
  users: [],
};

const books = [
  {
    id: 1,
    title: "JavaScript Basics",
    author: "John Doe",
    genre: "Programming",
    rating: 4.5,
    year: 2020,
    isAvailable: true,
    borrowCount: 0,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    rating: 4.7,
    year: 1949,
    isAvailable: true,
    borrowCount: 15,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    rating: 4.8,
    year: 1960,
    isAvailable: true,
    borrowCount: 12,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    rating: 4.6,
    year: 1813,
    isAvailable: true,
    borrowCount: 9,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    rating: 4.0,
    year: 1951,
    isAvailable: true,
    borrowCount: 6,
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    rating: 4.7,
    year: 1937,
    isAvailable: true,
    borrowCount: 14,
  },
  {
    id: 7,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    rating: 4.6,
    year: 1988,
    isAvailable: true,
    borrowCount: 18,
  },
  {
    id: 8,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    rating: 4.2,
    year: 2003,
    isAvailable: true,
    borrowCount: 20,
  },
  {
    id: 9,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    rating: 3.9,
    year: 1953,
    isAvailable: true,
    borrowCount: 13,
  },
];

const users = [
  {
    userName: "Charlie",
    borrowedBooks: [
      {
        bookId: 1,
        borrowDate: new Date(),
        returnDate: new Date(),
      },
    ],
    penaltyPoints: 0,
    genresBorrowed: {},
  },
  {
    userName: "Mark",
    borrowedBooks: [
      {
        bookId: 2,
        borrowDate: new Date("2025-01-15"),
        dueDate: new Date("2025-01-29"),
        returnDate: new Date("2025-01-25"),
      },
      {
        bookId: 3,
        borrowDate: new Date("2025-01-15"),
        dueDate: new Date("2025-01-29"),
        returnDate: new Date("2025-01-25"),
      },
    ],
    penaltyPoints: 2,
    genresBorrowed: {
      Dystopian: 1,
    },
  },
  {
    userName: "Bob",
    borrowedBooks: [
      {
        bookId: 4,
        borrowDate: new Date("2025-06-10"),
        dueDate: new Date("2025-06-24"),
      },
      {
        bookId: 5,
        borrowDate: new Date("2025-04-01"),
        dueDate: new Date("2025-04-15"),
      },
    ],
    penaltyPoints: 3,
    genresBorrowed: {
      Fantasy: 1,
      Fiction: 1,
    },
  },
  {
    userName: "Paddy",
    borrowedBooks: [
      {
        bookId: 7,
        borrowDate: new Date("2025-06-17"),
        dueDate: new Date("2025-07-01"),
      },
    ],
    penaltyPoints: 0,
    genresBorrowed: {},
  },
];

library.books = books;
library.users = users;

// helper functions
function getBookById(bookId) {
  return library.books.find((b) => b.id === bookId);
}

function getUserByUsername(userName) {
  return library.users.find((u) => u.userName === userName);
}

// Adding book in Library
function addBook(book) {
  const newBook = {
    ...book,
    isAvailable: true,
    borrowCount: 0,
  };

  library.books.push(newBook);
  console.log(`Book "${newBook.title}" added to the library.`);
}

// addBook({
//   id: 2,
//   title: "Learn React",
//   author: "Dan Abramov",
//   genre: "Programming",
//   rating: 4.7,
//   year: 2021,
// });

// Borrow book
function borrowBook(userName, bookId) {
  const book = getBookById(bookId);

  if (!book) {
    console.log("Book not found.");
    return;
  }

  if (!book.isAvailable) {
    console.log(`The book "${book.title}" is currently unavailable.`);
    return;
  }

  let user = getUserByUsername(userName);

  if (!user) {
    console.log(`User ${userName} not found. Creating new user.`);
    library.users.push({
      userName: userName,
      borrowedBooks: [],
      penaltyPoints: 0,
      genresBorrowed: {},
    });

    user = getUserByUsername(userName);
  }

  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(borrowDate.getDate() + 14);

  user.borrowedBooks.push({
    bookId,
    borrowDate,
    dueDate,
  });

  book.isAvailable = false;
  book.borrowCount += 1;

  user.genresBorrowed[book.genre] = (user.genresBorrowed[book.genre] || 0) + 1;

  console.log(`${userName} successfully borrowed "${book.title}".`);
  console.log(`Due date: ${dueDate.toDateString()}`);
}

// borrowBook("Alice", 1);
// borrowBook("Bob", 1);

// Return book
function returnBook(userName, bookId) {
  const book = getBookById(bookId);
  if (!book) {
    console.log("Book not found.");
    return;
  }

  const user = getUserByUsername(userName);
  if (!user) {
    console.log(`User ${userName} not found.`);
    return;
  }

  const borrowedBook = user.borrowedBooks.find((b) => b.bookId === bookId);
  if (!borrowedBook) {
    console.log(`${userName} did not borrow this book.`);
    return;
  }

  const returnDate = new Date();

  if (returnDate > borrowedBook.dueDate) {
    const daysLate = Math.floor(
      (returnDate - borrowedBook.dueDate) / (1000 * 60 * 60 * 24)
    );
    user.penaltyPoints += daysLate;
    console.log(
      `${user.userName} returned "${book.title}" late by ${daysLate} days. ${daysLate} penalty points added.`
    );
  } else {
    console.log(`Thank you for returning "${book.title}" on time!`);
  }

  book.isAvailable = true;
  user.borrowedBooks = user.borrowedBooks.filter((b) => b.bookId !== bookId);
}

// returnBook("Bob", 5);

// Search books
function searchBooksBy(param, value) {
  let results = [];

  switch (param) {
    case "author":
      results = library.books.filter(
        (book) => book.author.toLowerCase() === value.toLowerCase()
      );
      console.log(`Searching books by author: "${value}"`, results);
      break;

    case "genre":
      results = library.books.filter(
        (book) => book.genre.toLowerCase() === value.toLowerCase()
      );
      console.log(`Searching books by genre: "${value}"`, results);
      break;

    case "rating":
      results = library.books.filter((book) => book.rating >= value);
      console.log(`Searching books with rating >= ${value}`, results);
      break;

    case "year":
      results = library.books.filter((book) => {
        if (value.before && book.year >= value.before) return false;
        if (value.after && book.year <= value.after) return false;
        return true;
      });
      console.log(
        `Searching books by year with before: ${value.before}, after: ${value.after}`,
        results
      );
      break;

    default:
      console.log(`Invalid search parameter: "${param}"`);
      return [];
  }

  if (results.length === 0) {
    console.log(`No books found for ${param} = ${JSON.stringify(value)}`);
  } else {
    console.log(
      `${results.length} book(s) found for ${param} = ${JSON.stringify(value)}`
    );
  }

  return results;
}

// searchBooksBy("genre", "fiction");
// searchBooksBy("author", "Paulo Coelho");
// searchBooksBy("year", { after: 2018, before: 2023 });

// Top Rated books
function getTopRatedBooks(limit) {
  const sortedBooks = library.books.sort((a, b) => b.rating - a.rating);

  return sortedBooks.slice(0, limit);
}

// getTopRatedBooks(5);

// Most popular books
function getMostPopularBooks(limit) {
  const sortedBooks = library.books.sort(
    (a, b) => b.borrowCount - a.borrowCount
  );

  return sortedBooks.slice(0, limit);
}

// getMostPopularBooks(5);

// Checking overdue users
function checkOverdueUsers() {
  const overdueUsers = [];
  const today = new Date();

  library.users.forEach((user) => {
    const overdueBooks = [];

    user.borrowedBooks.forEach((borrowedBook) => {
      const book = getBookById(borrowedBook.bookId);

      if (borrowedBook.returnDate) return;

      if (borrowedBook.dueDate && today > borrowedBook.dueDate) {
        const daysLate = Math.floor(
          (today - borrowedBook.dueDate) / (1000 * 60 * 60 * 24)
        );

        overdueBooks.push({
          bookTitle: book.title,
          daysLate,
        });
      }
    });

    if (overdueBooks.length > 0) {
      overdueUsers.push({
        userName: user.userName,
        overdueBooks,
      });
    }
  });

  if (overdueUsers.length === 0) {
    console.log("No overdue books.");
  } else {
    console.log("Overdue Users:");
    overdueUsers.forEach((user) => {
      console.log(`- ${user.userName}:`);
      user.overdueBooks.forEach((book) =>
        console.log(`   • ${book.bookTitle} is ${book.daysLate} days overdue`)
      );
    });
  }

  return overdueUsers;
}

// checkOverdueUsers();

// Recommended books for user
function recommendBooks(userName) {
  const user = getUserByUsername(userName);
  if (!user) {
    console.log(`User ${userName} not found.`);
    return [];
  }

  const borrowedBookIds = user.borrowedBooks.map((b) => b.bookId);

  const borrowedBooks = library.books.filter((book) =>
    borrowedBookIds.includes(book.id)
  );

  const borrowedGenres = borrowedBooks.map((book) => book.genre);

  const uniqueGenres = [...new Set(borrowedGenres)];

  const recommendedBooks = library.books.filter(
    (book) =>
      uniqueGenres.includes(book.genre) && !borrowedBookIds.includes(book.id)
  );

  recommendedBooks.sort((a, b) => b.rating - a.rating);

  if (recommendedBooks.length === 0) {
    console.log(`No new recommendations for ${userName}.`);
  } else {
    console.log(`Recommendations for ${userName}:`);
    recommendedBooks.forEach((book) =>
      console.log(`• "${book.title}" by ${book.author} (${book.genre})`)
    );
  }

  return recommendedBooks;
}

// recommendBooks("Mark");

// Remove book from Library
function removeBook(bookId) {
  const index = library.books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    library.books = [
      ...library.books.slice(0, index),
      ...library.books.slice(index + 1),
    ];

    console.log(`Book with ID ${bookId} removed.`);
  } else {
    console.log(`Book with ID ${bookId} not found.`);
  }
}

// removeBook(2);
// console.log(library.books);

// Printing user summary
function printUserSummary(userName) {
  const user = getUserByUsername(userName);

  if (!user) {
    console.log(`User ${userName} not found.`);
    return;
  }

  const today = new Date();

  const overdueBooks = user.borrowedBooks.filter(
    (book) => !book.returnDate && book.dueDate < today
  );

  const borrowedBooks = user.borrowedBooks.filter((book) => !book.returnDate);

  let totalPenaltyPoints = 0;
  overdueBooks.forEach((book) => {
    const daysLate = Math.floor((today - book.dueDate) / (1000 * 60 * 60 * 24));
    totalPenaltyPoints += daysLate;
  });

  if (overdueBooks.length > 0) {
    console.log(`Overdue items for ${userName}:`);
    overdueBooks.forEach((book) => {
      console.log(
        `- "${getBookById(book.bookId).title}" is ${Math.floor(
          (today - book.dueDate) / (1000 * 60 * 60 * 24)
        )} days overdue.`
      );
    });
  } else {
    console.log(`${userName} has no overdue items.`);
  }

  if (borrowedBooks.length > 0) {
    console.log(`Currently borrowed books by ${userName}:`);
    borrowedBooks.forEach((book) => {
      console.log(`- "${getBookById(book.bookId).title}"`);
    });
  } else {
    console.log(`${userName} has no currently borrowed books.`);
  }

  console.log(`${userName}'s total penalty points: ${totalPenaltyPoints}`);
}
