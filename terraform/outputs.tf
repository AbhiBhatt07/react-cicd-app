# Terraform outputs to display useful information

output "dev_namespace" {
  description = "Development namespace name"
  value       = kubernetes_namespace.react_cicd_dev.metadata[0].name
}

output "prod_namespace" {
  description = "Production namespace name"
  value       = kubernetes_namespace.react_cicd_prod.metadata[0].name
}

output "kubectl_commands" {
  description = "Useful kubectl commands"
  value = {
    "View dev pods"      = "kubectl get pods -n ${kubernetes_namespace.react_cicd_dev.metadata[0].name}"
    "View prod pods"     = "kubectl get pods -n ${kubernetes_namespace.react_cicd_prod.metadata[0].name}"
    "View dev services"  = "kubectl get svc -n ${kubernetes_namespace.react_cicd_dev.metadata[0].name}"
    "View prod services" = "kubectl get svc -n ${kubernetes_namespace.react_cicd_prod.metadata[0].name}"
    "Port forward dev"   = "kubectl port-forward -n ${kubernetes_namespace.react_cicd_dev.metadata[0].name} service/dev-react-cicd-dev-service 8080:80"
    "Port forward prod"  = "kubectl port-forward -n ${kubernetes_namespace.react_cicd_prod.metadata[0].name} service/prod-react-cicd-prod-service 8081:80"
  }
}
