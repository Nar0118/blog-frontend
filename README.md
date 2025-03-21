# Blog Frontend

## Description
This is the frontend for a blog application, built using React, TypeScript, and Vite. It provides user authentication, post management, and protected routes using JWT authentication. The UI is styled with Chakra UI and state management is handled using Redux Toolkit.

## Technologies Used
- **React** (Frontend framework)
- **TypeScript** (Type safety and development efficiency)
- **Vite** (Fast development and build tool)
- **Redux Toolkit** (State management)
- **React Router** (Client-side routing)
- **Axios** (HTTP client for API calls)
- **Chakra UI** (UI component library)
- **React Hook Form** (Form handling)
- **React Toastify** (Notifications)
- **JWT Decode** (Token decoding and validation)

## Features
- User authentication (Register, Login, Logout) with JWT
- CRUD operations for blog posts
- Protected routes for authenticated users
- State management with Redux Toolkit
- API communication with Axios
- Responsive UI with Chakra UI

## Folder Structure
```
blog-frontend/
│-- src/
│   ├── components/          # Reusable UI components
│   │   ├── AddPost.tsx
│   │   ├── Login.tsx
│   │   ├── PostDetail.tsx
│   │   ├── PostList.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Toast.tsx
│   ├── redux/               # Redux store and slices
│   │   ├── authSlice.ts
│   │   ├── postsSlice.ts
│   │   ├── store.ts
│   ├── services/            # API calls using Axios
│   │   ├── authApi.ts
│   │   ├── postApi.ts
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── types.ts             # TypeScript types
│   ├── vite-env.d.ts        # Vite environment declarations
│-- .env                     # Environment variables
│-- .gitignore               # Git ignore file
│-- package.json             # Dependencies and scripts
│-- README.md                # Project documentation
│-- vite.config.ts           # Vite configuration
```

## Installation
### Prerequisites
Make sure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn**

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/nar0118/blog-frontend.git
   cd blog-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_URL="http://localhost:5000" #for local
   VITE_API_URL="https://blog-backend-oq0d.onrender.com" #for deployed version
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- **Login/Register** to access protected routes.
- **Add, Edit, Delete, and View** blog posts.
- **Logout** to clear authentication data.

## Deployment
To deploy the frontend, use Vercel, Netlify, or any static hosting provider:
```sh
npm run build
```
This will generate a `dist/` folder with optimized static files.

## License
This project is licensed under the MIT License.

## Author
Developed by **Narek**. Contributions are welcome!

