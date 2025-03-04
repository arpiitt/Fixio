# Fixio

## Social Media for Developers

Fixio is a full-stack social media platform designed for developers to collaborate, debug, and share knowledge seamlessly. It provides a dynamic environment where developers can connect, discuss coding challenges, and receive real-time updates.

### Tech Stack
- **Backend:** Java, Spring Boot, PostgreSQL, REST API, JWT Authentication, WebSockets
- **Frontend:** ReactJS
- **Deployment:** GitHub Actions (CI/CD), Docker

## Features
- **Collaborative Debugging:** Developers can post and discuss programming issues in an interactive community.
- **Real-Time Notifications:** Integrated WebSockets for instant updates on discussions and interactions.
- **Secure Authentication:** JWT-based authentication for user security.
- **Optimized Database:** PostgreSQL schema designed with indexing, reducing query execution time by 30%.
- **Infinite Scrolling:** A seamless user experience with efficient content loading.
- **Automated Deployment:** CI/CD pipelines with GitHub Actions ensure rapid and smooth rollouts.

## Project Structure
The repository consists of two main directories:
- **Back-End/**: Contains the Spring Boot application handling authentication, APIs, and database interactions.
- **Front-End/**: Houses the ReactJS application providing the user interface.

## Getting Started

### Clone the Repository
```sh
 git clone https://github.com/arpiitt/Fixio.git
 cd Fixio
```

### Backend Setup
```sh
cd Back-End
# Build and run the Spring Boot application
./mvnw spring-boot:run
```

### Frontend Setup
```sh
cd Front-End
# Install dependencies and start the React development server
npm install
npm start
```

## Contributing
We welcome contributions! To get started:
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit your changes.
4. Push to your branch and create a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any queries, reach out via [GitHub Issues](https://github.com/arpiitt/Fixio/issues).
