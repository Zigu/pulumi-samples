import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {addFolderContents} from './utils';

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("pulumi-website", {
    website: {
        indexDocument: "index.html",
    },
});

const ownershipControls = new aws.s3.BucketOwnershipControls("ownership-controls", {
    bucket: bucket.id,
    rule: {
        objectOwnership: "ObjectWriter"
    }
});

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("public-access-block", {
    bucket: bucket.id,
    blockPublicAcls: false,
});

addFolderContents(bucket, ownershipControls, publicAccessBlock, "www"); // base directory for content files

const bucketMetric = new aws.s3.BucketMetric("pulumi-website-metric", {
    bucket: bucket.id,
});

const bucketNotification = new aws.s3.BucketNotification("pulumi-website-notification", {
    bucket: bucket.id,
});

export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
