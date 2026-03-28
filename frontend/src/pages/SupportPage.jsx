import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function SupportPage() {
  return <PageTemplate title="Support" {...pageContent.support} />;
}
