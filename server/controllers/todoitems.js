const TodoItem = require("../models").TodoItem;

module.exports = {
  create(req, res){
    console.log(req.body);
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then( todoItem => res.status(200).send(todoItem))
      .catch(error => res.status(400).send(error))
  },

  update(req, res){
    return TodoItem
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
    return TodoItem
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
