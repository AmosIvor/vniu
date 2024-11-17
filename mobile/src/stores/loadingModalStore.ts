import {create} from 'zustand';

type TLoadingModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
export const useLoadingModalVisible = create<TLoadingModalState>(set => ({
  isOpen: false,
  openModal: () => set({isOpen: true}),
  closeModal: () => set({isOpen: false}),
}));

export const useIsOpenLoadingModalSelected = () =>
  useLoadingModalVisible(state => state.isOpen);
