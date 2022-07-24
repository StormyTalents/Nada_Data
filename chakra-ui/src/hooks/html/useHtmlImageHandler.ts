import { api, useUploadFiles } from '@nobrainerlabs/react-material-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDataUrlToFile } from '../file/useDataUrlToFile';

export function useHtmlImageHandler() {
  const htmlRef = useRef('');
  const dataUrlFilesRef = useRef<{ url: string; file: File }[]>([]);
  const [processedHtml, setProcessedHtml] = useState<string>();
  const [error, setError] = useState<Error>();
  const convertDataUrlToFile = useDataUrlToFile();
  const {
    uploadFiles,
    isUploading,
    error: uploadError,
    upload,
  } = useUploadFiles('html-content', 'files/presign');
  // const unauthorizeImageTags = useCallback((html: string) => {
  //   const regex = new RegExp(
  //     '<img .*?src=".*?/forms/file(\\&token=.*?)".*/>',
  //     'gi'
  //   );
  //   let result: RegExpExecArray | null;
  //   while ((result = regex.exec(html))) {
  //     console.log('result', result);
  //     let imageTag = result[0];
  //     const tokenQuery = result[1];
  //     const originalImageTagLength = imageTag.length;
  //     imageTag = imageTag.replace(tokenQuery, '');
  //     html =
  //       html.substring(0, result.index) +
  //       imageTag +
  //       html.substring(result.index + originalImageTagLength);
  //   }
  //   console.log('unauthorizeImageTag', html);
  //   return html;
  // }, []);
  // const authorizeImageTags = useCallback(
  //   (html: string) => {
  //     const regex = new RegExp(
  //       '<img .*?src="(.*?/forms/file\\?key=.*?)".*/>',
  //       'gi'
  //     );
  //     // make sure to unauthorize the html first to clean dirty content
  //     html = unauthorizeImageTags(html);
  //     let result: RegExpExecArray | null;
  //     while ((result = regex.exec(html))) {
  //       console.log('result', result);
  //       let imageTag = result[0];
  //       const originalSrc = `src="${result[1]}"`;
  //       const originalImageTagLength = imageTag.length;
  //       imageTag = imageTag.replace(
  //         originalSrc,
  //         `src="${result[1]}&token=${api.getAccessToken()}"`
  //       );
  //       html =
  //         html.substring(0, result.index) +
  //         imageTag +
  //         html.substring(result.index + originalImageTagLength);
  //     }
  //     console.log('authorizeImageTags', html);
  //     return html;
  //   },
  //   [unauthorizeImageTags]
  // );

  useEffect(() => {
    if (uploadFiles) {
      let html = htmlRef.current;
      // swap data urls for file urls
      for (const uploadFile of uploadFiles) {
        if (!uploadFile.isCompleted) {
          // wait till all files have been uploaded
          return;
        }
        if (uploadFile.isError) {
          setError(new Error(`Failed to upload ${uploadFile.file.name}`));
          return;
        }

        if (uploadFile.presignedResult?.destinationUrl) {
          const dataUrlFile = dataUrlFilesRef.current.find(
            (item) => item.file.name === uploadFile.file.name
          );
          if (dataUrlFile) {
            html = html.replace(
              dataUrlFile.url,
              uploadFile.presignedResult.destinationUrl
            );
          } else {
            console.error('Could not find dataUrl <> File mapping', uploadFile);
          }
        } else {
          setError(new Error(`Failed to upload ${uploadFile.file.name}`));
        }
      }
      setProcessedHtml(html);
      // clean up references after upload
      // htmlRef.current = '';
      // dataUrlFilesRef.current = [];
    }
  }, [uploadFiles]);

  // clean up references on error
  useEffect(() => {
    if (error || uploadError) {
      htmlRef.current = '';
      dataUrlFilesRef.current = [];
    }
  }, [error, uploadError]);

  /**
   * Checks for Data URLs, upload to S3, and swap the image tags
   * @param html
   */
  const processHtmlImageTags = (html: string) => {
    htmlRef.current = html;
    const urls = findDataUrls(html);
    const files: File[] = [];
    for (const url of urls) {
      const file = convertDataUrlToFile(url);
      if (file) {
        dataUrlFilesRef.current.push({ url, file });
        files.push(file);
      } else {
        setError(new Error('Found an invalid data url'));
        return;
      }
    }

    if (files.length > 0) {
      upload(files);
    } else {
      // no files so complete processing html
      setProcessedHtml(html);
    }
  };
  return {
    uploadFiles,
    processedHtml,
    isUploading,
    uploadError: uploadError || error,
    // don't need to authorize since we use cookies to validate now
    // authorizeImageTags,
    // unauthorizeImageTags,
    processHtmlImageTags,
  };
}

function findDataUrls(html: string) {
  return html
    .split('<img')
    .map((imgStr) => imgStr.slice(0, imgStr.indexOf('>')))
    .join()
    .trim()
    .split('src="')
    .map((dirtyUrl: string) => {
      dirtyUrl = dirtyUrl.slice(0, dirtyUrl.indexOf('"')) || '';
      return dirtyUrl.trim();
    })
    .slice(1)
    .filter((url) => url.indexOf('data:image') === 0);
}
