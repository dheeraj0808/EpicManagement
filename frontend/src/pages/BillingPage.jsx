import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function BillingPage() {
  return <PageTemplate title="Billing" {...pageContent.billing} />;
}
