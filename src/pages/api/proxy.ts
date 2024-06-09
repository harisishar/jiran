// pages/api/proxy.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'POST') {
    const { announcementID } = req.body
    const url = `https://api.jiran.kimsformatics.com/Announcement/Delete?announcementID=${announcementID}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        res.status(200).json({ message: 'Announcement deleted successfully' })
      } else {
        res.status(response.status).json({ error: 'Failed to delete announcement' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
