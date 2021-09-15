import * as http from 'http';
import { createSpellCheckTransformStream, getStatic } from './services';
const port = 3030

const server = http
  .createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      getStatic(res);
    }
    if (req.method === 'POST' && req.url === '/api/file/send') {
      const encoding = 'utf8';
    //  res.setHeader('Content-Disposition', 'form-data; name="myFile"; filename="foo.txt"');
      res.setHeader('Content-Type', 'text/plain; charset=utf8');
       
      req.pipe(createSpellCheckTransformStream(encoding)).pipe(res);
    }
  })
  .listen(port, () => console.log(`Сервер запущен. Порт ${port}`));
