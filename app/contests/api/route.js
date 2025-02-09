// app/api/contests/route.js

export async function GET() {
    // You can fetch data here from a database or an external API
    const contests = [
        {
            "platform": "AtCoder",
            "contestName": "\u25c9\nAtCoder Regular Contest 192 (Div. 2)",
            "contestLink": "https://atcoder.jp/contests/arc192",
            "startTime": "2025-02-09T17:30:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "Codeforces Round 1003 (Div. 4)",
            "contestLink": "https://codeforces.com/contests/2065",
            "startTime": "2025-02-09T20:05:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "Codeforces Round (Div. 1)",
            "contestLink": "https://codeforces.com/contests/2066",
            "startTime": "2025-02-11T20:05:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "Codeforces Round (Div. 2)",
            "contestLink": "https://codeforces.com/contests/2067",
            "startTime": "2025-02-11T20:05:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "HackerEarth",
            "contestName": "Jackpot.bet Frontend challenge - up to 45 LPA",
            "contestLink": "https://www.hackerearth.com/challenges/hiring/jb-hc-front-end-developer-nextjs/",
            "startTime": "2025-02-12T18:00:00+0530",
            "contestDuration": "11 Days & 5 hours."
        },
        {
            "platform": "HackerEarth",
            "contestName": "Jackpot.bet 2D Game Developer challenge - up to 52 LPA",
            "contestLink": "https://www.hackerearth.com/challenges/hiring/jackpotbet-backend-developer-senior-2d-game-developer-phaserjs-or-rive/",
            "startTime": "2025-02-12T18:00:00+0530",
            "contestDuration": "11 Days & 5 hours."
        },
        {
            "platform": "HackerEarth",
            "contestName": "Jackpot.bet Backend challenge - up to 60 LPA",
            "contestLink": "https://www.hackerearth.com/challenges/hiring/jackpotbet-back-end-developer-go/",
            "startTime": "2025-02-12T18:00:00+0530",
            "contestDuration": "11 Days & 5 hours."
        },
        {
            "platform": "CodeChef",
            "contestName": "Codechef Starters 173",
            "contestLink": "https://www.codechef.com/START173",
            "startTime": "2025-02-12T20:00:00+05:30",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "HackerEarth",
            "contestName": "Indegene Hackathon",
            "contestLink": "https://www.hackerearth.com/challenges/hackathon/indegene-hackathon/",
            "startTime": "2025-02-14T10:00:00+0530",
            "contestDuration": "07:00 hours."
        },
        {
            "platform": "AtCoder",
            "contestName": "\u25c9\nRECRUIT Nihonbashi Half Marathon 2025 Winter\uff08AtCoder Heuristic Contest 043\uff09",
            "contestLink": "https://atcoder.jp/contests/ahc043",
            "startTime": "2025-02-14T15:30:00+0530",
            "contestDuration": "240:00 hours."
        },
        {
            "platform": "HackerEarth",
            "contestName": "Diebold Nixdorf Hiring Challenge 2025",
            "contestLink": "https://www.hackerearth.com/challenges/hiring/diebold-nixdorf-hiring-challenge-2025/",
            "startTime": "2025-02-14T18:00:00+0530",
            "contestDuration": "2 Days & 5 hours."
        },
        {
            "platform": "HackerRank",
            "contestName": "UKG India Tech Innovators Challenge \u2013 Pune Edition",
            "contestLink": "https://www.hackerrank.com/event/ukgs-innovative-engineers-the-future-begins-here-december-2024",
            "startTime": "2025-02-15T08:30:00.000Z",
            "contestDuration": "2:15:00"
        },
        {
            "platform": "HackerEarth",
            "contestName": "Hack for India: AI Agents Transforming Lives",
            "contestLink": "https://www.hackerearth.com/challenges/hackathon/hack-for-india-ai-agents-transforming-lives/",
            "startTime": "2025-02-15T11:00:00+0530",
            "contestDuration": "22 Days & 12 hours."
        },
        {
            "platform": "AtCoder",
            "contestName": "\u25c9\nAtCoder Beginner Contest 393",
            "contestLink": "https://atcoder.jp/contests/abc393",
            "startTime": "2025-02-15T17:30:00+0530",
            "contestDuration": "01:40 hours."
        },
        {
            "platform": "GeeksforGeeks",
            "contestName": "GfG Weekly - 194 [Rated Contest]",
            "contestLink": "https://practice.geeksforgeeks.org/contest/gfg-weekly-194-rated-contest",
            "startTime": "2025-02-16T19:00:00+0530",
            "contestDuration": "01:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "Codeforces Round (Div. 2)",
            "contestLink": "https://codeforces.com/contests/2064",
            "startTime": "2025-02-16T20:05:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "Educational Codeforces Round 174 (Rated for Div. 2)",
            "contestLink": "https://codeforces.com/contests/2069",
            "startTime": "2025-02-18T20:05:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "CodeChef",
            "contestName": "Codechef Starters 174",
            "contestLink": "https://www.codechef.com/START174",
            "startTime": "2025-02-19T20:00:00+05:30",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "AtCoder",
            "contestName": "\u25c9\nKAJIMA CORPORATION CONTEST 2025 (AtCoder Beginner Contest 394)",
            "contestLink": "https://atcoder.jp/contests/abc394",
            "startTime": "2025-02-22T17:30:00+0530",
            "contestDuration": "01:40 hours."
        },
        {
            "platform": "GeeksforGeeks",
            "contestName": "GfG Weekly - 195 [Rated Contest]",
            "contestLink": "https://practice.geeksforgeeks.org/contest/gfg-weekly-195-rated-contest",
            "startTime": "2025-02-23T19:00:00+0530",
            "contestDuration": "01:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "Educational Codeforces Round 175 (Rated for Div. 2)",
            "contestLink": "https://codeforces.com/contests/2070",
            "startTime": "2025-02-27T20:05:00+0530",
            "contestDuration": "02:00 hours."
        },
        {
            "platform": "HackerEarth",
            "contestName": "Emerson Test & Measurement (NI is Now part of Emerson) - Software Engineer Hiring Challenge 2025",
            "contestLink": "https://www.hackerearth.com/challenges/competitive/ni-software-engineer-hiring-challenge-2025/",
            "startTime": "2025-02-28T18:00:00+0530",
            "contestDuration": "2 Days & 5 hours."
        },
        {
            "platform": "AtCoder",
            "contestName": "\u25c9\nThe 2nd Masters Championship-qual-",
            "contestLink": "https://atcoder.jp/contests/masters2025-qual",
            "startTime": "2025-03-02T09:30:00+0530",
            "contestDuration": "06:00 hours."
        },
        {
            "platform": "CodeForces",
            "contestName": "European Championship 2025 - Online Mirror (Unrated, ICPC Rules, Teams Preferred)",
            "contestLink": "https://codeforces.com/contests/2068",
            "startTime": "2025-03-02T16:05:00+0530",
            "contestDuration": "05:00 hours."
        },
        {
            "platform": "GeeksforGeeks",
            "contestName": "GfG Weekly - 196 [Rated Contest]",
            "contestLink": "https://practice.geeksforgeeks.org/contest/gfg-weekly-196-rated-contest",
            "startTime": "2025-03-02T19:00:00+0530",
            "contestDuration": "01:00 hours."
        },
        {
            "platform": "AtCoder",
            "contestName": "\u25c9\nAtCoder Beginner Contest 410",
            "contestLink": "https://atcoder.jp/contests/abc410",
            "startTime": "2025-06-14T17:30:00+0530",
            "contestDuration": "01:40 hours."
        }
    ]

    if (!contests || contests.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No contests available at the moment.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    return new Response(
      JSON.stringify({ contests }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }