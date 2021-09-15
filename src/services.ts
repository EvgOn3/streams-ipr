import * as http from 'http';
import * as fs from 'fs';
import { Transform } from 'stream';
import spellCheck from './spellChek';

export const getStatic = (res: http.OutgoingMessage) => {
  try {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  } catch (e) {
    console.log(e);
  }
};

export const createSpellCheckTransformStream = (
  fileEncoding: 'utf8'
): Transform => {
  try {
    const spellCheckStream = new Transform({
      transform(chunk, encoding, callback) {
        this.push(spellCheck(chunk.toString(), fileEncoding));
        callback();
      },
    });

    return spellCheckStream;
  } catch (e) {
    console.log(e);
  }
};
