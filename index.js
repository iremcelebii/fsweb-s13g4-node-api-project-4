require("dotenv").config();

const server = require("./api/server");
const port = process.env.PORT || 9001;
// console.log(port);

server.listen(port, (req, res) => {
  console.log(`server is listening on ${port}`);
});
