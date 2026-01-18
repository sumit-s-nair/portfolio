import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and career timeline of Sumit Santhosh Nair. Full Stack Developer, Teaching Assistant, Research Intern, and more.",
  openGraph: {
    title: "Experience | Sumit Santhosh Nair",
    description:
      "Professional experience and career timeline. Full Stack Developer, Teaching Assistant, Research Intern.",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
