import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

interface AnnouncementDrawerProps {
  open: boolean
  toggle: () => void
}

const AnnouncementDrawer: React.FC<AnnouncementDrawerProps> = ({ open, toggle }) => {
  const [subject, setSubject] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!subject || !description) {
      setError('Subject and description are required')

      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    const url = `https://api.jiran.kimsformatics.com/Announcement/Add?providedAnnouncementSubject=${encodeURIComponent(
      subject
    )}&providedAnnouncementDescription=${encodeURIComponent(description)}`

    try {
      console.log(`Making request to: ${url}`) // Debugging log
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*'
        },
        body: '' // No data body needed for this request
      })

      console.log('Response:', response) // Debugging log

      if (response.ok) {
        setSuccess(true)
        setSubject('')
        setDescription('')
      } else {
        setError('Failed to publish announcement')
      }
    } catch (error) {
      console.error('Error publishing announcement:', error) // Debugging log
      setError('Error publishing announcement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer anchor='right' open={open} onClose={toggle} sx={{ '& .MuiDrawer-paper': { width: 400, padding: 2 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h6'>Compose Announcement</Typography>
        <TextField fullWidth label='Subject' value={subject} onChange={e => setSubject(e.target.value)} />
        <TextField
          fullWidth
          label='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        {error && <Typography color='error'>{error}</Typography>}
        {success && <Typography color='primary'>Announcement published successfully</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant='contained' onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Publish'}
          </Button>
          <Button variant='outlined' onClick={toggle} disabled={loading}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default AnnouncementDrawer
