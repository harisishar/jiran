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
import AnnouncementDrawer from './AnnouncementDrawer'

interface AnnouncementType {
  createdDate: string
  announcementSubject: string
  announcementDescription: string
  announcementId: string
}

const AnnouncementList = ({ apiData }: { apiData: AnnouncementType[] }) => {
  const [filterValue, setFilterValue] = useState<string>('')
  const [filteredData, setFilteredData] = useState<AnnouncementType[]>(apiData)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  useEffect(() => {
    setFilteredData(
      apiData.filter(announcement => announcement.announcementSubject.toLowerCase().includes(filterValue.toLowerCase()))
    )
  }, [filterValue, apiData])

  const handleFilter = useCallback((val: string) => {
    setFilterValue(val)
  }, [])

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const handleDelete = async (id: string) => {
    const url = `/api/proxy`
    try {
      console.log(`Deleting announcement with ID: ${id}`)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ announcementID: id })
      })
      if (response.ok) {
        console.log(`Announcement with ID: ${id} deleted successfully`)
        setFilteredData(prevData => prevData.filter(announcement => announcement.announcementId !== id))
      } else {
        console.error(`Failed to delete announcement with ID: ${id}`, response)
      }
    } catch (error) {
      console.error(`Error deleting announcement with ID: ${id}`, error)
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 150,
      field: 'createdDate',
      headerName: 'Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {new Date(row.createdDate).toLocaleDateString()}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'announcementSubject',
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.announcementSubject}
          </Typography>
        )
      }
    },
    {
      flex: 0.5,
      minWidth: 400,
      field: 'announcementDescription',
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.announcementDescription}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        return (
          <Button onClick={() => handleDelete(row.announcementId)} color='secondary'>
            Delete
          </Button>
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
                  label='Announcement Subject'
                  placeholder='Search by announcement subject'
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <Typography variant='h6'>Announcement List</Typography>
            <Button variant='contained' onClick={toggleDrawer}>
              Compose Announcement
            </Button>
          </Box>
          <DataGrid
            autoHeight
            rows={filteredData}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowId={row => row.announcementId}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      <AnnouncementDrawer open={drawerOpen} toggle={toggleDrawer} />
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://api.jiran.kimsformatics.com/Announcement/Get')
    const apiData: AnnouncementType[] = await res.json()

    return {
      props: {
        apiData
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        apiData: []
      }
    }
  }
}

export default AnnouncementList
