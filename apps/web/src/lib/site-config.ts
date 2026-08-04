export const siteConfig = {
  name: "SynapVault AI",
  shortName: "SynapVault",
  description:
    "Turn documents into trusted, connected intelligence with grounded AI answers and exact citations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@synapvault.ai",
  creator: "Priyanshu Jaggi",
  links: {
    github: "https://github.com/priyanshu-git2777",
    linkedin: "https://www.linkedin.com/",
  },
} as const;
