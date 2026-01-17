import { useState, useEffect } from 'react';
import {
    fetchGitHubProfile,
    fetchGitHubRepos,
    calculateLanguageStats,
    fetchContributionStats,
    getStarredRepos,
    generateContributionGrid,
    getGitHubUsername,
} from '../services/github';

export const useGitHub = () => {
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [starredRepos, setStarredRepos] = useState([]);
    const [languageStats, setLanguageStats] = useState([]);
    const [contributionStats, setContributionStats] = useState(null);
    const [contributionGrid, setContributionGrid] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const username = getGitHubUsername();

            // Fetch profile and repos in parallel
            const [profileData, reposData] = await Promise.all([
                fetchGitHubProfile(username),
                fetchGitHubRepos(username),
            ]);

            if (profileData) {
                setProfile(profileData);
            }

            if (reposData && reposData.length > 0) {
                setRepos(reposData);
                setStarredRepos(getStarredRepos(reposData));

                // Calculate language stats
                const langStats = await calculateLanguageStats(reposData);
                setLanguageStats(langStats);
            }

            // Fetch contribution stats
            const contribStats = await fetchContributionStats(username);
            setContributionStats(contribStats);

            // Generate contribution grid
            const grid = generateContributionGrid();
            setContributionGrid(grid);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        fetchData();
    };

    return {
        profile,
        repos,
        starredRepos,
        languageStats,
        contributionStats,
        contributionGrid,
        loading,
        error,
        refetch,
    };
};
