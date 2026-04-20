import { useState, useEffect } from "react";
import { Plus, Loader2, AlertCircle } from "lucide-react";

const styles = {
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--mdb-text)',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--mdb-green)',
    color: 'var(--mdb-dark)',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  errorBox: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--mdb-error-bg)',
    color: 'var(--mdb-error)',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    border: '1px solid var(--mdb-error)',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  modalContent: {
    backgroundColor: 'var(--mdb-card)',
    borderRadius: '0.75rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '28rem',
    padding: '1.5rem',
    border: '1px solid var(--mdb-border)',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: '1.125rem',
    color: 'var(--mdb-text)',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--mdb-text)',
    marginBottom: '0.25rem',
  },
  select: {
    width: '100%',
    backgroundColor: 'var(--mdb-darker)',
    border: '1px solid var(--mdb-border)',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--mdb-text)',
    outline: 'none',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    paddingTop: '0.5rem',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    border: '1px solid var(--mdb-border)',
    color: 'var(--mdb-text)',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'var(--mdb-green)',
    color: 'var(--mdb-dark)',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 0',
    color: 'var(--mdb-text-muted)',
  },
  emptyTitle: {
    fontSize: '1.125rem',
  },
  tableContainer: {
    backgroundColor: 'var(--mdb-card)',
    borderRadius: '0.75rem',
    border: '1px solid var(--mdb-border)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    fontSize: '0.875rem',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: 'var(--mdb-darker)',
    borderBottom: '1px solid var(--mdb-border)',
  },
  tableHeaderCell: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    fontWeight: 500,
    color: 'var(--mdb-text-muted)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tableRow: {
    borderBottom: '1px solid var(--mdb-border)',
    transition: 'background-color 0.2s ease',
  },
  tableCell: {
    padding: '0.75rem 1rem',
    color: 'var(--mdb-text)',
  },
};

export default function TeamBroadcastersPage() {
  const [teamBroadcasters, setTeamBroadcasters] = useState([]);
  const [teams, setTeams] = useState([]);
  const [broadcasters, setBroadcasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ teamId: "", broadcasterId: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [tbRes, tRes, bRes] = await Promise.all([
        fetch("/api/team-broadcasters"),
        fetch("/api/teams"),
        fetch("/api/broadcasters"),
      ]);
      const [tbData, tData, bData] = await Promise.all([
        tbRes.json(),
        tRes.json(),
        bRes.json(),
      ]);
      if (tbData.success) setTeamBroadcasters(tbData.data || []);
      if (tData.success) setTeams(tData.data || []);
      if (bData.success) setBroadcasters(bData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/team-broadcasters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        await fetchData();
        setShowForm(false);
        setFormData({ teamId: "", broadcasterId: "" });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--mdb-green)' }} />
      </div>
    );
  }

  const teamMap = Object.fromEntries(teams.map((t) => [t._id, t.name]));
  const broadcasterMap = Object.fromEntries(broadcasters.map((b) => [b._id, b.name]));

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>Team-Broadcasters</h2>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--mdb-green-hover)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--mdb-green)';
          }}
        >
          <Plus size={16} /> Assign Broadcaster
        </button>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {showForm && (
        <div style={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Assign Broadcaster to Team</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Team</label>
                <select
                  value={formData.teamId}
                  onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                  required
                  style={styles.select}
                >
                  <option value="" style={{ backgroundColor: 'var(--mdb-darker)' }}>Select Team</option>
                  {teams.map((t) => (
                    <option key={t._id} value={t._id} style={{ backgroundColor: 'var(--mdb-darker)' }}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Broadcaster</label>
                <select
                  value={formData.broadcasterId}
                  onChange={(e) => setFormData({ ...formData, broadcasterId: e.target.value })}
                  required
                  style={styles.select}
                >
                  <option value="" style={{ backgroundColor: 'var(--mdb-darker)' }}>Select Broadcaster</option>
                  {broadcasters.map((b) => (
                    <option key={b._id} value={b._id} style={{ backgroundColor: 'var(--mdb-darker)' }}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={styles.cancelButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--mdb-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    ...styles.submitButton,
                    opacity: submitting ? 0.5 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? "Assigning..." : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {teamBroadcasters.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No team-broadcaster links found</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Team</th>
                <th style={styles.tableHeaderCell}>Broadcaster</th>
              </tr>
            </thead>
            <tbody>
              {teamBroadcasters.map((tb) => (
                <tr
                  key={tb._id}
                  style={styles.tableRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--mdb-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={styles.tableCell}>{teamMap[tb.teamId] || tb.teamId}</td>
                  <td style={styles.tableCell}>{broadcasterMap[tb.broadcasterId] || tb.broadcasterId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
