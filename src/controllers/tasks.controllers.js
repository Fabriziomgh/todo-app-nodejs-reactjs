import Tasks from '../models/tasks.models.js';

export const getAllTasks = async (req, res) => {
   try {
      const { payload: id } = req.user;
      const tasks = await Tasks.find({
         user: id,
      }).populate('user');

      res.json(tasks);
   } catch (error) {
      return res.status(400).json({
         message: error.message,
      });
   }
};
export const getTask = async (req, res) => {
   try {
      const { payload: id } = req.user;
      const task = await Tasks.findOne({
         _id: req.params.id,
         user: id,
      }).populate('user');
      if (!task) return res.status(404).json({ message: 'Task not found.' });
      res.json(task);
   } catch (error) {
      return res.status(400).json({
         message: error.message,
      });
   }
};
export const createdTask = async (req, res) => {
   try {
      const { title, description, date } = req.body;
      const { payload: id } = req.user;
      const newTask = new Tasks({
         title,
         description,
         date,
         user: id,
      });
      const taskSaved = await newTask.save();
      res.json(taskSaved);
   } catch (error) {
      return res.status(400).json({
         message: error.message,
      });
   }
};
export const updateTask = async (req, res) => {
   try {
      const { title, description, date } = req.body;
      const taskUpdated = await Tasks.findOneAndUpdate(
         { _id: req.params.id },
         { title, description, date },
         { new: true }
      );
      if (!taskUpdated)
         return res.status(404).json({ message: 'Task not found.' });
      res.json(taskUpdated);
   } catch (error) {
      return res.status(400).json({
         message: error.message,
      });
   }
};

export const deleteTask = async (req, res) => {
   try {
      const { payload: id } = req.user;
      const task = await Tasks.findByIdAndDelete({
         _id: req.params.id,
         user: id,
      });
      if (!task) return res.status(404).json({ message: 'Task not found.' });
      res.sendStatus(204);
   } catch (error) {
      return res.status(400).json({
         message: error.message,
      });
   }
};
