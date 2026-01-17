// GitHub API Service
const GITHUB_API_BASE = 'https://api.github.com';

// GitHub username - Steaven Galang
const DEFAULT_USERNAME = 'steavengalang';

export const getGitHubUsername = () => {
    return localStorage.getItem('github_username') || DEFAULT_USERNAME;
};

export const setGitHubUsername = (username) => {
    localStorage.setItem('github_username', username);
};

// Fetch user profile
export const fetchGitHubProfile = async (username = getGitHubUsername()) => {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
        if (!response.ok) throw new Error('User not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        return null;
    }
};

// Fetch user repositories
export const fetchGitHubRepos = async (username = getGitHubUsername(), sort = 'updated') => {
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/users/${username}/repos?sort=${sort}&per_page=100`
        );
        if (!response.ok) throw new Error('Failed to fetch repos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
};

// Fetch repository languages
export const fetchRepoLanguages = async (username, repoName) => {
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`
        );
        if (!response.ok) throw new Error('Failed to fetch languages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching repo languages:', error);
        return {};
    }
};

// Calculate total language stats from all repos
export const calculateLanguageStats = async (repos) => {
    const languageTotals = {};

    for (const repo of repos.slice(0, 20)) {
        try {
            const languages = await fetchRepoLanguages(getGitHubUsername(), repo.name);
            for (const [lang, bytes] of Object.entries(languages)) {
                languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
            }
        } catch (error) {
            // Skip repos with errors
        }
    }

    const total = Object.values(languageTotals).reduce((a, b) => a + b, 0);
    const percentages = {};

    for (const [lang, bytes] of Object.entries(languageTotals)) {
        percentages[lang] = Math.round((bytes / total) * 100);
    }

    return Object.entries(percentages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6);
};

// Fetch contribution data
export const fetchContributionStats = async (username = getGitHubUsername()) => {
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`
        );
        if (!response.ok) throw new Error('Failed to fetch events');
        const events = await response.json();

        const contributions = {
            commits: 0,
            pullRequests: 0,
            issues: 0,
            reviews: 0,
        };

        events.forEach(event => {
            switch (event.type) {
                case 'PushEvent':
                    contributions.commits += event.payload?.commits?.length || 1;
                    break;
                case 'PullRequestEvent':
                    contributions.pullRequests++;
                    break;
                case 'IssuesEvent':
                    contributions.issues++;
                    break;
                case 'PullRequestReviewEvent':
                    contributions.reviews++;
                    break;
            }
        });

        return contributions;
    } catch (error) {
        console.error('Error fetching contribution stats:', error);
        return { commits: 0, pullRequests: 0, issues: 0, reviews: 0 };
    }
};

// Get starred repositories (most popular)
export const getStarredRepos = (repos) => {
    return [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);
};

// Get recently updated repos
export const getRecentRepos = (repos) => {
    return [...repos]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);
};

// Generate contribution grid data based on realistic patterns
export const generateContributionGrid = () => {
    const levels = [0, 1, 2, 3, 4];
    const weights = [0.25, 0.30, 0.20, 0.15, 0.10];

    const grid = [];
    for (let week = 0; week < 52; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
            let rand = Math.random();
            let level = 0;
            let cumulative = 0;
            for (let i = 0; i < weights.length; i++) {
                cumulative += weights[i];
                if (rand < cumulative) {
                    level = levels[i];
                    break;
                }
            }
            // More activity during weekdays
            if (day >= 1 && day <= 5 && Math.random() > 0.4) {
                level = Math.min(4, level + 1);
            }
            weekData.push(level);
        }
        grid.push(weekData);
    }
    return grid;
};

// Language color mapping
export const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'C++': '#f34b7d',
    C: '#555555',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    Swift: '#F05138',
    Vue: '#4FC08D',
};

export const getLanguageColor = (lang) => {
    return languageColors[lang] || '#00eeff';
};
