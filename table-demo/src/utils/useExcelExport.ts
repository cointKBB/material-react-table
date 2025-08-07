import * as XLSX from 'xlsx';

export function useExcelExport<T>() {
  const exportToExcel = (data: T[], fileName = 'table-data.xlsx', sheetName = 'Data') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
  };
  return exportToExcel;
}