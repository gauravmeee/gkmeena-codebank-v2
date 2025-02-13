// app/jobs/api/route.js
// Note: this was for testing purpose for Maual APi
export async function GET() {
    // You can fetch data here from a database or an external API
    const jobs = [
    {
      "apply_link": "https://bit.ly/ClearFeedIntern2025",
      "batch_eligible": "2025 passouts",
      "company": "ClearFeed",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 50K - 60K per month",
      "location": "Bangalore",
      "role": "Software Engineering Intern"
    },
    {
      "apply_link": "https://bit.ly/4aPDEdJ",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "Parallel Dots",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 25K per month",
      "location": "Remote",
      "role": "Backend Developer Intern"
    },
    {
      "apply_link": "https://careers.synopsys.com/job/-/-/44408/77077687600?source=KrishanKumarLinkedin",
      "batch_eligible": "2024 & 2025 passouts",
      "company": "Synopsys",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 45K per month",
      "location": "Noida",
      "role": "Software Engineering Intern - Full Stack"
    },
    {
      "apply_link": "https://jobs.cisco.com/jobs/ProjectDetail/Software-Engineer-New-Grad-0-3-Years/1434562",
      "batch_eligible": "2025, 2024 & 2023 passouts",
      "company": "Cisco",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bangalore",
      "role": "Software Engineer"
    },
    {
      "apply_link": "https://eeho.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/jobsearch/job/262896",
      "batch_eligible": "2023, 2022 & 2021 passouts",
      "company": "Oracle",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "Software Developer 2"
    },
    {
      "apply_link": "https://perfleap.com/MyntraSDE",
      "batch_eligible": "2024 passouts",
      "company": "Myntra",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "Software Development Engineer"
    },
    {
      "apply_link": "https://docs.google.com/forms/d/e/1FAIpQLSemwuRa5Hd78pe3qDDleCQbuwRpa8nd2rAmG1y2EylZ3y92TA/viewform",
      "batch_eligible": "2025 passouts",
      "company": "Zelthy",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 25K - 40K per month",
      "location": "Bengaluru",
      "role": "Frontend & Backend Developer Intern"
    },
    {
      "apply_link": "https://jobs.intel.com/en/job/-/-/599/76809498864?source=KrishanKumarLinkedin",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "Intel",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "Software Engineering Intern"
    },
    {
      "apply_link": "https://jobs.lever.co/skypointcloud/670fce16-d569-4727-82dd-cd5f2d61cccb",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "Skypoint",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "AI Intern"
    },
    {
      "apply_link": "https://docs.google.com/forms/d/e/1FAIpQLScU61fbVcnjVKR1L-WSh_VWDzvQqS_LFmuCrsyCK9lYvzvhNg/viewform",
      "batch_eligible": "2025 passouts",
      "company": "Hummingbird Web Solutions",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 30K per month (Potential for PPO) Post Internship (Offer Based on Performance): INR 9 LPA Technologies you will work with: ● Full stack Web Development ● Javascript ● PHP ● Linux",
      "location": "Baner, Pune",
      "role": "SDE Intern"
    },
    {
      "apply_link": "https://www.capitalonecareers.com/job/-/-/234/76639280912?utm_source=KrishanKumarLinkedin",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "Capital One",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "Software Engineering Intern"
    },
    {
      "apply_link": "https://cliqonnect.darwinbox.in/ms/candidate/careers/a67988ce1b4233",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "Tata CliQ",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Mumbai",
      "role": "Full Stack Developer Intern"
    },
    {
      "apply_link": "https://jobsindia.deloitte.com/job/Bengaluru-Intern-Fresher-Bengaluru-Workforce-Transformation/35173044/",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "Deloitte",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "Software Intern"
    },
    {
      "apply_link": "https://corporate.target.com/jobs/w87/65/engineer-target-india-1",
      "batch_eligible": "2023 & 2022 passouts",
      "company": "Target",
      "expected_benefits": null,
      "expected_ctc": "15 LPA",
      "expected_stipend": null,
      "location": "Bangalore",
      "role": "Software Engineer"
    },
    {
      "apply_link": "https://whatsapp.com/channel/0029Va6I79K60eBfQ92DwH0W/1404",
      "batch_eligible": "2025 passouts",
      "company": "Tower Research Capital",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Gurgaon",
      "role": "ML Intern"
    },
    {
      "apply_link": "https://job-boards.greenhouse.io/connectwise/jobs/4502420005",
      "batch_eligible": "2025 & 2026 passouts",
      "company": "ConnectWise",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Mumbai/ Pune",
      "role": "Engineering Intern"
    },
    {
      "apply_link": "https://bharatfd.notion.site/17bbe9133f338104a235e75629d7ec76",
      "batch_eligible": "2025 passouts",
      "company": "BharatFD",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Gurugram Stipend: INR 50K per month",
      "role": "Backend Developer Intern"
    },
    {
      "apply_link": "https://flutterbe.wd3.myworkdayjobs.com/Junglee_Games/job/Junglee-Gurgaon/Data-Intern_JR123433-1?source=KrishanKumarLinkedin",
      "batch_eligible": "2025 passouts",
      "company": "Junglee Games",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Gurgaon",
      "role": "Data Intern"
    },
    {
      "apply_link": "https://perfleap.com/CredWebInternship",
      "batch_eligible": "2025 passouts",
      "company": "CRED",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 60K per month",
      "location": "Bengaluru, India",
      "role": "Web Intern (Frontend Engineering)"
    },
    {
      "apply_link": "https://perfleap.com/NvidiaSummerIntern",
      "batch_eligible": "2026 passouts",
      "company": "Nvidia",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 50K - 75K per month Location: Pune/ Bangalore/ Hyderabad, India",
      "location": "Pune/ Bangalore/ Hyderabad, India",
      "role": "Software Engineering Intern (Summer)"
    },
    {
      "apply_link": "https://philips.wd3.myworkdayjobs.com/jobs-and-careers/job/Pune/Tech-Intern-Hiring_522121/",
      "batch_eligible": "2025 passouts",
      "company": "Philips",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Pune",
      "role": "Tech Intern"
    },
    {
      "apply_link": "https://jobsearch.harman.com/en_US/careers/JobDetail/Internship/25301",
      "batch_eligible": "2025 passouts",
      "company": "Harman",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bangalore",
      "role": "Intern"
    },
    {
      "apply_link": "https://bit.ly/3CxrSrs",
      "batch_eligible": "2025, 2026, 2027 & 2028 passouts",
      "company": "Advertisingsaga",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 20K - 25K per month Location: Work From Home",
      "location": "Work From Home",
      "role": "Data Analyst Intern"
    },
    {
      "apply_link": "https://fortive.eightfold.ai/careers/job?domain=fortive.com&pid=893380022779&domain=fortive.com&sort_by=relevance&job_index=0",
      "batch_eligible": "2025 passouts",
      "company": "Fortive",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bengaluru",
      "role": "Software Engineer Intern"
    },
    {
      "apply_link": "https://app.dover.com/apply/peakflo/1afd507b-b13c-49e6-b1e4-357cf9e0cb85",
      "batch_eligible": "2024, 2025, 2026 & 2027 passouts",
      "company": "Peakflo",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 30K - 35K per month Location: Remote",
      "location": "Remote",
      "role": "Frontend Developer Intern"
    },
    {
      "apply_link": "https://www.linkedin.com/jobs/view/4129888777",
      "batch_eligible": "2025 passouts",
      "company": "Appinventiv",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Noida",
      "role": "Engineer Intern"
    },
    {
      "apply_link": "https://ag.wd3.myworkdayjobs.com/en-US/Airbus/job/Generative-AI-Intern_JR10307709?source=KrishanKumarLinkedin",
      "batch_eligible": "2025 passouts",
      "company": "Airbus",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": null,
      "location": "Bangalore",
      "role": "Generative AI Intern"
    },
    {
      "apply_link": "https://www.linkedin.com/jobs/view/4130352892",
      "batch_eligible": "2025 passouts",
      "company": "ShareChat",
      "expected_benefits": "Zomato coupons (250+free delivery Mon-Sat), WiFi Reimbursement, cult fit membership, rent books for free, other basic medical services (doctor consultation, mental wellbeing, etc) Location: Bangalore",
      "expected_ctc": null,
      "expected_stipend": "INR 50K per month",
      "location": "Bangalore",
      "role": "SDE Intern"
    },
    {
      "apply_link": "https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Intern_JR280041?source=KrishanKumarLinkedin",
      "batch_eligible": "2026 passouts",
      "company": "Salesforce",
      "expected_benefits": null,
      "expected_ctc": null,
      "expected_stipend": "INR 1,25,000 per month Location: Hyderabad, India",
      "location": "Hyderabad, India",
      "role": "SDE Intern (Summer)"
    }
  ];

  return new Response(JSON.stringify(jobs), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}