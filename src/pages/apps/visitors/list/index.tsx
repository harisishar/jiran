import { useState, useEffect, MouseEvent, useCallback } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import CustomChip from 'src/@core/components/mui/chip'
import { getInitials } from 'src/@core/utils/get-initials'
import { deleteUser } from 'src/store/apps/user'
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

interface VisitorType {
  visitorName: string
  visitorMobileNo: string
  visitorQuantity: number
  visitorPurposeOfVisit: string
  visitorVehicle: string
  visitorVehiclePlate: string
  approvalStatus: string
  createdDate: string
}

interface CellType {
  row: VisitorType
}

const visitorStatusObj: { [key: string]: ThemeColor } = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error'
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'visitorName',
    headerName: 'Visitor Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.visitorName}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'visitorMobileNo',
    headerName: 'Mobile No',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.visitorMobileNo}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'visitorQuantity',
    headerName: 'Quantity',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.visitorQuantity}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'visitorPurposeOfVisit',
    headerName: 'Purpose of Visit',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.visitorPurposeOfVisit}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'visitorVehicle',
    headerName: 'Vehicle',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.visitorVehicle}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'visitorVehiclePlate',
    headerName: 'Vehicle Plate',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.visitorVehiclePlate}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'approvalStatus',
    headerName: 'Approval Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.approvalStatus}
          color={visitorStatusObj[row.approvalStatus]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 260,
    field: 'createdDate',
    headerName: 'Date',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.createdDate}
        </Typography>
      )
    }
  }
]

const VisitorList = ({ apiData }: { apiData: VisitorType[] }) => {
  const [filterValue, setFilterValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [filteredData, setFilteredData] = useState<VisitorType[]>(apiData)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  useEffect(() => {
    setFilteredData(
      apiData.filter(
        visitor =>
          visitor.visitorName.toLowerCase().includes(filterValue.toLowerCase()) &&
          (status === '' || visitor.approvalStatus === status)
      )
    )
  }, [filterValue, status, apiData])

  const handleFilter = useCallback((val: string) => {
    setFilterValue(val)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='approved'>Approved</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='rejected'>Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  fullWidth
                  value={filterValue}
                  onChange={e => handleFilter(e.target.value)}
                  label='Visitor Name'
                  placeholder='Search by visitor name'
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <DataGrid
            autoHeight
            rows={filteredData}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowId={row => row.visitorName} // Assuming visitorName is unique
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://api.jiran.kimsformatics.com/User/GetVisitor?unitUserID=1')
    const text = await res.text()

    // Attempt to parse JSON, or throw an error if it's not valid
    const apiData = JSON.parse(text)

    return {
      props: {
        apiData
      }
    }
  } catch (error) {
    console.error('Error fetching visitor data:', error)

    return {
      props: {
        apiData: [] // Return an empty array in case of error
      }
    }
  }
}

export default VisitorList
