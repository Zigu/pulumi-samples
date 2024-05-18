# Pulumi S3 website sample

This sample uploads the files of the `www`-folder to an s3 bucket and exposes it by a default bucket URL.

## Required AWS permissions

Pulumi uses the access key of a specific user. To get the script running, assign the following permission to the user group (see README.md in repository root).

- AmazonS3FullAccess


## Get started

Execute the following base commands. 

```shell
yarn install 

pulumi preview

pulumi up
```

The preview is optional, but helps to identify initial problems.
