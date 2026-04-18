const https = require('https');

const urls = [
"https://postimg.cc/Yv4zLzv6",
"https://postimg.cc/21q7L71d",
"https://postimg.cc/K1KD3D1n",
"https://postimg.cc/4YKQHQYV",
"https://postimg.cc/YvJf6LFN",
"https://postimg.cc/TKZqV5bJ",
"https://postimg.cc/pmgYf5jY",
"https://postimg.cc/5XHSQSX8",
"https://postimg.cc/zy9SCHhk",
"https://postimg.cc/WdQ6GqZg",
"https://postimg.cc/xXWyvNmv",
"https://postimg.cc/DStdr4Gs",
"https://postimg.cc/ts1NnNsD",
"https://postimg.cc/VJSW0WJF",
"https://postimg.cc/K1drP3Tn",
"https://postimg.cc/FYfVkVYp",
"https://postimg.cc/fV3fSfVf",
"https://postimg.cc/HrJ989r2"
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
