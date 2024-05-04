// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import AnalyticsTotalRevenue from 'src/views/dashboards/analytics/AnalyticsTotalRevenue'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import AnalyticsVisitsByDay from 'src/views/dashboards/analytics/AnalyticsVisitsByDay'
import AnalyticsTotalComplaints from 'src/views/dashboards/analytics/AnalyticsTotalComplaints'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <CardStatisticsVertical
          stats='$13.4k'
          color='error'
          trendNumber='-38%'
          title='Total Out Standing'
          chipText='Last Month'
          icon={<Icon icon='mdi:currency-usd' />}
        />
        <br></br>
        <CardStatisticsVertical
          stats='115'
          color='error'
          trendNumber='+50%'
          title='Total Complaints'
          chipText='This Month'
          icon={<Icon icon='mdi:bullhorn' />}
        />
      </Grid>
      <Grid item xs={12} md={8} pb={4}>
        <AnalyticsVisitsByDay />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <Icon icon='' />
          <CardHeader title='Bills 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Check all user billing.</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/apps/invoice/list'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Visitors 🏘️'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>View all visitor details</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/visitors'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Complaints 📄'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Update all residents complaints</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/complaints'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Annoucements 📌'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Crate annoucements for residents</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/apps/email'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Users 🏠'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>View alll residents details and transaction</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/apps/user/list'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
