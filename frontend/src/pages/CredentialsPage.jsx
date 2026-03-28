import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function CredentialsPage() {
  return <PageTemplate title="Credentials" {...pageContent.credentials} />;
}
