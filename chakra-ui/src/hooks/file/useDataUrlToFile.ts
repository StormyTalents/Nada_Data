import { useCallback } from 'react';

const BASE64_MARKER: string = ';base64,';

// NOTE: inspired by https://gist.github.com/kylefox/c09a7b738aacf088c2ec2b359ddcc5ea
export function useDataUrlToFile() {
  const convertDataUrlToFile = useCallback((dataUrl: string) => {
    const [mimePart, contentPart] = dataUrl.split(BASE64_MARKER);
    if (!mimePart || !contentPart) {
      return; // invalid data url
    }
    // Format of a base64-encoded URL:
    // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAEOCAIAAAAPH1dAAAAK
    const mime = mimePart.split(':')[1];
    const filename = `image-${new Date().getTime()}.${mime.split('/')[1]}`;
    const bytes = atob(contentPart);
    const writer = new Uint8Array(new ArrayBuffer(bytes.length));
    for (let i = 0; i < bytes.length; i++) {
      writer[i] = bytes.charCodeAt(i);
    }
    return new File([writer.buffer], filename, { type: mime });
  }, []);

  return convertDataUrlToFile;
}
