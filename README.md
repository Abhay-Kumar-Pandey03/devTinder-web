# devConnects – Frontend

Frontend application for **devConnects**, a real-time connection and messaging platform.

The UI focuses on authentication, chat experience, connection management, premium flow, and admin access.

The backend is available on https://github.com/Abhay-Kumar-Pandey03/devConnects

## Features
- User authentication (login / signup)
- One-to-one real-time chat UI
- Connection requests and responses
- Premium access flow
- Admin dashboard views
- Global state management using Redux
- Protected routes and role-based UI rendering

## State Management
- Redux is used for managing:
  - Auth state
  - User data
  - Connections
  - Requests
  - Real-time updates

## Real-Time Updates
- Socket-based updates for chat and user presence
- Seamless message syncing between connected users

## Deployment
The frontend is deployed on an **AWS EC2 instance** and served using **Nginx**.
