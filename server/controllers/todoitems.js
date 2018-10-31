const models = require("../models")
const {TodoItem, Todo} = models;
const BaseTodo = models.Todo

const assignSchema = async (req) =>{
  let todoId = req.params.todoId;
  let todoSchema = await Todo.findById(todoId);
  todoSchema = todoSchema.title;
  return todoSchema;
}
module.exports = {
  async create(req, res){
    console.log(req.body);
    let todoSchema = await assignSchema(req);
    let todoItem = await TodoItem.schema(todoSchema)
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
    console.log("todoItem", todoItem);
    res.status(200).send(todoItem);
  },

  update(req, res){
    let todoSchema = await assignSchema(req);
    return TodoItem.schema(todoSchema)
    .findById(req.params.id)
    .then(item => {
      if(!item) return res.status(404).send("not found!!")

       item.update({
        complete: req.body.complete || item.complete,
        content: req.body.content || item.content
      }).then(item => {
        res.status(200).send(item)
      })
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))
  },

  delete(req, res){
    let todoSchema = await assignSchema(req);
    return TodoItem
    .schema(todoSchema)
    .findById(req.params.id)
    .then(item => {
      if(!item) return res.status(404).send("not found!!")
      return item
      .destroy()
      .then(item => {
        res.status(200).send(item)
      })
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))
  }

  // index(req, res){
  //   return TodoItem
  // }
}
