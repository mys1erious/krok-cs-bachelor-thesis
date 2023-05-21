import { create } from 'zustand';

interface BrandModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAdminBrandModal = create<BrandModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useAdminBrandModal;
