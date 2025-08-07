import { useEffect, useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { CustomTableView } from './CustomTableView';
import { useExcelExport } from '../utils/useExcelExport';

export interface CustomTableProps<T extends Record<string, any>> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
}

/* 재사용 가능한 테이블 */
export function CustomTable<T extends Record<string, any>>({
  data,
  columns,
}: CustomTableProps<T>) {
  // 상세 모달 상태
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  // 행 순서 상태
  const [tableData, setTableData] = useState<T[]>(data);

  // data prop이 바뀌면 tableData도 동기화
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const exportToExcel = useExcelExport<T>();

  // 엑셀 다운로드
  const handleExport = () => {
    exportToExcel(data);
  };

  const tableColumns = useMemo<MRT_ColumnDef<T>[]>
  (
    () =>
      columns.map((col) => ({
        ...col,
        header: col.header ?? String(col.accessorKey),
        enableResizing: true,
      })),
    [columns]
  );

  return (
    <CustomTableView
      tableColumns={tableColumns}
      tableData={tableData}
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      handleExport={handleExport}
    />
  );
}
