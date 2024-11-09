# Freelance Marketplace

This is a **freelance marketplace** where sellers can create gigs and buyers can purchase gigs or custom gigs. The project is built using a microservice-based architecture and leverages multiple technologies to ensure scalability, performance, and ease of management.

## Project Overview

- **Sellers** can create and manage gigs.
- **Buyers** can search for gigs, filter them, and purchase gigs or request custom gigs.
- **Users** start as buyers but can also become sellers by creating a seller profile.
- **Admin** users manage users, gigs, and transactions.

The platform is designed for high scalability and performance using AWS infrastructure and modern tools like Kubernetes, Elasticsearch, Prometheus, and Grafana.

## Architecture

The project is built with a **microservices architecture** deployed on **Amazon EKS** (Elastic Kubernetes Service). Below is an overview of the key components:

### Microservices

1. **API Gateway**:
   - Acts as the entry point to the microservices.
   - Handles communication between the client and the various microservices.

2. **Notification Service**:
   - Sends email notifications for key events (e.g., account confirmation, gig purchases, order completions).
   - Email notifications are the only form of notification used in this application.

3. **Authentication Service**:
   - Manages user authentication.
   - Supports login via email and username.
   - Handles account registration and user login.

4. **User Service**:
   - Manages both **buyers** and **sellers** profiles.
   - Users are created as buyers by default, with the option to become sellers.

5. **Gig Service**:
   - Handles CRUD operations for gigs (create, retrieve, update, delete).
   - Integrates with **Elasticsearch** for powerful search functionality.

6. **Chat Service**:
   - Manages messaging between buyers and sellers for communication.

7. **Order and Payment Service**:
   - Handles the purchasing of gigs and custom offers.
   - Integrated with **Stripe** for payment processing.
   - Manages orders and payments in a unified service for simplicity.

8. **Reviews and Ratings Service**:
   - Allows buyers to rate sellers and sellers to rate buyers after transactions.

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
   - **Prometheus** tracks the latency of services like the Gig Service and Order Service, ensuring they respond in a timely manner.
   - If a service becomes slow or unresponsive, **Prometheus** sends an alert via its alerting system.

4. **Analytics and Insights**:
   - **Grafana** displays a real-time dashboard that shows key metrics like the number of gigs sold, most popular categories, and system performance.

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
- **Secure Transactions**: The platform integrates with **Stripe** to handle payments and refunds with AWS-managed security.
- **Secure and Reliable**: The platform uses **IAM** for role-based access control and **ACM** for secure SSL certificates.

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