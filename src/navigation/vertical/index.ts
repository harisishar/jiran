// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Billing',
      path: '/billing',
      icon: 'mdi:email-outline'
    },
    {
      title: 'Visitors',
      path: '/visitors',
      icon: 'pepicons-pencil:people'
    },
    {
      title: 'Complaints',
      path: '/complaints',
      icon: 'mingcute:report-fill'
    },
    {
      title: 'Annoucements',
      path: '/annoucements',
      icon: 'mdi:bullhorn'
    },
    {
      title: 'Residents',
      path: '/residents',
      icon: 'fluent:people-queue-24-regular'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation
