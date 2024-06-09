import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { GetServerSideProps } from 'next'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface ComplaintType {
  userId: string
  complaintCategoryId: string
  complaintLocation: string
  complaintSubject: string
  complaintDescription: string
  status: string
  complaintId: string
  userName?: string
  categoryName?: string
}

const statusOptions = [
  { label: 'Pending', value: 'P' },
  { label: 'Handling', value: 'H' },
  { label: 'Complete', value: 'C' }
]

const ComplaintList = ({ apiData }: { apiData: ComplaintType[] }) => {
  const [filterValue, setFilterValue] = useState<string>('')
  const [filteredData, setFilteredData] = useState<ComplaintType[]>(apiData)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  useEffect(() => {
    setFilteredData(
      apiData.filter(complaint => complaint.complaintSubject.toLowerCase().includes(filterValue.toLowerCase()))
    )
  }, [filterValue, apiData])

  const handleFilter = useCallback((val: string) => {
    setFilterValue(val)
  }, [])

  const handleChangeStatus = async (event: SelectChangeEvent, row: ComplaintType) => {
    const newStatus = event.target.value

    try {
      const response = await fetch(`/api/updateComplaintStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          complaintId: row.complaintId,
          status: newStatus
        })
      })

      if (response.ok) {
        setFilteredData(prevData =>
          prevData.map(complaint =>
            complaint.complaintId === row.complaintId ? { ...complaint, status: newStatus } : complaint
          )
        )
        console.log(`Status updated to ${newStatus} for complaint ID ${row.complaintId}`)
      } else {
        console.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 150,
      field: 'userName',
      headerName: 'User Name',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.userName}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'categoryName',
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.categoryName}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'complaintLocation',
      headerName: 'Location',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.complaintLocation}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'complaintSubject',
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.complaintSubject}
          </Typography>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 300,
      field: 'complaintDescription',
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.complaintDescription}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <FormControl fullWidth>
            <Select
              value={row.status}
              onChange={e => handleChangeStatus(e, row)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {statusOptions.map(status => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <TextField
                  fullWidth
                  value={filterValue}
                  onChange={e => handleFilter(e.target.value)}
                  label='Complaint Subject'
                  placeholder='Search by complaint subject'
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
            getRowId={row => row.complaintId} // Ensure uniqueness
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetching complaints
    const complaintsRes = await fetch('https://api.jiran.kimsformatics.com/Complaint/GetComplaint?systemID=1')
    const complaintsData: ComplaintType[] = await complaintsRes.json()

    // Fetching users
    const usersRes = await fetch('https://api.jiran.kimsformatics.com/User/GetAllUser?systemID=1')
    const usersData: UserType[] = await usersRes.json()

    // Fetching categories
    const categoriesRes = await fetch('https://api.jiran.kimsformatics.com/Complaint/GetComplaintCategory')
    const categoriesData: CategoryType[] = await categoriesRes.json()

    // Mapping userId and complaintCategoryId to userName and categoryName
    const apiData = complaintsData.map(complaint => ({
      ...complaint,
      userName: usersData.find(user => user.userId === complaint.userId)?.name || 'Unknown',
      categoryName:
        categoriesData.find(category => category.complaintCategoryId === complaint.complaintCategoryId)?.categoryName ||
        'Unknown'
    }))

    return {
      props: {
        apiData
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        apiData: [] // Return an empty array in case of error
      }
    }
  }
}

export default ComplaintList
