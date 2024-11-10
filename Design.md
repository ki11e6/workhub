# Microservices Design

The project follows a microservices architecture, where each service is responsible for a specific domain within the application. The **API Gateway** serves as the central hub for all client communications and interactions between the microservices.

## API Gateway
- **Centralized Communication**: All client requests must pass through the **API Gateway**. Direct communication from the client to any microservice is prohibited to ensure security and centralize control.
- **Communication Protocols**:
  - Between the **API Gateway** and the client: HTTP (with support for **Socket.IO** for real-time communication).
  - Between the **API Gateway** and the microservices: HTTP and **Socket.IO** for asynchronous tasks.

## Microservice Communication
- **Synchronous Communication**: HTTP-based communication is used for standard client requests/responses.
- **Real-Time Communication**: **Socket.IO** is implemented for services requiring real-time updates, such as the chat service.

## Event-Driven Architecture
- **Internal Communication**: Inter-process communication between microservices is **event-driven**, ensuring loose coupling and scalability.
- **Message Broker**: The project uses **RabbitMQ** for asynchronous communication between microservices. This decision was made based on personal experience, although **Kafka** could also be used.

## Token Management
- **Centralized Token Handling**: Token generation, storage, and management are handled by the **API Gateway** using **JWT**.
  - **Authentication Service**: The only exception is the initial token generation during user signup or login. After generation, the token is stored in cookies managed by the **API Gateway**.
- **Token Validation**: Each microservice validates incoming requests by checking the attached token but does not manage the token itself.

## Error Handling
- **Client Errors**: Errors like invalid credentials are sent to the **API Gateway**, which then forwards them to the client.
- **Server Errors**: Any server-side errors specific to a microservice are logged in the monitoring system using **Elasticsearch** and **Kibana**.

## Security
- **No External Access**: Microservices, except the **API Gateway**, are not accessible from outside the system. Direct access to a microservice (e.g., using Postman) will result in failure.
- **API Gateway Validation**: All requests must include a token validated by the **API Gateway**. Any requests with invalid or missing tokens are rejected.

## Monitoring and Logging
- **Logging**: All server errors are sent to **Elasticsearch** for logging and analysis.
- **Monitoring**: **Kibana** is used for monitoring application logs and system performance.

---
### 1. **API Gateway**
   - Acts as the entry point for all client requests.
   - Handles communication between the client and microservices using **HTTP/HTTPS** and **Socket.IO** for real-time updates.
   - Routes requests to various microservices (Notification, Auth, Users, Gig, Chat, Order, Review).
   - Responsible for managing authentication, rate limiting, and load balancing.

### 2. **Notification Service**
   - Manages notifications (e.g., email, SMS, push notifications) for user-related events.
   - Uses **RabbitMQ** for message queuing.
   - Communicates with other services over **HTTP/HTTPS**.
   - Likely interacts with **Auth Service**, **Order Service**, and **Chat Service** to notify users about actions like authentication, order updates, or messages.

### 3. **Auth Service**
   - Manages user authentication and authorization.
   - Stores user credentials and session data in **MySQL**.
   - Uses **RabbitMQ** for messaging.
   - Communicates with the **API Gateway** and other services for verifying user credentials during requests.

### 4. **Users Service**
   - Manages user profiles and user-related data.
   - Stores data in **MongoDB** and caches user-related information in **Redis**.
   - Uses **RabbitMQ** for messaging between services.
   - Interacts with other services, like the **Gig Service** and **Order Service**, to link user profiles with their respective gigs, orders, and reviews.

### 5. **Gig Service**
   - Handles the creation, update, and management of user gigs (services offered by sellers).
   - Stores gig data in **MongoDB**.
   - Uses **RabbitMQ** to communicate with other services.
   - Provides gig information for **Order Service** and other relevant services.

### 6. **Chat Service**
   - Manages real-time messaging between buyers and sellers.
   - Uses **MongoDB** for chat storage.
   - Communicates with other services, particularly the **Notification Service**, to notify users of new messages.
   - Relies on **Socket.IO** for real-time updates.

