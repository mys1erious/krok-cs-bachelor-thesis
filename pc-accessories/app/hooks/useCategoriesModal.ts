import { create } from "zustand";


type CategoriesModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};


const useCategoriesModal = create<CategoriesModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));


export default useCategoriesModal;
