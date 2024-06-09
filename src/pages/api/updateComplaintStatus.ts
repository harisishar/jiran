// pages/api/updateComplaintStatus.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'POST') {
    const { complaintId, status } = req.body
    const url = `https://api.jiran.kimsformatics.com/Complaint/UpdateComplaint?providedComplaintID=${complaintId}&providedStatus=${status}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        res.status(200).json({ message: 'Status updated successfully' })
      } else {
        res.status(response.status).json({ error: 'Failed to update status' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
