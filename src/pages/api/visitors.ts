import axios from 'axios'

interface Visitor {
  id: number
  name: string
  residenceNo: string
  dateVisit: string
  timeVisit: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Visitor[]>) {
  const swaggerUrl = 'YOUR_SWAGGER_URL' // Replace with your actual Swagger URL
  const endpoint = '/visitors' // Assuming your visitor data endpoint in Swagger

  try {
    const response = await axios.get<Visitor[]>(swaggerUrl + endpoint)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching visitor data' })
  }
}
