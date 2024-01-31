// Create web server
// 1. Create a web server
// 2. Read the file comments.json
// 3. Convert the file contents to JSON
// 4. Convert the JSON to HTML
// 5. Send the HTML to the client
// 6. Listen for requests
// 7. Send an error message if something goes wrong

// 1. Create a web server
const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response) {
  // 2. Read the file comments.json
  fs.readFile('comments.json', function(error, data) {
    if (error) {
      // 7. Send an error message if something goes wrong
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('An error occurred');
      return;
    }

    // 3. Convert the file contents to JSON
    const comments = JSON.parse(data);

    // 4. Convert the JSON to HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Comments</title>
        </head>
        <body>
          <h1>Comments</h1>
          <ul>
            ${comments.map(function(comment) {
              return `
                <li>
                  <strong>${comment.name}</strong>
                  <p>${comment.comment}</p>
                </li>
              `;
            }).join('')}
          </ul>
        </body>
      </html>
    `;

    // 5. Send the HTML to the client
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  });
});

// 6. Listen for requests
server.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});