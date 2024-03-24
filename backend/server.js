const express = require('express');
const app = express();
const PORT = 9000;

app.get('/', (req, res) => {
  res.send("BE for Citizenship Test App works as expected.");
});

app.listen(PORT, () => {
  console.log(`BE server is running on ${PORT}`);
});
