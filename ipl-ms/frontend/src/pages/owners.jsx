import EntityPage from "../components/entity-page";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "company", label: "Company", type: "text", required: true },
];

export default function OwnersPage() {
  return (
    <EntityPage
      title="Owners"
      apiPath="/owners"
      fields={fields}
    />
  );
}
