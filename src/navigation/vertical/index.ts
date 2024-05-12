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
      children: [
        {
          title: 'List',
          path: '/apps/invoice/list'
        },
        {
          title: 'Preview',
          path: '/apps/invoice/preview'
        },
        {
          title: 'Edit',
          path: '/apps/invoice/edit'
        },
        {
          title: 'Add',
          path: '/apps/invoice/add'
        }
      ]
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
      icon: 'mdi:bullhorn',
      path: '/apps/email'
    },
    {
      title: 'Users',
      icon: 'fluent:people-queue-24-regular',
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        },
        {
          title: 'View',
          children: [
            {
              title: 'Overview',
              path: '/apps/user/view/overview'
            },

            {
              title: 'Billing',
              path: '/apps/user/view/billing-plan'
            }
          ]
        }
      ]
    }
  ]
}

export default navigation
