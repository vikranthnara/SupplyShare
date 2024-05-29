const express = require("express");
const session = require('express-session');
const crypto = require('crypto');
const mysql = require("mysql");
const config = require("./config");
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require("cors");

const storage = multer.memoryStorage()

// Generate a random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(
  session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: true,
  })
);

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});*/

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const connection = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database.");
});

app.get('/', (req, res) => {
  // Check if the user is logged in
  if (req.session.user_id) {
    res.sendFile(__dirname + "/views/home.html");
  } else {
    res.redirect('/login'); // Redirect to login page if not logged in
  }
});


app.get('/login', (req, res) => {
  res.render('login.ejs');
});

/*app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  // Check if the email and password match a user in the database
  const sql = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';
  connection.query(sql, [email, password], (err, results) => {
    if (err) throw err;
    console.log('Query Results:', results);
    // If user is found, store the user ID in the session
    if (results.length > 0) {
      const userId = results[0].UUID;
      console.log('User ID:', userId);
      req.session.user_id = userId; // Store user ID in session
      res.status(200).json({ message: 'Login successful' });
      res.redirect('/'); // Redirect to home page
    } else {
      res.redirect('/login'); // Redirect back to login page if login fails
      res.status(500).json({ message: 'Registration failed' });
    }

  });
}); */
app.post('/login', (req, res) => {
  const { fullname, email, password } = req.body;
  
  // Check if the email and password match a user in the database
  const sql = 'SELECT * FROM Users WHERE FullName = ? AND Email = ? AND Password = ?';
  connection.query(sql, [fullname, email, password], (err, results) => {
    if (err) { 
      console.error(err);
      return res.status(500).json({ message: 'Login failed' });
    }

    console.log('Query Results:', results);
    // If user is found, store the user ID in the session
    if (results.length > 0) {
      const userId = results[0].UUID;
      console.log('User ID:', userId);
      req.session.user_id = userId; // Store user ID in session
      console.log("Login successful");
      return res.status(200).json({ message: 'Login successful' });
    }

    console.log("Login failed");
    return res.status(500).json({ message: 'Login failed' });
  });
});




app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', (req, res) => {
  console.log(req.body)
  const {fullname, email, password } = req.body;
  console.log(fullname)
  console.log(password)
  console.log(email)
  const sql = 'INSERT INTO Users (UUID, FullName, Email, Password) VALUES (UUID(), ?, ?, ?)';
  // const sql = `INSERT INTO Users (UUID, FullName, Email, Password) VALUES (UUID(), "${FullName}", ${password}, ${email})`;

  connection.query(sql, [fullname, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(200).json({ message: 'Registration successful' });
  });
  console.log(sql)
});

app.get("/seller-form", (req, res) => {
  res.sendFile(__dirname + "/views/seller-form.html");
});

const upload = multer({ storage: storage });
//const upload = multer();


app.post('/seller-form', upload.single('image'), (req, res) => {
  const { name, price, description, seller } = req.body;

  //let image = null;
  //if (req.file) {
    const image = req.file.buffer;
    console.log(image)
  //}

  const sql = 'INSERT INTO Items (UUID, Name, Price, Description, Seller, Images) VALUES (UUID(), ?, ?, ?, ?, ?)';
  connection.query(sql, [name, price, description, seller, image], (err, result) => {
    if (err) throw err;
    console.log('Item added to database.');
    res.redirect('/');
  });
});


app.get("/search", (req, res) => {
  const { name } = req.query;
  const sql = "SELECT * FROM Items WHERE Name = ?";
  connection.query(sql, [name], (err, results) => {
    if (err) throw err;
    res.render("search-results.ejs", { items: results });
  });
});

app.get('/cart', (req, res) => {
  // Check if the user is logged in
  const userLoggedIn = req.session.user_id ? true : false;

  const sql = `SELECT Users.fullname, Items.UUID, Items.Name
               FROM Users
               INNER JOIN Cart ON Users.UUID = Cart.User_id
               INNER JOIN Items ON Cart.Item_id = Items.UUID`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render('cart', { items: results, userLoggedIn: userLoggedIn });
  });
});




app.post('/cart', (req, res) => {
  const { itemId } = req.body;
  const userId = req.session.user_id; // Retrieve the logged-in user's ID from the session

  if (!userId) {
    // If user is not logged in, redirect back to login page
    res.redirect('/login');
    return;
  }

  // Check if the item exists in the database
  const sql = 'SELECT * FROM Items WHERE UUID = ?';
  connection.query(sql, [itemId], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      // If the item does not exist, show an error or redirect to an error page
      res.send('Item not found.');
    } else {
      // Item found, add it to the cart
      const item = results[0];

      const cartSql = 'INSERT INTO Cart (Cart_Id, User_id, Item_id, Quantity) VALUES (UUID(), ?, ?, 3)';
      connection.query(cartSql, [userId, itemId], (err, result) => {
        if (err) throw err;
        console.log('Item added to cart.');

        // Redirect to the cart page
        res.redirect('/cart');
      });
    }
  });
});


app.post('/cart/delete', (req, res) => {
  const itemId = req.body.itemId;
  const userId = req.session.user_id;
  console.log(itemId)
  console.log(userId)
  const sql = 'DELETE FROM Cart WHERE User_id = ? AND Item_id = ?';
  connection.query(sql, [userId, itemId], (err, result) => {
    if (err) throw err;
    console.log('Item deleted from cart.');
    res.redirect('/cart');
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});