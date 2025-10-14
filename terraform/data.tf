data "aws_iam_policy_document" "s3_policy_document" {
  statement {
    sid = "S3GetObjectForCloudFront"
    actions = [
      "s3:GetObject"
      , "s3:ListBucket"
    ]
    resources = [
        aws_s3_bucket.InfernoBankBucket.arn,
        "${aws_s3_bucket.InfernoBankBucket.arn}/*"
    ]
    principals {
      type = "AWS"
      identifiers = [ aws_cloudfront_origin_access_identity.InfernoBankOAI.iam_arn ]
    }
  }
}
