import {
    Router
} from 'express';

const router = Router();
import sensorController from '../controllers/sensorData.controller';

// router.use('/material-types', materialTypesRoutes);

router.get('/sensorData', sensorController.get);

module.exports = router;