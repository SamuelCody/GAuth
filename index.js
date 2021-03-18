require("dotenv").config();
const app = require("./config/app");
const mongoose = require("mongoose");

const PORT = process.env.PORT;

mongoose.set("debug", true);
// async function connectDB () {
//     const conn =  await mongoose.connect(process.env.DB_URI, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//       });
//       console.log(conn.connection.host);
// }

// connectDB();

mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

mongoose.Promise = Promise;

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
  });