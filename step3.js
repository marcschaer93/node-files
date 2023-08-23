const fs = require('fs');
const process = require('process');
const axios = require('axios');


/** handle output: write to file if out, else print */

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.error(`Could not write the file ${out} ${text}`);
                process.exit(1)
            }
        });
    } else {
        console.log(text);
    }
}


/** read file at path and print it out. */

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}


/** read content of URL and print it out */

async function webCat(url) {
    try {
        let response = await axios.get(url)
        console.log(response.data, out);
        
    } catch (error) {
        console.error(`Error fetching ${url} ${error}`);
        process.exit(1)
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.startsWith('http')) {
  webCat(path, out);
} else {
  cat(path, out);
}




