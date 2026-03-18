Web App Sales
===================

This project is meant to be a fully functional e-commerce web app for managing and selling products online. Built with Spring Boot backend, modern responsive frontend (HTML + CSS + JavaScript), and Supabase database integration, following best development practices.

## Key Features

- **Product Management**: Browse, filter, and search products by category
- **User Authentication**: Secure login and registration system
- **Shopping Dashboard**: Modern, responsive interface with attractive UI
- **Category Filtering**: Filter products by Electronics, Clothing, Home, and more
- **Search Functionality**: Quick product search by name or category
- **User Profile**: View and manage user account settings
- **Order Tracking**: View order history and status
- **Responsive Design**: Beautiful interface optimized for desktop and mobile

## Tech Stack

**Backend**
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven

**Frontend**
- HTML5
- CSS3
- JavaScript

**Database**
- Supabase (PostgreSQL)

## Requirements

- Java 17 or higher
- Maven
- Supabase account and project

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-app-sales
   ```

2. **Configure the application**
   - Copy `application-example.yaml` to `application.yaml`
   - Update with your Supabase credentials:
     ```yaml
     spring:
       datasource:
         url: your_supabase_url
         username: your_username
         password: your_password
     ```

3. **Access the application**
   - Open your browser and navigate to: `http://localhost:8080`

## Default Credentials (Development)

For local development, Spring Security generates default credentials:
- **Username**: `user`
- **Password**: *(displayed in console output when running the application)*

Note: I use a SecurityConfig class to disable Spring Security and permit all requests, it is meant to change later and I'll apply good security configurations. For now it is like this for development purposes.

## Project Architecture

```
Model → Repository → DTO → Service → Controller
```

## Project Structure

```
src/main/
├── java/com/ari/webapp/
│   ├── model/          → Database entities
│   ├── dto/            → Data Transfer Objects
│   ├── repository/     → Data access layer
│   ├── service/        → Business logic
│   ├── controller/     → Endpoints
│   └── config/         → Configuration
└── resources/
    ├── application.yaml    → Database config
    └── static/             → Frontend files
        ├── css/            → Styles
        ├── js/             → JavaScript
        └── images/         → Images
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/login` | User login |
| POST | `/users/register` | Create new user account |
| GET | `/products` | Get all products |
| GET | `/products/{id}` | Get product details |
| POST | `/orders` | Create new order |
| GET | `/orders` | Get user orders |

## Development Notes

- `application.yaml` is required and ignored by Git for security
- Use `application-example.yaml` as a template
- Never commit sensitive credentials
- All security configuration is in `config/SecurityConfig.java`
- Frontend assets are served from `resources/static/`

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is private and intended for personal use as well as learning experience.
