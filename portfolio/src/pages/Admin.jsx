import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getProjects, addProject, updateProject, deleteProject } from '../services/portfolio';
import { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, getCategories } from '../services/gallery';
import { setGitHubUsername, getGitHubUsername } from '../services/github';

const Admin = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('project');
  const [editingItem, setEditingItem] = useState(null);
  const [githubUsername, setGithubUsernameState] = useState('');
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', url: '', tags: '', badge: 'LIVE_SITE', featured: true });
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', image: '', category: 'Projects' });

  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getProjects());
      setGallery(getGallery());
      setGithubUsernameState(getGitHubUsername());
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) { setError(''); setPassword(''); }
    else { setError('Invalid password. Access denied.'); }
  };

  // Project handlers
  const openProjectModal = (project = null) => {
    setModalType('project');
    setEditingItem(project);
    setProjectForm(project ? { ...project, tags: project.tags.join(', ') } : { title: '', description: '', image: '', url: '', tags: '', badge: 'LIVE_SITE', featured: true });
    setShowModal(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const data = { ...projectForm, tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (editingItem) updateProject(editingItem.id, data);
    else addProject(data);
    setProjects(getProjects());
    setShowModal(false);
  };

  const handleProjectDelete = (id) => {
    if (window.confirm('Delete this project?')) { deleteProject(id); setProjects(getProjects()); }
  };

  // Gallery handlers
  const openGalleryModal = (item = null) => {
    setModalType('gallery');
    setEditingItem(item);
    setGalleryForm(item ? { ...item } : { title: '', description: '', image: '', category: 'Projects' });
    setShowModal(true);
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (editingItem) updateGalleryItem(editingItem.id, galleryForm);
    else addGalleryItem(galleryForm);
    setGallery(getGallery());
    setShowModal(false);
  };

  const handleGalleryDelete = (id) => {
    if (window.confirm('Delete this gallery item?')) { deleteGalleryItem(id); setGallery(getGallery()); }
  };

  const handleGitHubUpdate = () => { setGitHubUsername(githubUsername); alert('GitHub username updated!'); };

  if (isLoading) return <div className="admin-container"><div className="loading-spinner"></div></div>;

  if (!isAuthenticated) {
    return (
      <div className="dev-grid admin-container">
        <div className="admin-login-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '3rem', height: '3rem', background: 'var(--primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Admin Access</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Enter password to manage portfolio</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input type="password" className="admin-input" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
              {error && <p className="admin-error">{error}</p>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Authenticate</button>
          </form>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}><Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textDecoration: 'none' }}>← Back to Portfolio</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dev-grid" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Simple Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Portfolio Admin</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Manage projects, gallery & settings</p>
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>GitHub Settings</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label">GitHub Username</label>
                <input type="text" className="admin-input" value={githubUsername} onChange={(e) => setGithubUsernameState(e.target.value)} placeholder="Enter GitHub username" />
              </div>
              <button onClick={handleGitHubUpdate} className="btn btn-primary" style={{ height: 'fit-content' }}>Update</button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Projects ({projects.length})</h2>
              <button onClick={() => openProjectModal()} className="btn btn-primary" style={{ fontSize: '0.75rem' }}>+ Add Project</button>
            </div>
            <div className="admin-projects-grid">
              {projects.map(p => (
                <div key={p.id} className="admin-project-card">
                  {p.image && <div style={{ width: '100%', height: '100px', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0.5rem', marginBottom: '0.75rem' }}></div>}
                  <h3 style={{ fontWeight: 700, marginBottom: '0.375rem', fontSize: '0.9rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {p.tags.slice(0, 3).map(t => <span key={t} className="tag" style={{ fontSize: '0.5rem' }}>{t}</span>)}
                  </div>
                  <div className="admin-actions">
                    <button onClick={() => openProjectModal(p)} className="admin-btn admin-btn-edit">Edit</button>
                    <button onClick={() => handleProjectDelete(p.id)} className="admin-btn admin-btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Gallery ({gallery.length})</h2>
              <button onClick={() => openGalleryModal()} className="btn btn-primary" style={{ fontSize: '0.75rem' }}>+ Add Image</button>
            </div>
            {gallery.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No gallery items yet</p>
                <button onClick={() => openGalleryModal()} className="btn btn-primary">Add First Image</button>
              </div>
            ) : (
              <div className="admin-projects-grid">
                {gallery.map(item => (
                  <div key={item.id} className="admin-project-card">
                    {item.image && <div style={{ width: '100%', height: '100px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0.5rem', marginBottom: '0.75rem' }}></div>}
                    <span className="tag" style={{ fontSize: '0.5rem', marginBottom: '0.375rem' }}>{item.category}</span>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.375rem', fontSize: '0.9rem' }}>{item.title}</h3>
                    <div className="admin-actions">
                      <button onClick={() => openGalleryModal(item)} className="admin-btn admin-btn-edit">Edit</button>
                      <button onClick={() => handleGalleryDelete(item.id)} className="admin-btn admin-btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                {editingItem ? 'Edit' : 'Add'} {modalType === 'project' ? 'Project' : 'Gallery Item'}
              </h2>

              {modalType === 'project' ? (
                <form onSubmit={handleProjectSubmit}>
                  <div className="form-group"><label className="form-label">Title</label><input type="text" className="admin-input" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required /></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required /></div>
                  <div className="form-group"><label className="form-label">Image URL</label><input type="url" className="admin-input" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} placeholder="https://..." /></div>
                  <div className="form-group"><label className="form-label">Project URL</label><input type="url" className="admin-input" value={projectForm.url} onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })} placeholder="https://..." /></div>
                  <div className="form-group"><label className="form-label">Tags (comma separated)</label><input type="text" className="admin-input" value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} placeholder="React, Node.js" /></div>
                  <div className="form-group"><label className="form-label">Badge</label><input type="text" className="admin-input" value={projectForm.badge} onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })} /></div>
                  <div className="form-group"><label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} /><span className="form-label" style={{ margin: 0 }}>Featured</span></label></div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingItem ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleGallerySubmit}>
                  <div className="form-group"><label className="form-label">Title</label><input type="text" className="admin-input" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} required /></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={galleryForm.description} onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Image URL</label><input type="url" className="admin-input" value={galleryForm.image} onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })} placeholder="https://..." required /></div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="admin-input" value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}>
                      {getCategories().map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingItem ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pill Navbar at Bottom */}
      <nav style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(17, 17, 17, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-dark)',
        borderRadius: '9999px',
        padding: '0.5rem',
        display: 'flex',
        gap: '0.25rem',
        zIndex: 1000,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Tab buttons */}
        {[
          { id: 'projects', icon: '📁', label: 'Projects' },
          { id: 'gallery', icon: '🖼️', label: 'Gallery' },
          { id: 'settings', icon: '⚙️', label: 'Settings' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.625rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div style={{ width: '1px', background: 'var(--border-dark)', margin: '0.25rem 0.5rem' }}></div>

        {/* View Site */}
        <Link
          to="/"
          style={{
            padding: '0.625rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            background: 'transparent',
            color: 'var(--primary)',
            textDecoration: 'none',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          👁️ <span className="nav-label">View</span>
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            padding: '0.625rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            background: 'rgba(255, 0, 0, 0.15)',
            color: 'var(--accent-red)',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          🚪 <span className="nav-label">Logout</span>
        </button>
      </nav>

      {/* Mobile-only hide labels */}
      <style>{`
        @media (max-width: 640px) {
          .nav-label { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Admin;
