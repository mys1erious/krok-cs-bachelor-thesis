import { create } from "zustand";


type FilterNavbarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};


const useFilterNavbar = create<FilterNavbarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));


export default useFilterNavbar;
