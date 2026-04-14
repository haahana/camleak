const https = require('https');

const urls = [
"https://postimg.cc/WtNN6wfp",
"https://postimg.cc/CdhhHs68",
"https://postimg.cc/hhDDb13P",
"https://postimg.cc/V5ffBWHf",
"https://postimg.cc/grzzqHBd",
"https://postimg.cc/PNXXzQFz",
"https://postimg.cc/7bHHMnQV",
"https://postimg.cc/QV88kJnJ",
"https://postimg.cc/4nffbQFJ",
"https://postimg.cc/RqSSQLbX",
"https://postimg.cc/Z0bbFxD6",
"https://postimg.cc/8sppBmnR",
"https://postimg.cc/RqSSQLbK",
"https://postimg.cc/Z0bbFxD9",
"https://postimg.cc/grzzqHBX",
"https://postimg.cc/rzVVCNYS",
"https://postimg.cc/xqffy3Fz",
"https://postimg.cc/0rkkd0Hr",
"https://postimg.cc/dDssmjSh"
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
