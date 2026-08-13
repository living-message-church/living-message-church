import type { PageContent } from "@/types/content";

function ministryPage(path: string, title: string): PageContent {
  return {
    seo: {
      path,
      title: `${title} | Living Message Church`,
      description: `${title} at Living Message Church.`,
      noIndex: true,
    },
    eyebrow: "Ministries",
    title,
    intro: "",
  };
}

export const ministryPageContent = {
  men: ministryPage("/connect/men", "Men"),
  women: ministryPage("/connect/women", "Women"),
  seniors: ministryPage("/connect/seniors", "Seniors"),
};
