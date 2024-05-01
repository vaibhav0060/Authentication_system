const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require("./models/users");



const app = express();
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }

));
app.use(express.json());
app.use(cookieParser());


mongoose.connect("mongodb+srv://chaudharivaibhav60:A63LHQmHPv3EeCji@cluster0.d5yq03g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const port = 5000;

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing")
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token")
      } else {
        if (decoded.role === "admin") {
          next()
        } else {
          return res.json("Not Admin")
        }
      }
    })
  }
}

app.get("/dashboard", verifyUser, (req, res) => {
  res.json("Success")
})
app.get('/logout', (req, res) => {
  res.clearCookie('token'); // This line clears the 'token' cookie from the user's browser.
  return res.json({ status: 'Success' }); // This line sends a response back to the client indicating the logout was successful.
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ name, email, password: hash })
        .then(user => {
          res.json("Success")
        })
        .catch(err => res.json(err))

    }).catch(err => res.json(err))


})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({
    email: email

  })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" })
            res.cookie("token", token)
            return res.json({ status: "Success", role: user.role })
          } else {
            return res.json("The PassWord is incorrect ")
          }

        })
      }
      else {
        return res.json("User is not found")
      }
    })

})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});


// userName - chaudharivaibhav60
// pass  -A63LHQmHPv3EeCji
// mongo url - mongodb+srv://chaudharivaibhav60:A63LHQmHPv3EeCji@cluster0.d5yq03g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


//mongodb+srv://chaudharivaibhav60:<password>@cluster0.d5yq03g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0