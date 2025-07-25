# Advitiya Bharat Marketplace

A web-based marketplace platform for Advitiya Bharat, allowing users to register, log in, and buy/sell products. Built with Node.js, Express, SQLite, and deployed on Railway.

## Features
- User registration and login
- Product listing and upload (with image support)
- Purchase flow
- Modern, animated frontend UI
- CORS-enabled backend for Netlify frontend

## Project Structure
```
├── server.js           # Express backend
├── register.html       # Registration page
├── login.html          # Login page
├── marketplace.html    # Marketplace UI
├── ...                 # Other state/product HTML files
├── style.css           # Main styles
├── uploads/            # Uploaded product images
├── users.db            # SQLite database
├── package.json        # Node.js dependencies and scripts
```

## Setup & Development
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <project-directory>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the backend locally:**
   ```sh
   node server.js
   ```
   The backend will run on `http://localhost:5000` by default.

4. **Frontend:**
   Open `index.html` or other HTML files in your browser.

## Deployment (Railway)
- Ensure your `package.json` has a `start` script:
  ```json
  "scripts": {
    "start": "node server.js"
  }
  ```
- The backend must listen on `process.env.PORT` for Railway:
  ```js
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ...);
  ```
- Push your code to GitHub and connect your Railway project.
- Set up environment variables if needed.

## Notes
- The `uploads/` directory is created automatically for product images.
- The SQLite database (`users.db`) is created if it does not exist.
- CORS is enabled for the Netlify frontend domain.

## License
MIT 