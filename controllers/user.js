const { connection } = require("../db/db");

//login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [exists] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE email=? AND password=?`, [
        email,
        password,
      ]);
     
    if (exists.length === 0) {
      res.json({ message: "no such user", user:exists[0] });
      return ;
    }
    res.json({ message: "logged in", user:exists[0]   });
  } catch (err) {
    res.json({ message: err });
  }
};

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [exists] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE email=?`, [email]);
    if (exists.length === 0) {
      await connection
        .promise()
        .query(`INSERT INTO users(email,password) VALUES(?,?)`, [
          email,
          password,
        ]);
      res.status(200).json({ message: "user created" });
      return;
    }
    res.json({ message: "user exists" });
  } catch (error) {
    res.json({ message: error });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const [users] = await connection.promise().query(`SELECT * FROM users`);
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteUserController = async (req, res) => {
  const userId = req.params.id;
  try {
    await connection.promise().query(`DELETE FROM users WHERE id=?`, [userId]);
    res.json({ message: "user deleted"  });
  } catch (error) {
    res.json({ message: error });
  }

}

module.exports = {
  loginController,
  signupController,
  getAllUsersController,
  deleteUserController
};
