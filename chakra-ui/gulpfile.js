const gulp = require('gulp');
const gutil = require('gulp-util');
const knox = require('knox');
const S3Lister = require('s3-lister');
const s3 = require('gulp-s3');
const AWS = require('aws-sdk');
const environment = process.env.NODE_ENV || 'development';
const config = require('./config/deploy.' + environment + '.json');

AWS.config = new AWS.Config();
AWS.config.credentials = {};
AWS.config.credentials.accessKeyId = config.aws.accessKeyId;
AWS.config.credentials.secretAccessKey = config.aws.secretAccessKey;
AWS.config.region = config.aws.region;

const awsConfig = {
  key: config.aws.accessKeyId,
  secret: config.aws.secretAccessKey,
  bucket: config.aws.bucket,
  region: config.aws.region
};

const uploadPath = config.aws.buildPath;
const distPath = './build/**';
let client = knox.createClient(awsConfig);

gulp.task('deploy:clean', async () => {
  return cleanDeployFolder();
});

gulp.task('deploy:push', async () => {
  return new Promise((resolve, reject) => {
    const options = { uploadPath };
    return gulp
      .src(distPath)
      .pipe(s3(awsConfig, options))
      .on('error', reject)
      .on('end', resolve);
  });
});

gulp.task('deploy:clearcache', async () => {
  return invalidateCloudFrontCache();
});

gulp.task(
  'deploy',
  gulp.series('deploy:clean', 'deploy:push', 'deploy:clearcache')
);

async function cleanDeployFolder() {
  return new Promise((resolve, reject) => {
    let files = [];
    let lister = new S3Lister(client, { prefix: config.aws.buildPath });
    lister
      .on('data', function (data) {
        files.push(data.Key);
      })
      .on('error', function (err) {
        gutil.log(gutil.colors.red('[FAILED]', err));
        reject(err);
      })
      .on('end', function () {
        gutil.log(
          gutil.colors.green('[SUCCESS]') +
            ' Removed: ' +
            gutil.colors.grey(uploadPath)
        );
        console.log('files', files);
        client.deleteMultiple(files, (error, response) => {
          if (error) {
            console.log('delete error', error);
            reject(error);
          }
          resolve();
        });
      });
  });
}

async function invalidateCloudFrontCache() {
  return new Promise((resolve, reject) => {
    const cloudfront = new AWS.CloudFront({ apiVersion: '2018-06-18' });
    const params = {
      DistributionId: config.aws.cloudFrontDistribution,
      InvalidationBatch: {
        CallerReference: Date.now() + '', // unique value per request
        Paths: {
          Quantity: 1,
          Items: ['/*']
        }
      }
    };

    cloudfront.createInvalidation(params, function (error, data) {
      if (error) {
        // an error occurred
        console.log(error, error.stack);
        reject(error);
      }
      // console.log('data', data);
      gutil.log(
        gutil.colors.green('[SUCCESS]') +
          ' Invalidated CloudFront Cache: ' +
          gutil.colors.grey(data.Location)
      ); // successful response
      resolve();
    });
  });
}
