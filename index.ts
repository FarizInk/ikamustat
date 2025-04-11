import axios from "axios";

const ignoreHeaders = [":authority", ":method", ":path", ":scheme"]

async function parseHeadersFromFile(filePath: string): Promise<Record<string, string>> {
  const rawHeaders = await Bun.file(filePath).text();
  const headers: Record<string, string> = {};

  const lines = rawHeaders.split("\n")

  let tmpKey: string | null = null
  lines.forEach(line => {
    if (tmpKey === null && line.endsWith(":")) {
      tmpKey = line.slice(0, -1)
    } else if (tmpKey !== null) {
      headers[tmpKey] = line;
      tmpKey = null
    }
  });

  return headers;
}

async function sendMessage(text: string) {
  const rawHeaders = await parseHeadersFromFile("headers.txt")
  const headers = Object.keys(rawHeaders)
    .filter(key => !ignoreHeaders.includes(key))
    .reduce<Record<string, any>>((acc, key) => {
      acc[key] = rawHeaders[key];
      return acc;
    }, {});

  const url = `${rawHeaders['origin']}${rawHeaders[':path']}`

  const { data } = await axios.post(url, {
    "mobile_network_type": "unknown",
    "content": text,
    "nonce": String(Math.floor(Date.now() / 1000)),
    "tts": false,
    "flags": 0
  }, {
    headers
  })
}

while (true) {
  await sendMessage("t!fishy");
  await Bun.sleep(30 * 1000);
}