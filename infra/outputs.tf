# Outputs will be added after resources are created
output "cloudfront_url" {
  value = aws_cloudfront_distribution.site.domain_name
}

