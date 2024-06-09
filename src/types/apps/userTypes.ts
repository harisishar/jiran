// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { string } from 'yup'

export type UsersType = {
  id: number
  email: string
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
  name: string
  mobileNo: string
  areaName: string
  address: string
  floorName: string
  blockName: string
  userLogin: string
  roleName: string
  nric: string
  floor: {
    floorName: string
  }
  role: string
  system: string
  visitorName: string
  visitorId: number;
  visitorMobileNo: string;
  visitorNRIC: string | null;
  visitorQuantity: number;
  visitorPurposeOfVisit: string;
  visitorVehicleType: number;
  visitorVehicle: string | null;
  visitorVehiclePlate: string;
  approvalStatus: string;
  unitNumber: {
    unitNumberId: number;
    userId: number;
    unitNumber: string;
    blockId: number;
    floorId: number;
    createdById: number;
    createdDate: string;
    block: {
      blockId: number;
      blockName: string; }
}


export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
