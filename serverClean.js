const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const addFileToResponse = (filename, contentType, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log(err.message);
      res.writeHead(500, "Server error");
      res.end();
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.write(data);
    res.end();
  });
};

const send404 = (res) => figlet('404!!', (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    res.writeHead(404, "Error 404");
    res.end();
  }
  res.write(data);
  res.end();
});

const handleApiRequest = (req, res) => {
  const params = querystring.parse(url.parse(req.url).query);
  if ('student' in params) {
    if (params['student'] == 'leon') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        name: "leon",
        status: "Boss Man",
        currentOccupation: "Baller"
      }
      res.end(JSON.stringify(objToJson));
    }
    else if (params['student'] != 'leon') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        name: "unknown",
        status: "unknown",
        currentOccupation: "unknown"
      }
      res.end(JSON.stringify(objToJson));
    }
  }
}

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  console.log(page);
  switch (page) {
    case '/':
      addFileToResponse('index.html', 'text/html', res);
      break;
    case '/otherpage':
      addFileToResponse('otherpage.html', 'text/html', res);
      break;
    case '/otherotherpage':
      addFileToResponse('otherotherpage.html', 'text/html', res);
      break;
    case '/css/style.css':
      addFileToResponse('css/style.css', 'text/css', res);
      break;
    case '/js/main.js':
      addFileToResponse('js/main.js', 'text/javascript', res);
      break;
    case '/api':
      handleApiRequest(req, res);
      break;
    default:
      send404(res);
      break;
  }
});

server.listen(8000);
