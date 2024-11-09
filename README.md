# Freelance Marketplace

This is a **freelance marketplace** where sellers can create gigs and buyers can purchase gigs or custom gigs. The project is built using a microservice-based architecture and leverages multiple technologies to ensure scalability, performance, and ease of management.

## Project Overview

This project allows:
- **Sellers** to create and manage gigs.
- **Buyers** to search, filter, and purchase gigs or request custom gigs.
- **Admin** users to monitor and manage users, gigs, and transactions.

The platform is designed for high scalability and performance using AWS infrastructure and modern tools like Kubernetes, Elasticsearch, Prometheus, and Grafana.

## Architecture

The project is built with a **microservices architecture** deployed on **Amazon EKS** (Elastic Kubernetes Service). Below is an overview of the key components:

### Microservices

- **User Service**: Handles user registration, authentication, and management.
- **Gig Service**: Manages gig creation, editing, listing, and searching.
- **Order Service**: Processes orders, including purchases of gigs and custom offers.
- **Payment Service**: Integrates with payment gateways to handle transactions.
- **Notification Service**: Sends notifications via email, SMS, or platform messages.

### Technologies

- **Amazon EKS**: Orchestrates containers running microservices. Each service is deployed as a pod within Kubernetes.
- **Elasticsearch**: Provides fast and efficient search functionality for gigs. It powers search queries, autocomplete suggestions, and filtering options.
- **Prometheus**: Monitors the health and performance of all microservices, tracks resource usage, and generates metrics for analysis.
- **Grafana**: Visualizes Prometheus metrics, providing real-time dashboards and alerts to monitor system health, service latencies, and key business KPIs.
- **Amazon RDS / DynamoDB**: Stores data related to users, gigs, orders, and transactions.
  - **RDS** is used for relational data like users, gigs, and orders.
  - **DynamoDB** is used for fast access to session data, reviews, and ratings.
- **AWS S3**: Stores media assets such as gig images, videos, and other files uploaded by sellers.
- **AWS IAM**: Manages permissions and access control across services and resources.
- **AWS ACM**: Provides SSL certificates for secure communication via HTTPS.

### Workflow Example

1. **Search Gigs**:
   - Buyers use Elasticsearch to search and filter gigs. Search results are returned based on keywords, categories, and additional filters such as price or delivery time.

2. **Purchase Gig**:
   - Buyers can purchase gigs via the Order Service. The Payment Service handles the transaction, and the order status is updated in the database.

3. **Real-Time Monitoring**:
   - Prometheus monitors service metrics such as CPU usage, memory consumption, and request latencies. Alerts are triggered for any issues, such as service failures or slow response times.
   - Grafana visualizes this data, showing the overall health of the system.

### AWS Services

- **Amazon EKS**: Runs Kubernetes, allowing us to deploy, manage, and scale containerized microservices.
- **Amazon RDS / DynamoDB**: Databases for storing structured and unstructured data.
- **Amazon S3**: Object storage for media assets (e.g., images and videos uploaded by sellers).
- **AWS Route 53**: Domain name service for routing traffic to the application.
- **AWS IAM**: Manages security and access control for the entire platform.
- **AWS ACM**: Provides and manages SSL certificates to secure communication between services.

## Key Features

- **Scalable Microservices Architecture**: Each service can be scaled independently based on traffic.
- **Search with Elasticsearch**: Buyers can search and filter gigs using Elasticsearch for real-time, fast search capabilities.
- **Real-Time Monitoring**: Prometheus and Grafana provide full observability and alerting for the system, ensuring uptime and performance.
- **Secure Transactions**: The platform integrates with a secure payment gateway, handling payments and refunds with AWS-managed security.
- **Secure and Reliable**: The platform uses IAM for role-based access control and ACM for secure SSL certificates.

## Getting Started

### Prerequisites

- **AWS Account**: Required to deploy services on AWS infrastructure.
- **Kubernetes**: Ensure you have a basic understanding of Kubernetes and container orchestration.
- **Docker**: All services are containerized using Docker.
- **Elasticsearch**: Set up an Elasticsearch cluster for search functionality.

### Installation

1. **Set up AWS Resources**:
   - Use **Amazon EKS** for Kubernetes cluster setup.
   - Set up **RDS** or **DynamoDB** for databases.
   - Configure **Elasticsearch** for search functionality.
   - Store media assets on **S3**.

2. **Deploy Microservices**:
   - Build and deploy Docker containers for each service in your EKS cluster.
   - Use Kubernetes Ingress for routing external traffic to services.

3. **Configure Monitoring**:
   - Deploy **Prometheus** to monitor services.
   - Set up **Grafana** to visualize Prometheus metrics and create dashboards for system monitoring.

4. **Configure Alerts**:
   - Use Prometheus alert manager to trigger notifications when service performance drops or errors occur.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---