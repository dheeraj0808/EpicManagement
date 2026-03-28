import PageTemplate from "../components/PageTemplate";
import { pageContent } from "../data/pageContent";

export default function ProjectsPage() {
  return <PageTemplate title="Projects" {...pageContent.projects} />;
}
