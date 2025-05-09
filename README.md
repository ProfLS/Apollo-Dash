# Apollo Dash
 Final Project for 118W (Apollo Dash)

---

## Setup Instructions

Follow these steps to get the project up and running:

### 1. Clone the repository and install dependencies
```bash
npm install express mongoose dotenv cors
```

### 2. Create the environment variables file
Navigate to the `/server` directory and create a `.env` file:
```bash
cd main/server
touch .env
```
Inside `.env`, add your MongoDB connection URI and desired port:
```env
MONGO_URI=your_mongo_uri
PORT=5000
```
Replace your_mongo_uri with your actual MongoDB Atlas connection string. You can use any available port, such as 5000.

### 3. Run the Backend Server
To start the Node.js server:
```bash
node server.js
```
### 4. Serve the Frontend
You have two options to run your frontend:

#### Option A: Use Live Server (for HTML/JS frontend)
Install the Live Server extension (if using VSCode), then right-click your main index.html file and select "Open with Live Server". This will launch the frontend on a browser with live reload support.

#### Option B: Serve via Node (if bundled with Express)
If you're serving the frontend from Express, make sure to add static file serving in index.js:
```js
app.use(express.static('public'));
```
