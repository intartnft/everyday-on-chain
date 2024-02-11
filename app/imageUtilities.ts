import { encode } from "node-base64-image";

export async function parseImageDataURI(uri: string): Promise<string> {
  if (uri.includes('base64')) {
    return uri;
  }

  if (uri.includes('svg') && uri.includes('utf8')) {
    const imageData = uri.split('utf8,')[1];
    const base64 = Buffer.from(imageData).toString('base64');
    return 'data:image/svg+xml;base64,' + base64;
  }

//   else if (uri.includes('http')) {
//     const base64 = await encode(uri, {string: true})
//     return 'data:image/image;base64,' + base64
//   }

  return uri;
}

export function parseDataURI(uri: string): string {
  if (uri.includes('base64,')) {
    const data = uri.split('base64,')[1];
    const decoded = Buffer.from(data, 'base64').toString();
    return decoded;
  } else if (uri.includes('json,')) {
    return uri.split('json,')[1];
  }
  return uri;
}

export function wrapImageSource(source: string, width: number, height: number) {
  const maxSize = Math.max(width, height);
  let offsetX = 0;
  let offsetY = 0;
  const lines = [
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" viewBox="0 0 ' +
      width +
      ' ' +
      height +
      '" x="0" y="0" width="' +
      maxSize +
      '" height="' +
      maxSize +
      '">',
    '<foreignObject x="' +
      offsetX +
      '" y="' +
      offsetY +
      '" width="' +
      width +
      '" height="' +
      height +
      '">',
    '<xhtml:img style="width:100%;height:100%" src="' + source + '"/>',
    '</foreignObject></svg>',
  ];
  return lines.join('');
}

export function wrapImageSourceAndEncode(source: string, width: number, height: number) {
  const wrapped = wrapImageSource(source, width, height);
  const base64 = Buffer.from(wrapped).toString('base64');
  return 'data:image/svg+xml;base64,' + base64;
}
