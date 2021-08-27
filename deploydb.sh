#! /bin/bash
export AWS_REGION='ap-southeast-2'
export RDS_DB="fcdb"
export AURORA_CLUSTER_ARN="$(jq -r '.RDSClusterArn' ".serverless/stackOutput.json")"
export AURORA_CLUSTER_SECRET_ARN="$(jq -r '.RDSInstanceSecret' ".serverless/stackOutput.json")"
echo $AURORA_CLUSTER_ARN
echo $AURORA_CLUSTER_SECRET_ARN
db-migrate up

.serverless/stackOutput.yml