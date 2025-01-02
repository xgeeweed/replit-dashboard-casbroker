"use client";

import { useEffect, useState } from "react";

interface Props {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}

const TableCell = ({ getValue, row, column, table }: Props) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return <input value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} className="w-full" />;
};

export default TableCell;
