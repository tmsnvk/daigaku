type ComponentPropsT = {
  toggleModal: () => void;
}

const ColumnSelectorButton = ({ toggleModal }: ComponentPropsT) => {
  return (
    <button
      type={'button'}
      onClick={toggleModal}
    >
      Display
    </button>
  );
};

export default ColumnSelectorButton;
