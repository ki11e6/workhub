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