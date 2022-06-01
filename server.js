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

const answersFrom8Ball = [
"It is certain.",
"It is decidedly so.",
"Without a doubt.",
"Yes definitely.",
"You may rely on it.",
"As I see it, yes.",
"Most likely.",
"Outlook good.",
"Yes.",
"Signs point to yes", 
"Reply hazy, try again.",
"Ask again later.",
"Better not tell you now.",
"Cannot predict now.",
"Concentrate and ask again",
"Don't count on it.",
"My reply is no.",
"My sources say no.",
"Outlook not so good.",
"Very doubtful."
];

const handleApiRequest = (req, res) => {
  const params = querystring.parse(url.parse(req.url).query);
  const randomValue = Math.floor(Math.random() * 20);
  let message = "Please ask a question!"
  if ('question' in params) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (params['question'] != '' && params['question'].charAt(params['question'].length - 1) == '?') {
      message = answersFrom8Ball[randomValue];
     
    }
    const objToJson = {
        question : params['question'],
        answer: message
      }
    
    res.end(JSON.stringify(objToJson));
  }
}

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  console.log(page);
  switch (page) {
    case '/':
      addFileToResponse('index.html', 'text/html', res);
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

server.listen(process.env.PORT || 8000);
