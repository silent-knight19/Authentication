import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle } from "lucide-react";

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
    border: '1px solid var(--mdb-border)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid var(--mdb-border)',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: '1.125rem',
    color: 'var(--mdb-text)',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'var(--mdb-text-muted)',
    cursor: 'pointer',
    padding: '0.25rem',
  },
  form: {
    padding: '1.5rem',
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
  },
  input: {
    width: '100%',
    backgroundColor: 'var(--mdb-darker)',
    border: '1px solid var(--mdb-border)',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--mdb-text)',
    outline: 'none',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 0',
    color: 'var(--mdb-text-muted)',
  },
  emptyTitle: {
    fontSize: '1.125rem',
    marginBottom: '0.25rem',
  },
  emptySubtitle: {
    fontSize: '0.875rem',
  },
  tableContainer: {
    backgroundColor: 'var(--mdb-card)',
    borderRadius: '0.75rem',
    border: '1px solid var(--mdb-border)',
    overflow: 'hidden',
  },
  tableWrapper: {
    overflowX: 'auto',
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
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.25rem',
  },
  actionButton: {
    padding: '0.375rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'var(--mdb-text-muted)',
  },
};

export default function EntityPage({ title, apiPath, fields, renderRow }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api${apiPath}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormData({});
    setEditingItem(null);
    setShowForm(false);
  };

  const openCreate = () => {
    setFormData({});
    setEditingItem(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = item[f.name] ?? "";
    });
    setFormData(initial);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingItem
        ? `/api${apiPath}/${editingItem._id}`
        : `/api${apiPath}`;
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        await fetchItems();
        resetForm();
      } else {
        setError(data.message || "Operation failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api${apiPath}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchItems();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--mdb-green)' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <button
          onClick={openCreate}
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--mdb-green-hover)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--mdb-green)';
          }}
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {showForm && (
        <div style={styles.modalOverlay} onClick={resetForm}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingItem ? "Edit" : "Create"} {title.slice(0, -1)}
              </h3>
              <button onClick={resetForm} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
              {fields.map((field) => (
                <div key={field.name} style={styles.formGroup}>
                  <label style={styles.label}>{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      style={styles.select}
                    >
                      <option value="" style={{ backgroundColor: 'var(--mdb-darker)' }}>
                        Select {field.label}
                      </option>
                      {field.options?.map((opt) => (
                        <option 
                          key={opt.value} 
                          value={opt.value}
                          style={{ backgroundColor: 'var(--mdb-darker)' }}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      style={styles.input}
                    />
                  )}
                </div>
              ))}
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={resetForm}
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
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No {title.toLowerCase()} found</p>
          <p style={styles.emptySubtitle}>Click "Add New" to create one</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  {fields.map((f) => (
                    <th key={f.name} style={styles.tableHeaderCell}>
                      {f.label}
                    </th>
                  ))}
                  <th style={{ ...styles.tableHeaderCell, textAlign: 'right' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr 
                    key={item._id} 
                    style={styles.tableRow}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--mdb-card-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {renderRow ? (
                      renderRow(item)
                    ) : (
                      fields.map((f) => (
                        <td key={f.name} style={styles.tableCell}>
                          {f.render ? f.render(item[f.name], item) : item[f.name]}
                        </td>
                      ))
                    )}
                    <td style={{ ...styles.tableCell, textAlign: 'right' }}>
                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => openEdit(item)}
                          style={styles.actionButton}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--mdb-green)';
                            e.currentTarget.style.backgroundColor = 'var(--mdb-green-dim)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--mdb-text-muted)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          style={styles.actionButton}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--mdb-error)';
                            e.currentTarget.style.backgroundColor = 'var(--mdb-error-bg)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--mdb-text-muted)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
