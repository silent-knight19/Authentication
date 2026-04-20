import EntityPage from "../components/entity-page";

const fields = [
  { name: "name", label: "Broadcaster Name", type: "text", required: true },
];

export default function BroadcastersPage() {
  return <EntityPage title="Broadcasters" apiPath="/broadcasters" fields={fields} />;
}
