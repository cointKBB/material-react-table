import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface CustomTableViewProps<T extends Record<string, any>> {
  tableColumns: MRT_ColumnDef<T>[];
  tableData: T[];
  selectedRow: T | null;
  setSelectedRow: (row: T | null) => void;
  handleExport: () => void;
}

export function CustomTableView<T extends Record<string, any>>({
  tableColumns,
  tableData,
  selectedRow,
  setSelectedRow,
  handleExport,
}: CustomTableViewProps<T>) {
  return (
    <>
      <MaterialReactTable
        columns={tableColumns}
        data={tableData}
        enableRowSelection
        enableStickyHeader
        enableStickyFooter={false}
        enableColumnResizing
        enableRowOrdering
        enableColumnOrdering
        renderTopToolbarCustomActions={() => (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            엑셀 다운로드
          </Button>
        )}
        muiTableContainerProps={{
          sx: { maxHeight: 500 },
        }}
        initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRow(row.original),
          sx: { cursor: 'pointer' },
        })}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            borderLeft: '1px solid #f0f0f0',
            borderRight: '1px solid #f0f0f0',
            '& .MuiTableHeadCell-resizer': {
              width: 4,
              minWidth: 4,
              right: -2,
              background: '#bdbdbd',
              opacity: 0.5,
              borderRadius: 2,
              transition: 'background 0.2s',
              '&:hover': {
                background: '#757575',
                opacity: 1,
              },
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            borderBottom: '1px solid #f0f0f0',
            borderLeft: '1px solid #f0f0f0',
            borderRight: '1px solid #f0f0f0',
          },
        }}
      />

      {/* 행 클릭 시 모달 상세보기 */}
      <Dialog open={!!selectedRow} onClose={() => setSelectedRow(null)}>
        <DialogTitle>상세보기</DialogTitle>
        <DialogContent>
          {selectedRow &&
            Object.entries(selectedRow).map(([key, value]) => (
              <Typography key={key} variant="body2">
                <b>{key}:</b> {String(value)}
              </Typography>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRow(null)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}