import EntityPage from "../components/entity-page";

const fields = [
  { name: "name", label: "Sponsor Name", type: "text", required: true },
];

export default function SponsorsPage() {
  return <EntityPage title="Sponsors" apiPath="/sponsors" fields={fields} />;
}
