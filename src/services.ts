import * as http from 'http';
import * as fs from 'fs';
import { Transform } from 'stream';
import spellCheck from './spellChek';

export const getStatic = (res: http.ServerResponse) => {
  try {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end('Пятисотая')
  }
};

export const createSpellCheckTransformStream = (
  fileEncoding: 'utf8'
): Transform => {
    const spellCheckStream = new Transform({
      transform(chunk, encoding, callback) {
        this.push(spellCheck(chunk.toString(), fileEncoding));
        callback();
      },
    });

    return spellCheckStream;
};
