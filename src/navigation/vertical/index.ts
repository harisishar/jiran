// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '',
      badgeContent: 'new',
      badgeColor: 'error',
      icon: 'mdi:home-outline',
      children: [
        {
          title: 'Dashboard',
          path: '/pages/home'
        }
      ]
    },
    {
      title: 'Billing',
      icon: 'mdi:file-document-outline',
      path: '/apps/invoice/list'
    },
    {
      title: 'Visitors',
      path: '/apps/visitors/list',
      icon: 'pepicons-pencil:people'
    },
    {
      title: 'Complaints',
      path: '/apps/complaints/',
      icon: 'mingcute:report-fill'
    },

    {
      title: 'Annoucements',
      icon: 'mdi:bullhorn',
      path: '/apps/annoucements/'
    },
    {
      title: 'Users',
      icon: 'fluent:people-queue-24-regular',
      path: '/apps/user-api/'
    }
  ]
}

export default navigation
