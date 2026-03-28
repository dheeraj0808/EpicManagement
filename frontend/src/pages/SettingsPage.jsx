import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function SettingsPage() {
  return <PageTemplate title="Settings" {...pageContent.settings} />;
}
