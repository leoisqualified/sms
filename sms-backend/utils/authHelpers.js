import bcrypt from "bcryptjs";

/**
 * Hashes the password before saving to the database.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares a given password with the stored hashed password.
 * @param {string} enteredPassword - The plain text password.
 * @param {string} storedPassword - The hashed password from DB.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
export const comparePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};
