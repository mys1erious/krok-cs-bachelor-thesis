import { create } from 'zustand';

interface CategoryModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAdminCategoryModal = create<CategoryModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useAdminCategoryModal;
