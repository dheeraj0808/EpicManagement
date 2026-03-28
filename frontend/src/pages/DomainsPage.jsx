import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function DomainsPage() {
  return <PageTemplate title="Domains" {...pageContent.domains} />;
}
