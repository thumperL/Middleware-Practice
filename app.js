// app.js
const express = require('express');

const middleware = require('./middleware/index');

const app = express();
const port = 3000;

app.get('/', middleware.logRequest, (req, res) => {
  res.send(`
    列出全部 Todo
    <br>> <a href="/">列出全部 Todo 頁面</a>
    <br>> <a href="/new">新增 Todo 頁面</a>
    <br>> <a href="/1234">顯示一筆 Todo</a>
    <br>> <a href="#" onclick="fakePost()">新增一筆 Todo</a><p id="result"></p>
    <script>
      function fakePost() {
        console.log('triggered');
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(param="posted");
        alert('posted');
      }
    </script>
  `);
});

app.get('/new', middleware.logRequest, (req, res) => {
  res.send('新增 Todo 頁面<br><a href="/">Back</a>');
});

app.get('/:id', middleware.logRequest, (req, res) => {
  res.send('顯示一筆 Todo<br><a href="/">Back</a>');
});

app.post('/', middleware.logRequest, (req, res) => {
  res.send('新增一筆  Todo');
});

app.listen(port, middleware.logRequest, () => {
  console.log(`App running on port ${port}`);
});
