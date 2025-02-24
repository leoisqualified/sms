import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for the user.
 * @param {Object} user - The user object.
 * @param {string} user._id - The user's ID.
 * @param {string} user.email - The user's email.
 * @param {string} user.role - The user's role.
 * @param {string} [expiresIn="1h"] - Token expiration time (default: 1 hour).
 * @returns {string} - The generated JWT token.
 */
const jwtManager = (user, expiresIn = "1h") => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role, // Ensure role is included
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

export default jwtManager;
