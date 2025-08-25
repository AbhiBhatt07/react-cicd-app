# Terraform configuration for kubernetes resources
terraform {
  required_version = ">= 1.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# configure kubernetes provider (Local Docker desktop cluster)
provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "docker-desktop"
}

# Configure Docker provider
provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Create namespace for different environments
resource "kubernetes_namespace" "react_cicd_dev" {
  metadata {
    name = "react-cicd-dev"
    labels = {
      environment = "development"
      app         = "cicd-app"
    }
  }
}

resource "kubernetes_namespace" "react_cicd_prod" {
  metadata {
    name = "react-cicd-prod"
    labels = {
      environment = "production"
      app         = "cicd-app"
    }
  }
}

# create configMap for application configuration
resource "kubernetes_config_map" "cicd_app_config_dev" {
  metadata {
    name      = "react-cicd-config"
    namespace = kubernetes_namespace.react_cicd_dev.metadata[0].name
  }

  data = {
    "app.env"    = <<-EOT
        NODE_ENV=development
        REACT_APP_ENV=development
        REACT_APP_VERSION=dev
    EOT
    "nginx.conf" = file("${path.module}/nginx.conf")
  }
}

resource "kubernetes_config_map" "cicd_app_config_prod" {
  metadata {
    name      = "react-cicd-config"
    namespace = kubernetes_namespace.react_cicd_prod.metadata[0].name
  }

  data = {
    "app.env" = <<-EOT
      NODE_ENV=production
      REACT_APP_ENV=production
      REACT_APP_VERSION=1.0.0
    EOT

    "nginx.conf" = file("${path.module}/nginx.conf")
  }
}

# secret for Docker registry (if using private registry)
resource "kubernetes_secret" "docker_registry" {
  metadata {
    name      = "docker-registry-secret"
    namespace = kubernetes_namespace.react_cicd_dev.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "https://index.docker.io/v1/" = {
          username = var.dockerhub_username
          password = var.dockerhub_password
          email    = var.dockerhub_email
          auth     = base64encode("${var.dockerhub_username}:${var.dockerhub_password}")
        }
      }
    })
  }
}


# Copy secret to production namespace
resource "kubernetes_secret" "docker_registry_prod" {
  metadata {
    name      = "docker-registry-secret"
    namespace = kubernetes_namespace.react_cicd_prod.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  data = kubernetes_secret.docker_registry.data
}