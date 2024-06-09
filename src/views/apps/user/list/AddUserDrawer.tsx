import { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'

interface RoleType {
  roleId: string
  roleName: string
}

interface FloorType {
  floorId: string
  floorName: string
}

interface BlockType {
  blockId: string
  blockName: string
}

interface AddUserDrawerProps {
  open: boolean
  toggle: () => void
}

interface UserData {
  providedUserLogin: string
  providedPassword: string
  providedName: string
  providedNric: string
  providedUnitNumberId: string
  providedMobileNo: string
  providedUnitNo: string
  providedRoleId: string
  providedFloorID: string
  providedBlockID: string
}

const schema = yup.object().shape({
  providedUserLogin: yup.string().required('User Login is required'),
  providedPassword: yup.string().required('Password is required'),
  providedName: yup.string().required('Full Name is required'),
  providedNric: yup.string().required('NRIC is required'),
  providedUnitNumberId: yup.string().required('Unit Number ID is required'),
  providedMobileNo: yup.string().required('Mobile Number is required'),
  providedUnitNo: yup.string().required('Unit Number is required'),
  providedRoleId: yup.string().required('Role is required'),
  providedFloorID: yup.string().required('Floor is required'),
  providedBlockID: yup.string().required('Block is required')
})

const defaultValues = {
  providedUserLogin: '',
  providedPassword: '',
  providedName: '',
  providedNric: '',
  providedUnitNumberId: '',
  providedMobileNo: '',
  providedUnitNo: '',
  providedRoleId: '',
  providedFloorID: '',
  providedBlockID: ''
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const AddUserDrawer: React.FC<AddUserDrawerProps> = ({ open, toggle }) => {
  const [roles, setRoles] = useState<RoleType[]>([])
  const [floors, setFloors] = useState<FloorType[]>([])
  const [blocks, setBlocks] = useState<BlockType[]>([])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    fetch('https://api.jiran.kimsformatics.com/User/GetAllUser?systemID=1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        return response.json()
      })
      .then(data => {
        setRoles(data)
        setFloors(data) // Assuming the data contains floors as well
        setBlocks(data) // Assuming the data contains blocks as well
      })
      .catch(error => console.error('Failed to fetch data:', error))
  }, [])

  const onSubmit = async (data: UserData) => {
    const url = `https://api.jiran.kimsformatics.com/User/Register?${new URLSearchParams(data as any).toString()}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        console.log('User registered successfully')
        toggle()
        reset()
      } else {
        console.error('Failed to register user')
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer anchor='right' open={open} onClose={handleClose} sx={{ '& .MuiDrawer-paper': { width: 300 } }}>
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedUserLogin'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='User Login'
                  placeholder='User Login'
                  error={Boolean(errors.providedUserLogin)}
                />
              )}
            />
            {errors.providedUserLogin && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedUserLogin.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedPassword'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='password'
                  label='Password'
                  placeholder='Password'
                  error={Boolean(errors.providedPassword)}
                />
              )}
            />
            {errors.providedPassword && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedPassword.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedName'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Full Name' placeholder='Full Name' error={Boolean(errors.providedName)} />
              )}
            />
            {errors.providedName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedNric'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='NRIC' placeholder='NRIC' error={Boolean(errors.providedNric)} />
              )}
            />
            {errors.providedNric && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedNric.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedUnitNumberId'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Unit Number ID'
                  placeholder='Unit Number ID'
                  error={Boolean(errors.providedUnitNumberId)}
                />
              )}
            />
            {errors.providedUnitNumberId && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedUnitNumberId.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedMobileNo'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Mobile Number'
                  placeholder='Mobile Number'
                  error={Boolean(errors.providedMobileNo)}
                />
              )}
            />
            {errors.providedMobileNo && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedMobileNo.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='providedUnitNo'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Unit Number'
                  placeholder='Unit Number'
                  error={Boolean(errors.providedUnitNo)}
                />
              )}
            />
            {errors.providedUnitNo && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedUnitNo.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel>Role</InputLabel>
            <Controller
              name='providedRoleId'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Role' error={Boolean(errors.providedRoleId)}>
                  {roles.map(role => (
                    <MenuItem key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.providedRoleId && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedRoleId.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel>Floor</InputLabel>
            <Controller
              name='providedFloorID'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Floor' error={Boolean(errors.providedFloorID)}>
                  {floors.map(floor => (
                    <MenuItem key={floor.floorId} value={floor.floorId}>
                      {floor.floorName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.providedFloorID && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedFloorID.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel>Block</InputLabel>
            <Controller
              name='providedBlockID'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Block' error={Boolean(errors.providedBlockID)}>
                  {blocks.map(block => (
                    <MenuItem key={block.blockId} value={block.blockId}>
                      {block.blockName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.providedBlockID && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.providedBlockID.message}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddUserDrawer
