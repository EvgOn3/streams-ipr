import * as http from 'http';
import { pipeline } from 'stream'
import { createSpellCheckTransformStream, getStatic } from './services';
const port = 3030

const server = http
  .createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      getStatic(res);
    }
    if (req.method === 'POST' && req.url === '/api/file/send') {
      
      const encoding = 'utf8';
      res.setHeader('Content-Disposition', 'form-data; name="myFile"; filename="foo.txt"');
      res.setHeader('Content-Type', 'text/plain; charset=utf8');
       
      pipeline(req, createSpellCheckTransformStream(encoding), res, (err)=>{
        if (err) {
          console.error('Pipeline failed', err);
          res.statusCode = 500;
          res.end('Пятисотая')
        } else {
          console.log('Pipeline succeeded');
        }
      });
    }
  })
  .listen(port, () => console.log(`Сервер запущен. Порт ${port}`));
