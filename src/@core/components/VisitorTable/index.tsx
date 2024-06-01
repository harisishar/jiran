import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

interface Visitor {
  id: number
  name: string
  residenceNo: string
  dateVisit: string
  timeVisit: string
}

const StyledTable = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))

const VisitorTable: React.FC<{ visitors: Visitor[] }> = ({ visitors }) => {
  return (
    <StyledTable component={Paper}>
      <Table aria-label='visitor table'>
        <TableHead>
          <TableRow>
            <TableCell>Visitor Name</TableCell>
            <TableCell>Residence No.</TableCell>
            <TableCell>Date Visit</TableCell>
            <TableCell>Time Visit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.map(visitor => (
            <TableRow key={visitor.id}>
              <TableCell component='th' scope='row'>
                {visitor.name}
              </TableCell>
              <TableCell>{visitor.residenceNo}</TableCell>
              <TableCell>{visitor.dateVisit}</TableCell>
              <TableCell>{visitor.timeVisit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTable>
  )
}

export default VisitorTable
