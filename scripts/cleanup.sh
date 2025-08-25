#!/bin/bash

# Portfolio App Cleanup Script
echo "🧹 Portfolio App Cleanup"
echo "========================"

read -p "Are you sure you want to cleanup all resources? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled."
    exit 1
fi

# Remove Kubernetes deployments
echo "🗑️  Removing Kubernetes resources..."

# Development environment
echo "Cleaning development environment..."
kubectl delete all --all -n react-cicd-dev 2>/dev/null || echo "No dev resources to delete"
kubectl delete configmaps --all -n react-cicd-dev 2>/dev/null || echo "No dev configmaps to delete"
kubectl delete secrets --all -n react-cicd-dev 2>/dev/null || echo "No dev secrets to delete"

# Production environment  
echo "Cleaning production environment..."
kubectl delete all --all -n react-cicd-prod 2>/dev/null || echo "No prod resources to delete"
kubectl delete configmaps --all -n react-cicd-prod 2>/dev/null || echo "No prod configmaps to delete"
kubectl delete secrets --all -n react-cicd-prod 2>/dev/null || echo "No prod secrets to delete"

# Remove namespaces (this will cleanup everything inside)
echo "Removing namespaces..."
kubectl delete namespace react-cicd-dev 2>/dev/null || echo "Dev namespace not found"
kubectl delete namespace react-cicd-prod 2>/dev/null || echo "Prod namespace not found"

# Terraform cleanup
echo -e "\n🏗️  Terraform cleanup..."
cd terraform
if [ -f "terraform.tfstate" ]; then
    terraform destroy -auto-approve
    echo "✅ Terraform resources destroyed"
else
    echo "No Terraform state found"
fi

# Docker cleanup
echo -e "\n🐳 Docker cleanup..."
echo "Removing unused Docker images..."
docker system prune -f
docker image prune -f

# Remove local Docker images of the portfolio app
docker rmi $(docker images --filter=reference="*/react-cicd-app:*" -q) 2>/dev/null || echo "No portfolio app images to remove"

# Clean node_modules and build files
echo -e "\n📦 Cleaning build artifacts..."
cd ..
rm -rf node_modules
rm -rf dist
rm -rf build
rm -rf coverage

# Git cleanup (optional)
read -p "Do you want to clean git branches (keeps main)? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌿 Git cleanup..."
    git checkout main 2>/dev/null || echo "Already on main or main doesn't exist"
    git branch | grep -v "main" | xargs git branch -D 2>/dev/null || echo "No branches to delete"
fi

echo -e "\n✅ Cleanup completed!"
echo -e "\n🔄 To restart the project:"
echo "   1. npm install"
echo "   2. cd terraform && terraform init && terraform apply"
echo "   3. Push changes to GitHub to trigger CI/CD"

echo -e "\n⚠️  Note: Your GitHub repository and DockerHub images are unchanged."
echo "   - Manually delete DockerHub repository if needed"
echo "   - GitHub repository and Actions history remain intact"