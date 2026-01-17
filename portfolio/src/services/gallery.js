// Gallery Service - Manage gallery items via localStorage

const GALLERY_KEY = 'portfolio_gallery';

const defaultGallery = [];

export const getGallery = () => {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return defaultGallery;
};

export const saveGallery = (items) => {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
};

export const addGalleryItem = (item) => {
    const items = getGallery();
    const newItem = {
        ...item,
        id: Date.now().toString(),
    };
    items.push(newItem);
    saveGallery(items);
    return newItem;
};

export const updateGalleryItem = (id, updates) => {
    const items = getGallery();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...updates };
        saveGallery(items);
        return items[index];
    }
    return null;
};

export const deleteGalleryItem = (id) => {
    const items = getGallery();
    const filtered = items.filter(item => item.id !== id);
    saveGallery(filtered);
    return filtered;
};

export const getCategories = () => {
    return ['Projects', 'Certificates', 'Documentation', 'Other'];
};
