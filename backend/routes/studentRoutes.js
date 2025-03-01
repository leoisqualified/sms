import express from express;
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "../controllers/studentController";


const router = express.Router();

router.post('/', createStudent);
router.get('/', getAllStudents);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/:id', getStudentById);

export default router;
