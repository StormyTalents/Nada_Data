import { useCallback, useEffect, useRef, useState } from 'react';

// broken image styling
// NOTE: taken from https://stackoverflow.com/a/37192970/7013346
const imageStyle: string = `
img {
  position: relative;
}

img:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  font-size: 15px;
  letter-spacing: 1px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.54);
  animation: animateLoading 1s infinite;
}

@keyframes animateLoading {
  0% { content: '...'; }
  50% { content: '.'; }
  100% { content: '..'; }
}
`;

export function useImageReloader() {
  type Timer = ReturnType<typeof setTimeout>;
  const maxAttempts: number = 10;
  const timersRef = useRef<Timer[]>([]);
  const unmountedRef = useRef<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const reloadFailedImages = useCallback((iframe?: HTMLIFrameElement) => {
    const doc: Document | null | undefined = iframe?.contentDocument;
    if (!doc) {
      return;
    }
    setError(undefined);
    // console.log('InlineHtml: reloadFailedImages');
    const handleImageError = (imageEl: HTMLImageElement) => {
      // if successful, skip
      // NOTE: taken from https://stackoverflow.com/a/1977898/7013346
      if (imageEl.complete && imageEl.naturalWidth !== 0) {
        return;
      }

      let tryCount: number = 0;
      let didLoad: boolean = false;
      imageEl.onload = () => {
        didLoad = true;
      };
      imageEl.onerror = () => {
        // reload image after a second
        const reload = setTimeout(() => {
          // after maxAttempts, stop trying and show error if failed
          if (tryCount >= maxAttempts) {
            if (!didLoad && !unmountedRef.current) {
              setError('Unable to load image.');
            }
            return;
          }
          tryCount++;
          // set image src to reload image
          // NOTE: taken from https://stackoverflow.com/a/55499609/7013346
          const { src = '' } = imageEl;
          imageEl.src = src;
          console.log(
            'InlineHtml ImageReloader. Reload attempt:',
            tryCount,
            'Image:',
            src
          );
        }, 1000);
        timersRef.current.push(reload);
      };
    };
    Array.from(doc.querySelectorAll('img')).forEach(handleImageError);
  }, []);

  useEffect(() => {
    return () => {
      // clear all timers
      unmountedRef.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const timers: Timer[] = timersRef.current;
      timers.splice(0, timers.length).forEach(clearTimeout);
    };
  }, []);

  return { error, reloadFailedImages };
}
