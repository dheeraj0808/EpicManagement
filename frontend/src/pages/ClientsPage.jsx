import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function ClientsPage() {
  return <PageTemplate title="Clients" {...pageContent.clients} />;
}
