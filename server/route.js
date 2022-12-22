const pool = require('./db');


app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // User found, return a success response
      res.send({ success: true });
    } else {
      // User not found, return an error response
      res.send({ success: false, message: 'Invalid email or password' });
    }
  });
});

app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    pool.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`, (error, results) => {
      if (error) {
        throw error;
      }
      res.send({ success: true });
    });
  });
  