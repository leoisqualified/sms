import User from "../models/User";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });

      //Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create new user
      user = new User({ name, email, password: hashedPassword, role });
      await user.save();

      res.status(201).json({ msg: "User created successfully" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Invalid Credentials" });

    //Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });

    //Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const protect = async (req, res) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ msg: "Token is required, Authorization Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
