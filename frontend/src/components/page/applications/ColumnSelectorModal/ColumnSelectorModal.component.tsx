import {
  useEffect,
  useRef,
} from 'react';
import { ModalContainer } from './ColumnSelectorModal.styles.ts';
import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';

type ComponentPropsT = {
  columns: ColumnT[];
  handleColumnVisibility: (id: string) => void;
  isModalVisible: boolean;
  toggleModal: () => void;
}

const ColumnSelectorModal = ({ columns, handleColumnVisibility, isModalVisible, toggleModal }: ComponentPropsT) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isModalVisible) {
      dialogRef.current?.close();
    }

    if (!dialogRef.current?.open && isModalVisible) {
      dialogRef.current?.showModal();
    }
  }, [isModalVisible]);

  return (
    <ModalContainer ref={dialogRef}>
      {columns.map((element) => {
        return (
          <article key={element.id}>
            <input
              type={'checkbox'}
              checked={element.isActive}
              disabled={element.isCoreColumn}
              onChange={() => handleColumnVisibility(element.id)}
            />
            {element.name}
          </article>
        );
      })}
      <button type={'button'} onClick={toggleModal}>close</button>
    </ModalContainer>
  );
};

export default ColumnSelectorModal;
