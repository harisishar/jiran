import Cors from 'src/pages/apps/lib/cors'
import initMiddleware from './init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: 'http://localhost:3000' //  frontend domain
  })
)

export default cors
