# User End (Angular)

## Project Setup
This is an Angular project for the User End Application.

## Basic Commands

**1. Go to the project directory:**
```bash
cd Shoes_Store_User_End
```

**2. Install Dependencies (if not already installed):**
```bash
npm install
```

**3. Run the Development Server:**
```bash
npm start
```
*or* `npx ng serve`

*(Note: If the Admin Panel is already running on port 4200, you can run this on a different port using: `npx ng serve --port 4201`)*

**4. Stop the Server:**
Press `Ctrl + C` in the terminal where the server is running.

**5. Force Stop if Port is Blocked (Mac/Linux):**
If your port is already in use and you need to force stop it:
```bash
lsof -i :4200
# or lsof -i :4201
kill -9 <PID>
```
*(Replace `<PID>` with the Process ID found in the output).*
