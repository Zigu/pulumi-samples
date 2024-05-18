# Pulumi ECS backstage sample

This sample instantiates a backstage docker instance (currently just nginx - backstage will follow).

## Required AWS permissions

Pulumi uses the access key of a specific user. To get the script running, assign the following permission to the user group (see README.md in repository root).

- AWSVpcFullAccess
- AWSEcsFullAccess
- ElasticLoadBalancingFullAccess
- IAMFullAccess
- CloudWatchLogsFullAccess

## Occurred problems

During initial setup pulumi could not create the service because it could not find the recently created cluster.

To solve it, remove all resources and recreate them by calling:

```shell
pulumi destroy

pulumi up
```
