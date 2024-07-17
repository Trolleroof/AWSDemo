import * as AWS from 'aws-sdk';
import { promises as fs } from 'fs';

AWS.config.update({ 
  region: 'us-west-2',
  accessKeyId: 'AKIATCKATWAING5PND53',
  secretAccessKey: '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'
});

const textract = new AWS.Textract();


const extractFromDoc = async (filePath : string) => {
  try {
    // read the image
    const buf = await fs.readFile(filePath);
    // send to aws
    const res = await textract.detectDocumentText({ Document: { Bytes: buf } }).promise();
    // parse the result
    console.log(res.Blocks?.filter(i => i.BlockType === 'LINE').map(i => i.Text).join('\n'));
  } catch (err) {
    console.error(err);
  }
};

extractFromDoc("../m2/s1.pdf");