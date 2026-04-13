const https = require('https');

const urls = [
"https://postimg.cc/PCHFYCPn",
"https://postimg.cc/zbQcgpRj",
"https://postimg.cc/tsbmWs7B",
"https://postimg.cc/N2rP7T6v",
"https://postimg.cc/yWJ5HqwF",
"https://postimg.cc/GBqNcbLK",
"https://postimg.cc/yJv5V71f",
"https://postimg.cc/yJv5V719",
"https://postimg.cc/GTsSJYkZ",
"https://postimg.cc/94JSWcmZ",
"https://postimg.cc/cKs2yvSw",
"https://postimg.cc/yJv5V71F",
"https://postimg.cc/zL0MJqzT",
"https://postimg.cc/Wd7Ynsk2",
"https://postimg.cc/zL0MJqzk",
"https://postimg.cc/q6CZXn8D",
"https://postimg.cc/LqN7Hm9r",
"https://postimg.cc/3yn6K389",
"https://postimg.cc/pmBcZPn7",
"https://postimg.cc/CR4rNwqg",
"https://postimg.cc/VJwHnJdQ",
"https://postimg.cc/rD9ZJqrK",
"https://postimg.cc/jWZ9sRxQ",
"https://postimg.cc/bZRVTqtX",
"https://postimg.cc/ZWmDpW0c",
"https://postimg.cc/PCMV4d8B",
"https://postimg.cc/TKxHgKh7"
];

async function fetchDirectUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
          resolve(match[1]);
        } else {
          resolve(`https://i.postimg.cc/${url.split('/').pop()}/image.jpg`);
        }
      });
    }).on('error', () => {
      resolve(`https://i.postimg.cc/${url.split('/').pop()}/image.jpg`);
    });
  });
}

async function main() {
  for (const url of urls) {
    const directUrl = await fetchDirectUrl(url);
    console.log(`  '${directUrl}',`);
  }
}

main();
