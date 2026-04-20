import { useState, useEffect } from "react";
import EntityPage from "../components/entity-page";

const PLAYER_ROLES = ["batsman", "bowler", "all-rounder", "wicket-keeper"];

export default function PlayersPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then((d) => d.success && setTeams(d.data || []))
      .catch(() => {});
  }, []);

  const fields = [
    { name: "name", label: "Player Name", type: "text", required: true },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      options: PLAYER_ROLES.map((r) => ({ value: r, label: r })),
    },
    {
      name: "teamId",
      label: "Team",
      type: "select",
      required: true,
      options: teams.map((t) => ({ value: t._id, label: t.name })),
    },
  ];

  return (
    <EntityPage
      title="Players"
      apiPath="/players"
      fields={fields}
      renderRow={(item) => (
        <>
          <td style={{ padding: '0.75rem 1rem', color: 'var(--mdb-text)' }}>
            {item.name}
          </td>
          <td style={{ padding: '0.75rem 1rem' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--mdb-green-dim)',
                color: 'var(--mdb-green)',
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                border: '1px solid var(--mdb-green)',
              }}
            >
              {item.role}
            </span>
          </td>
          <td style={{ padding: '0.75rem 1rem', color: 'var(--mdb-text)' }}>
            {item.teamId?.name || "—"}
          </td>
        </>
      )}
    />
  );
}
