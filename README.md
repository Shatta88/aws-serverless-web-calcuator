# aws-serverless-web-calcuator
Deploy a serverless calculator on AWS using, AWS Lambda, DynamoDB, API Gateway and Amplify

# AWS Serverless Calculator

A full-stack serverless calculator built with AWS Lambda, Amazon API Gateway, Amazon DynamoDB, and AWS Amplify.

The application performs arithmetic calculations, number-base conversions, and stores calculation history in DynamoDB.

## Live Architecture

Browser
   ↓
AWS Amplify
   ↓
Amazon API Gateway (REST API)
   ↓
AWS Lambda
   ↓
Amazon DynamoDB

The calculation history follows the same serverless architecture and is retrieved through a separate Lambda function and API endpoint.

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Power / Exponential calculations
- Number-base conversion
- Binary conversion
- Decimal conversion
- Hexadecimal conversion
- Support for bases 2–36
- Calculation history
- DynamoDB data persistence
- Responsive web interface

## AWS Services Used

### AWS Amplify
Used to host and deploy the frontend application.

### Amazon API Gateway
Provides REST API endpoints for communicating between the frontend and Lambda functions.

Endpoints:

- `POST /calculate`
- `GET /history`

### AWS Lambda

Two Lambda functions are used:

**serverless-calculator**

Handles calculations and saves successful calculations to DynamoDB.

**calculator-history**

Retrieves calculation history from DynamoDB.

### Amazon DynamoDB

Table:

`calcdb`

Partition key:

`id`

The table stores:

- Calculation ID
- Operation
- Input
- Result
- Timestamp

### IAM

Lambda functions use IAM permissions following the principle of least privilege.

The calculator Lambda is allowed to write to the DynamoDB table.

The history Lambda is allowed to scan the DynamoDB table.

### Amazon CloudWatch

Used for monitoring Lambda execution and troubleshooting errors during development.

## API Gateway REST API vs HTTP API

This project deliberately uses an **API Gateway REST API** to demonstrate a broader range of API Gateway capabilities.

An HTTP API could also be used for this application.

HTTP APIs are generally simpler and lower-cost, making them a good choice for straightforward Lambda-backed applications.

REST API was selected here primarily as a learning and portfolio decision.

## Project Flow

When a user performs a calculation:

1. The browser sends a request to API Gateway.
2. API Gateway invokes the calculator Lambda function.
3. Lambda performs the calculation.
4. Lambda stores the calculation in DynamoDB.
5. Lambda returns the result.
6. The frontend displays the result.

When the user opens calculation history:

1. The frontend sends a GET request to `/history`.
2. API Gateway invokes the history Lambda.
3. Lambda reads the DynamoDB table.
4. The latest calculations are returned.
5. The frontend displays the history.

## Error Handling

The application handles common errors including:

- Division by zero
- Invalid operations
- Missing input values
- Invalid number bases
- Invalid conversion input
- API communication errors

## Security Considerations

- S3 is not required for the application backend.
- DynamoDB access is controlled through IAM.
- Lambda functions do not use hard-coded AWS credentials.
- API Gateway provides the public API interface.
- CORS is configured for browser-based API requests.
- AWS IAM follows least-privilege access where applicable.

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB

### Deployment

- AWS Amplify
- GitHub

## Project Structure

aws-serverless-calculator/
│
├── index.html
├── style.css
├── app.js
└── README.md
