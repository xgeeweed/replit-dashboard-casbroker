import { Table } from '@tanstack/react-table';

interface FooterCellProps<TData> {
  table: Table<TData>;
}

export const FooterCell = <TData,>({ table }: FooterCellProps<TData>) => {
  const meta = table.options.meta as {
    removeSelectedRows: (indexes: number[]) => void;
    addRow: () => void;
  };
  
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    meta.removeSelectedRows(
      selectedRows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="footer-buttons">
      {selectedRows.length > 0 ? (
        <button className="remove-button" onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <button className="add-button" onClick={meta.addRow}>
        Add New +
      </button>
    </div>
  );
};
