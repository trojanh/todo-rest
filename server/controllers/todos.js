const models = require("../models");
const {Todo, TodoItem} = models;
const {sequelize } = models;
const assignSchema = async (req) => {
  let todoId = req.params.todoId;
  let todoSchema = await Todo.findById(todoId);
  todoSchema = todoSchema.title;
  return todoSchema;
}
module.exports = {

  create(req, res){
    console.log(req.body);
    return Todo
      .findOrCreate({
        where: {
          title: req.body.title
        }
      })
      .spread( (user, created) => {
        if (created) {
          let x = createSchema1(req, res).then(val => (val)); // function
          res.status(200).send(x)
        } else {
          res.status(400).send(`${req.body.title} already exists.`);
        }
       })
      // .catch(error => res.status(400).send(error))
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
const createSchema1 = async (req, res) => {
  console.log(req.body)
  console.log(sequelize.createSchema)
      return await sequelize.createSchema(req.body.title).then(async () => {
        await ["Todo", "TodoItem"].forEach((currentItem) => {
          console.log("currentItem", currentItem)
          models[currentItem].schema(req.body.title).sync();
        });
        const ToDoDetail = {
          title: req.body.title,
        };
        const todoSchema = Todo.schema(req.body.title);
        todoSchema.create(ToDoDetail)
          .then((loginData) => {
            res.status(200).send(loginData);
          })
          .catch((err) => {
            console.log('error :', err.message);
          });
      });
}
