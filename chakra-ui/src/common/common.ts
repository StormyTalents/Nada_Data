export function convertS3ToPublic(url: string) {
  const x = url.split('=');
  const newUrl =
    'https://havenproject-staging.s3.us-west-2.amazonaws.com/' +
    x[1].replace('%2F', '/');
  return newUrl;
}
