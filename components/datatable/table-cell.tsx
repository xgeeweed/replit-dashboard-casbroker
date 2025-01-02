import { useState, useEffect, ChangeEvent } from "react";
import { Column, Row, Table } from "@tanstack/react-table";
import "./table.css";

type Option = {
  label: string;
  value: string;
};

interface TableCellProps<TData> {
  getValue: () => any;
  row: Row<TData>;
  column: Column<TData, unknown>;
  table: Table<TData>;
}

export const TableCell = <TData,>({ getValue, row, column, table }: TableCellProps<TData>) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta as {
    type?: string;
    required?: boolean;
    pattern?: string;
    options?: Option[];
    validate?: (value: string) => boolean;
    validationMessage?: string;
  };
  const tableMeta = table.options.meta as {
    updateData: (rowIndex: number, columnId: string, value: any, isValid: boolean) => void;
    editedRows: Record<string, boolean>;
  };

  const [value, setValue] = useState(initialValue);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    displayValidationMessage(e);
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value, e.target.validity.valid);
  };

  const displayValidationMessage = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => {
    if (columnMeta?.validate) {
      const isValid = columnMeta.validate(e.target.value);
      if (isValid) {
        e.target.setCustomValidity("");
        setValidationMessage("");
      } else {
        e.target.setCustomValidity(columnMeta.validationMessage || "");
        setValidationMessage(columnMeta.validationMessage || "");
      }
    } else if (e.target.validity.valid) {
      setValidationMessage("");
    } else {
      setValidationMessage(e.target.validationMessage);
    }
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        onChange={onSelectChange}
        value={initialValue}
        required={columnMeta?.required}
        title={validationMessage}
      >
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        required={columnMeta?.required}
        pattern={columnMeta?.pattern}
        title={validationMessage}
      />
    );
  }
  return <span>{value}</span>;
};
