import { Router } from 'express';
import { validateEventInput } from '../middleware/validation';
import { createEvent } from '../controllers/events';
import { isAuthenticated } from '../middleware/auth';
import { isOrganizer } from '../middleware/roles';

const router = Router();

// Public routes - tidak memerlukan authentication
router.get('/', (req, res) => {
  res.json({ message: 'Events list endpoint' });
});

// Protected routes - memerlukan authentication
router.use(isAuthenticated);

// Routes untuk organizer
router.post('/', isOrganizer, validateEventInput, createEvent);

export default router;