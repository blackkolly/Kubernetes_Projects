<<<<<<< HEAD
terraform {
  backend "s3" {
    bucket         = var.tf_state_bucket
    key            = "flask-ecommerce/terraform.tfstate"
    region         = var.aws_region
    dynamodb_table = var.tf_state_lock_table
    encrypt        = true
  }
}
=======
terraform {
  backend "s3" {
    bucket         = var.tf_state_bucket
    key            = "flask-ecommerce/terraform.tfstate"
    region         = var.aws_region
    dynamodb_table = var.tf_state_lock_table
    encrypt        = true
  }
}
>>>>>>> efa4188 (Add Terraform-Application and resolve merge conflicts)
