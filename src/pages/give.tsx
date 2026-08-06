import { priorityRouteContent } from "@/content";
import { PriorityPage } from "@/components/pages/priority-page";

// The observed Church Center giving URL remains in the typed content registry,
// but is not rendered until finance confirms the account/namespace.
export default function GivePage() { return <PriorityPage content={priorityRouteContent.give} />; }
