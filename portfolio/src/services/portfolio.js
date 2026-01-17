// Portfolio data management
const PROJECTS_KEY = 'portfolio_projects';
const GITHUB_KEY = 'portfolio_github_username';

// Default projects data with real screenshots
const defaultProjects = [
    {
        id: '1',
        title: 'jualplastik.co.id',
        description: 'Full-stack e-commerce platform untuk PT Karya Unggul Plastic Products. Dibangun dengan Nuxt.js, MySQL, dan integrasi payment gateway. SEO optimized dengan blog system.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&q=80',
        url: 'https://jualplastik.co.id',
        tags: ['Nuxt.js', 'MySQL', 'TailwindCSS'],
        badge: 'LIVE_SITE',
        featured: true,
    },
    {
        id: '2',
        title: 'welcometo.yttasmp.my.id',
        description: 'Modern website untuk Minecraft server YTTA SMP. Features server info, team showcase, community hub, dan dynamic player stats dengan custom design system.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&q=80',
        url: 'https://welcometo.yttasmp.my.id',
        tags: ['React', 'Vite', 'Custom CSS'],
        badge: 'GAMING',
        featured: true,
    },
];

// Get projects from localStorage or return defaults
export const getProjects = () => {
    try {
        const stored = localStorage.getItem(PROJECTS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
        return defaultProjects;
    } catch (error) {
        console.error('Error getting projects:', error);
        return defaultProjects;
    }
};

// Save projects to localStorage
export const saveProjects = (projects) => {
    try {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        return true;
    } catch (error) {
        console.error('Error saving projects:', error);
        return false;
    }
};

// Add a new project
export const addProject = (project) => {
    const projects = getProjects();
    const newProject = {
        ...project,
        id: Date.now().toString(),
    };
    projects.push(newProject);
    saveProjects(projects);
    return newProject;
};

// Update an existing project
export const updateProject = (id, updates) => {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updates };
        saveProjects(projects);
        return projects[index];
    }
    return null;
};

// Delete a project
export const deleteProject = (id) => {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id !== id);
    saveProjects(filtered);
    return true;
};

// Get featured projects
export const getFeaturedProjects = () => {
    return getProjects().filter(p => p.featured);
};

// GitHub username management
export const getGitHubConfig = () => {
    return localStorage.getItem(GITHUB_KEY) || 'steavengalang';
};

export const setGitHubConfig = (username) => {
    localStorage.setItem(GITHUB_KEY, username);
};
