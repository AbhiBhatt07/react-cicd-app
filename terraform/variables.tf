# Variables for terraform configuration

variable "dockerhub_username" {
  description = "DockerHub username"
  type        = string
}

variable "dockerhub_password" {
  description = "DockerHub password or access tocken"
  type        = string
  sensitive   = true
}

variable "dockerhub_email" {
  description = "DockerHub email"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "react-cicd"
}

variable "app_version" {
  description = "Application version"
  type        = string
  default     = "1.0.0"
}

variable "environment" {
  description = "Environment (dev/prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be either 'dev' or 'prod' "
  }
}
