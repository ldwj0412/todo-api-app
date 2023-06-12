//contain all the CRUD callback operations for TODOs.
const Todo = require('../models/Todo');

//create a todo
exports.createTodo = async (req, res,next) => {
    try {
        // console.log('req.user:', req.user);
         //console.log('req.body.username:', req.body.username);
        const newTodo = new Todo({
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status,
            user: req.user.username, 
            priority: req.body.priority, 
            tags: req.body.tags 
        });

        

        const todo = await newTodo.save();
        return res.status(201).json(todo);

    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        next(err);
        //next(new Error('Failed to create the todo'));
    }
};

// get all todos
exports.getTodos = async (req, res,next) => {
   
    try {

         console.log("req.user.username: "+ req.user.username);
        // console.log("req.user._id: "+ req.user.userId);
        const filters = { user: req.user.username };
        if (req.query.name) filters.name = req.query.name;
        if (req.query.dueDate) filters.dueDate = req.query.dueDate;
        if (req.query.status) filters.status = req.query.status;
        if (req.query.priority) filters.priority = req.query.priority;
        if (req.query.tags) filters.tags = { $in: req.query.tags.split(',') };

        // Creating a query with filters
        let query = Todo.find(filters);

        // Checking if sortBy query parameter exists, and if it does, sorting the query
        if (req.query.sortBy) {
            const sortFields = req.query.sortBy.split(',').join(' ');
            query = query.sort(sortFields);
        }

        // if (req.query.sortBy) {
        //     const sortFields = req.query.sortBy.split(',');
          
        //     // Build the sort object based on the provided sort fields
        //     const sortObject = {};
        //     sortFields.forEach((field) => {
        //       const sortOrder = field.startsWith('-') ? -1 : 1;
        //       const fieldName = field.replace(/^-/, ''); // Remove the '-' sign for descending order
        //       sortObject[fieldName] = sortOrder;
        //     });
          
        //     // Apply the sort object to the query
        //     query = query.sort(sortObject);
        //   }
        

        // Executing the query
        const todos = await query.exec();

        return res.status(200).json(todos);

    } catch (err) {
        next(new Error('Failed to fetch all todos'));
    }
};


// update a todo
exports.updateTodo = async (req, res,next) => {
   
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.username }, // update todo only if it belongs to the user
            req.body,
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json(updatedTodo);
        
    } catch (err) {
        next(new Error('Failed to update the todo'));
    }
};

// delete a todo 
exports.deleteTodo = async (req, res,next) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.username }); // delete todo only if it belongs to the user
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: 'Todo successfully deleted' });

    } catch (err) {
        next(new Error('Failed to delete the todo'));
    }
};


