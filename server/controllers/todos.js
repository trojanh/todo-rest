const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {

  create(req, res){
    console.log(req.body);
    return Todo
      .create({
        title: req.body.title
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error))
  },

  index(req, res){
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error))
  },

  show(req, res){
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todo => {
        console.log(todo);
        return todo ? res.status(200).send(todo) : res.status(404).send("Todo Not Found!!!")
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error)
      })
  },

  update(req, res){
    return Todo.update({
      title: req.body.title,
    }, {
      where: {
        id: req.params.todoId
      }
    })
    .then(todo => {
      todo ? res.status(200).send(todo) : res.status(404).send("Not found !!!!!!")
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send(error)
    })
  },

  delete(req, res){

    return Todo.findById(req.params.todoId)
    .then( todo =>{
      console.log(todo);
      if(!todo) return res.status(404).send("Not found!!!!");
      return Todo.destroy({
          where: {
            id: todo.id
          }
        }).then(todo => todo)
        .catch(error => {
          console.log(error);
          return res.status(400).send(error)
        })

    })
    .catch(error => {
      console.log(error);
      return res.status(400).send(error)
    })
  }

}
