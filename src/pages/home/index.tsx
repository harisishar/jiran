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

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <AnalyticsCongratulations />
      </Grid>
      <Grid item xs={12} md={2}>
        <CardStatisticsVertical
          stats='$13.4k'
          color='error'
          trendNumber='-38%'
          title='Total Out Standing'
          chipText='Last Month'
          icon={<Icon icon='mdi:currency-usd' />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Bills 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2, textAlign: 'center' }}>All the best for your new project.</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/billing'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Visitors 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/visitors'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Complaints 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/complaints'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Annoucements 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/annoucements'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Residents 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
            <Button variant='contained' sx={{ mt: 3 }} href='/residents'>
              Click Here
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
