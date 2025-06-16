# 🌍 Wander Studio

## ✈️ Overview

**Wander Studio** is a web application designed to help users easily plan, organize, and share trips. 
(If you make it all the way down to the bottom of this README, you'll be rewarded with some images 📸 to show off just how awesome this app is! :D)

## 🚀 Key Features

- User authentication
- Create and describe custom trips
- Add destinations via city or address
- Visualize travel routes
- Invite and manage friends

## 🛠️ Built With

- **Frontend**: Angular
- **Backend**: Spring Boot, Spring Security, Spring Data JPA
- **Database**: MySQL (running in Docker container)
- **Authentication**: JWT (JSON Web Tokens), HttpOnly cookies
- **Maps**: Google Maps API
- **Containerization**: Docker (for MySQL database)
- **Security**: HTTPS, Secure password storage with hashing and salting (bcrypt)

## 🔐 Security Features

- **JWT Authentication**:
  - The backend uses **JWT tokens** stored in **HttpOnly cookies** to prevent access to the token from JavaScript, enhancing security against XSS attacks.
  - Users are logged out automatically if the token expires or is invalid.
  
- **Frontend Session Management**:
  - The frontend monitors user authentication status and logs out users who are unauthenticated or whose session has expired.
  - A built-in session counter tracks user activity and prevents unauthorized access.
  
- **Password Protection**:
  - All passwords are hashed and salted using **bcrypt**, ensuring that even if the database is compromised, user credentials remain secure.

- **CORS Configuration**:
  - The backend is configured with **CORS** to manage cross-origin requests and restrict access to authorized domains only.
  
- **HTTPS**:
  - The app uses **HTTPS** to encrypt all data transferred between the client and server, ensuring secure communication.

## 📸 Images

Now that you've made it through the long features list... here are some images!

- Login:
![image](https://github.com/user-attachments/assets/3bd2670e-fe3f-4bec-b84a-f0a6126ef7af)

- Sign Up:
![image](https://github.com/user-attachments/assets/bb8c22eb-87a0-474a-978c-9b8eae63e6ea)

- Dashboard:
![image](https://github.com/user-attachments/assets/9b5913e2-b574-4633-9b27-8f0a47c12451)

- Update Trip:
![image](https://github.com/user-attachments/assets/79c77fa7-42fc-4cb3-a2f4-ee7c0041eb7f)
![image](https://github.com/user-attachments/assets/071c078d-3bd8-46a2-ac11-8610acfe670e)

- Friends:

![image](https://github.com/user-attachments/assets/93b3ab31-da53-40f1-a0f1-9146a86dcc5f)







