import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
// @ts-ignore
import mime from 'mime';

import * as fs from 'fs';
import * as path from 'path';

// Create an S3 bucket
// aws.s3.Bucket("s3-website-bucket");

export function addFolderContents(bucket:aws.s3.Bucket, ownershipControls:aws.s3.BucketOwnershipControls, publicAccessBlock:aws.s3.BucketPublicAccessBlock, siteDir:string, prefix?:string) {
  for (let item of fs.readdirSync(siteDir)) {
    let filePath = path.join(siteDir, item);
    let isDir = fs.lstatSync(filePath).isDirectory();

    // This handles adding subfolders and their content
    if (isDir) {
      const newPrefix = prefix ? path.join(prefix, item) : item;
      addFolderContents(bucket, ownershipControls, publicAccessBlock, filePath, newPrefix);
      continue;
    }

    let itemPath = prefix ? path.join(prefix, item) : item;
    itemPath = itemPath.replace(/\\/g,'/');             // convert Windows paths to something S3 will recognize

    let object = new aws.s3.BucketObject(itemPath, {
      bucket: bucket,
      source: new pulumi.asset.FileAsset(filePath),     // use FileAsset to point to a file
      contentType: mime.getType(filePath) || undefined, // set the MIME type of the file
      acl: "public-read",
    }, {dependsOn: [publicAccessBlock, ownershipControls]});
  }
}
