const todosController = require('../controllers/todos');
const todoitemsController =require('../controllers/todoitems');

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: "asdasdsdas hello world",

  }));

  app.post('/api/todos', todosController.create)
  app.get('/api/todos', todosController.index)
  app.get('/api/todos/:todoId', todosController.show)
  app.put('/api/todos/:todoId', todosController.update)
  app.delete('/api/todos/:todoId', todosController.delete)

  app.post('/api/todos/:todoId/items', todoitemsController.create)
}
