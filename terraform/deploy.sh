#!/bin/bash
set -e

echo "Building Angular application..."
cd ../app
ng build --configuration=production
cd ../terraform

echo "Getting infrastructure details..."
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)

echo "Deploying to S3 bucket: $BUCKET_NAME"
echo "CloudFront distribution id: $DISTRIBUTION_ID"

echo "Syncing files to S3..."
aws s3 sync ../app/dist/myFrontendPage/browser/ s3://$BUCKET_NAME --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete. Your application should be live shortly."
echo "Website URL: http://$(terraform output -raw cloudfront_domain_name)"