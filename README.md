# pulumi-samples

This repository contains [pulumi](https://www.pulumi.com/) learning projects.

All projects are communicating with AWS.

## Provide AWS access

Although AWS recommends to not use long living access keys, the most easy starting point is to create a user group and a user in [IAM](https://us-east-1.console.aws.amazon.com/iam/home#/home) service.
Assign necessary permissions to the group and create an access key for the user.

Copy the access key ID and the secret and expose it as environment variable in your local system.

E.g.

```shell
## For pulumi
export AWS_ACCESS_KEY_ID="<id>" && export AWS_SECRET_ACCESS_KEY="<secret>"

```