### 7. **Order Service**
   - Handles all order-related processes, including order creation, payment, and status updates.
   - Stores order data in **MongoDB** and manages message queues with **RabbitMQ**.
   - Provides information to other services like the **Notification Service** for order confirmation emails or messages.

### 8. **Review Service**
   - Manages the creation, updating, and retrieval of reviews and ratings between buyers and sellers.
   - Stores data in **PostgreSQL** for structured review data.
   - Uses **RabbitMQ** for messaging with other services.
   - Provides reviews linked to orders and gigs.

### 9. **Database Layer**
   - Various databases are used to manage different types of data:
     - **MySQL**: For authentication data.
     - **MongoDB**: For user profiles, gigs, chats, and orders.
     - **PostgreSQL**: For reviews and ratings.
     - **Redis**: For caching frequently accessed data (e.g., user sessions).

### 10. **Message Queueing (RabbitMQ)**
   - RabbitMQ is used extensively across services to ensure reliable and scalable messaging between microservices.
   - It helps decouple services, making the architecture more resilient to failures and allowing for better scaling.

### 11. **Real-time Communication (Socket.IO)**
   - **Socket.IO** is used for real-time updates, primarily for features like chat or notifications that require instant updates to the user interface.

### 12. **Elasticsearch/Kibana**
   - Elasticsearch is likely used for indexing gig and order data for fast search and retrieval.
   - Kibana is used for monitoring, visualizing logs, and querying Elasticsearch data.

### Communication Flow:
- **Clients** interact with the system through the **API Gateway**.
- Each microservice handles specific functionality, and they communicate internally via **RabbitMQ** and externally with databases like MongoDB, MySQL, and PostgreSQL.
- **Elasticsearch** and **Kibana** provide search and observability features for the system.

---
# Inter Process Communication


### 1. **Notification Service**
   - **Receives** messages from:
     - **Auth Service**: Likely to notify users about registration or login.
     - **Order Service**: For order confirmations or completion notifications.
     - **Chat Service**: Possibly for new messages or communication alerts.
   - **Sends** messages to:
     - No outgoing communication indicated.

### 2. **Auth Service**
   - **Sends** messages to:
     - **Notification Service**: Triggers notifications for authentication-related events (e.g., registration confirmation).
     - **Users Service**: To interact with user profiles, possibly for user verification.
   - **Receives** from:
     - No incoming communication indicated.

### 3. **Users Service**
   - **Sends** messages to:
     - **Gig Service**: Likely to provide user information when gigs are created or updated.
     - **Order Service**: Possibly to handle user-related actions when placing or updating orders.
     - **Review Service**: To provide user information when reviews are being created.
   - **Receives** messages from:
     - **Auth Service**: For authentication and user profile actions.
     - **Gig Service**: When gig actions require updating user-related data.

### 4. **Gig Service**
   - **Sends** messages to:
     - **Users Service**: Likely to fetch user data when creating or updating a gig.
   - **Receives** messages from:
     - **Users Service**: For user-related data during gig creation.
     - **Order Service**: For gig updates when orders are placed.
     - **Review Service**: To fetch gig details when reviews are left.

### 5. **Chat Service**
   - **Sends** messages to:
     - **Notification Service**: Likely to notify users of new messages.
   - **Receives** from:
     - No incoming communication indicated.

### 6. **Order Service**
   - **Sends** messages to:
     - **Users Service**: To handle user-related actions during order creation or updates.
     - **Review Service**: Likely to update reviews related to the order.
     - **Notification Service**: For notifying users about order status.
   - **Receives** messages from:
     - **Users Service**: For user-related data during order creation.
     - **Gig Service**: To fetch gig details for orders.

### 7. **Review Service**
   - **Sends** messages to:
     - **Users Service**: Possibly to access user data when reviews are left.
     - **Order Service**: To fetch order-related data for reviews.
   - **Receives** from:
     - **Users Service**: To fetch user data for reviews.
     - **Order Service**: To fetch order data.

---