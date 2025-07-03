# CodeBank

**CodeBank** is a platform that allows users to access a collection of resources such as Notes, Contests, and Jobs. It provides an easy-to-use interface with seamless navigation, a clean design, and dynamic content fetching from APIs.


## **CodeBank - Contest and Job Update Platform**

**Technologies**: React, Next.js, Tailwind CSS, Flask, FastAPI, BeautifulSoup, Telethon

- Developed a platform with **React** and **Next.js** that displays **Contest** and **Job** updates fetched from APIs.
- Created a **Flask RESTful API** to scrape and provide **contest updates** from various coding platforms using **BeautifulSoup**.
- Implemented a **FastAPI** server to scrape **job listings** from a **Telegram job update group** using **Telethon**.
- Built a **dynamic theme toggle** feature to allow users to switch between light and dark modes.
- Integrated a **loading bar** for smooth user experience while fetching dynamic data.
- Ensured responsive design and optimized performance with **Tailwind CSS** and **React** components.
- Led the API integration and scraping logic to provide real-time data to users.


## Features
- **Notes**: Access a collection of programming notes to enhance your learning.
- **Contests**: View upcoming coding contests from different platforms.
- **Jobs**: Browse job listings for various tech roles.
- **Theme Toggle**: Switch between light and dark themes.

## Upcoming Features
- Company Logos – Automatically fetch and display company images.
- User Authentication – Enable login and save preferences for contests & listings.
- Notifications – Implement alerts for new contests & updates.
- Improved Theming – Light & Dark Mode toggle without dropdown.
- Smart Coding Questions – Filter by company, difficulty, and topic.
- Expanded Contest Listings – Support for Unstop, Mettl, and LeetCode.

## Technologies Used
- **Frontend**: 
  - React
  - Next.js
  - Tailwind CSS
  - React-Top-Loading-Bar
- **Backend**:
  - Flask API for fetching contest data (deployed on Render)
- **UI Components**: 
  - `ModeToggle` for theme switching
  - Custom components like `Sheet` for mobile menus

## theme
- **Content Text Color:**
  - Primary Text Color : text-gray-800 dark:text-gray-100
  - Secondary Text Color : text-gray-600 dark:text-gray-300
  
- **Container Color:** bg-white  dark:bg-gray-800

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gauravmeee/gkmeena-codebank.git
   cd codebank
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`.

## API Integration

The app fetches contests data from an my Flask API hosted on Render.

**API URL**: `https://flask-contest-api.onrender.com/`

### Available Routes:
- `/` : Home page displaying the main title
- `/notes` : Access to programming notes
- `/contests` : View upcoming contests
- `/jobs` : Browse job listings

## Automated Firestore Updates (Contests & Jobs)

To ensure that the contests and jobs lists in Firestore are always up-to-date, this project uses **Vercel Cron Jobs** to automatically refresh the data every 6 hours.

- Two API endpoints are provided:
  - `POST /api/cron/update-contests` — Updates contests data in Firestore.
  - `POST /api/cron/update-jobs` — Updates jobs data in Firestore.
- Vercel Cron Jobs are configured to trigger these endpoints every 6 hours (`0 */6 * * *`).
- This ensures that even if no one manually refreshes the data, the latest contests and jobs are always available to users.

**How it works:**
1. The backend fetches the latest contests and jobs from their respective APIs.
2. If there are changes, Firestore is updated and the cache is revalidated.
3. The update runs automatically every 6 hours via Vercel Cron Jobs.

You can also trigger these updates manually by sending a POST request to the above endpoints.

## Setting Up Vercel Cron Jobs

To automate the updating of contests and jobs in Firestore, you need to configure Vercel Cron Jobs using the `vercel.json` file in your project root.

### 1. Add or Update `vercel.json`

Create or edit a `vercel.json` file in your project root with the following content:

```json
{
  "crons": [
    {
      "path": "/api/cron/update-contests",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/update-jobs",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This schedules both endpoints to run every 6 hours.

### 2. (Recommended) Secure Your Cron Endpoints

Add a secret to your project:
- Go to your Vercel dashboard → Project Settings → Environment Variables.
- Add a variable:
  - **Name:** `CRON_SECRET`
  - **Value:** (choose a strong secret, e.g., `my-very-secret-cron-key`)

Update your API route handlers to check for this secret:

```js
export async function POST(request) {
  const auth = request.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ...rest of your code
}
```

### 3. Deploy

Push your changes to your repository. Vercel will automatically pick up the new cron jobs and environment variables on deployment.

### 4. Verify

After deployment, check the Cron Jobs section in your Vercel dashboard to ensure your jobs are scheduled and running.

## Folder Structure

```
/apps
  - page.js
  - /notes
    - page.js
  - /contests
    - page.js
  - /jobs
    - page.js
/components
  - Navbar.js
  - Footer.js
  - theme-btn.js
  - sheet.js
/public
  - /assets
    - logo images, etc.
/styles
  - global styles and Tailwind CSS configurations
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
JobNotificationHandler ----------------------->Service Worker
       |                                              |
       +---------------> NotificationService          |
       |                       |                      |
       v                       |                      |
useNotifications Hook          |                      |
                               |                      |
                               v                      |
                        Firebase Cloud                Browser
                          Messaging  -------------> Notifications
                                                              
                                 

                              
```
