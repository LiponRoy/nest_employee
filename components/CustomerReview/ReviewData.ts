export interface ICustomerReview {
  name: string;
  reviewText: string;
  jobRoleSearched: string;
}

export const customerReviewsData: ICustomerReview[] = [
  {
    name: "Alice Johnson",
    reviewText: "This platform helped me land a great job within two weeks. Highly recommended!",
    jobRoleSearched: "Frontend Developer",
  },
  {
    name: "Mohammed Rahman",
    reviewText: "Easy to use and lots of job listings. Found several relevant opportunities quickly.",
    jobRoleSearched: "Backend Developer",
  },
  {
    name: "David Kim",
    reviewText: "Excellent features like resume builder and company reviews. Very helpful.",
    jobRoleSearched: "DevOps Engineer",
  },
  {
    name: "Carlos Mendes",
    reviewText: "The filters are really helpful. I was able to narrow down jobs that matched my skills.",
    jobRoleSearched: "Full Stack Developer",
  },
  {
    name: "Li Wei",
    reviewText: "Nice UI and a lot of listings. Got contacted by 3 recruiters in a week.",
    jobRoleSearched: "Data Analyst",
  },
  {
    name: "Fatima Noor",
    reviewText: "Very organized and easy to apply. I appreciate the application tracking feature.",
    jobRoleSearched: "HR Executive",
  },
  {
    name: "Elena Petrova",
    reviewText: "Found my remote position thanks to this site. The email alerts are super useful.",
    jobRoleSearched: "Content Writer",
  },
];