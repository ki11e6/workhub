# Notification Service

The **Notification Service** is responsible for sending email notifications based on events triggered by other services in the system. It only handles **email notifications**, not push notifications or other types of notifications.

## Emails Sent by the Notification Service

The Notification Service will handle sending different types of emails in response to user actions. Below is a list of emails that the service will send:

### 1. **Email Verification**
- When a user creates an account, they will receive an email to verify their email address.
- The user can access the platform without verifying their email, but their actions will be limited.
- For example, an unverified user cannot create a seller account or contact a seller.

### 2. **Forgot Password**
- When a user forgets their password and requests a reset, an email will be sent with instructions to reset their password.

### 3. **Password Reset Confirmation**
- Once a user successfully resets their password, they will receive an email confirming the successful reset.

### 4. **Custom Offer Email**
- When a seller and buyer communicate, the seller may send a custom offer to the buyer, especially after negotiating a new price.
- For example, the original gig price might be $20, but after discussion, the seller agrees to complete the task for $15. The buyer will receive an email notifying them of the custom offer from the seller.

### 5. **Order-Related Emails**
The Notification Service will handle several order-related emails:

#### a. **Order Placement**
- When a buyer places an order, the seller will receive an email notifying them that an order has been placed for their gig.

#### b. **Order Receipt**
- After successful payment for an order, the buyer will receive a receipt in their email.

#### c. **Extension Request**
- If a seller requires more time to complete an order, they can send an extension request to the buyer.
- The buyer can either approve or reject the request. Depending on the buyer's decision, the seller will receive an email notifying them of the outcome.

#### d. **Extension Approval or Rejection**
- If the buyer approves or rejects the seller’s extension request, the seller will receive an email notifying them of the decision.

#### e. **Order Delivery**
- When a seller delivers an order, the buyer will receive an email notifying them that their order has been delivered.

### 6. **Additional Emails**
- You may choose to send additional emails, such as notifications for when reviews are added by buyers or sellers. However, the emails listed above are the primary ones covered by the Notification Service in this project.

## How It Works
- The **Notification Service** consumes events from other services within the system and sends the appropriate email notifications to users based on the event type.

## Conclusion
This Notification Service is designed to handle critical user communication via email, keeping both buyers and sellers informed of key actions within the platform.
