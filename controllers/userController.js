// controllers/userController.js

// Dummy in-memory user list (replace with DB later)
const users = [];

// Register a new user
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  // Add new user to the list
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully", user: newUser });
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful", user });
};

module.exports = {
  registerUser,
  loginUser,
};
