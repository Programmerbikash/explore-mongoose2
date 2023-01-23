const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todo.schema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", (req, res) => {
   Todo.find({ status: "active" })
    .select({
      _id: 0,
      data: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Todo was find successfully!",
        });
      }
    });
});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id });
        res.status(200).json({
            result: data,
            message: "Todo was find successfully!",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
    // await Todo.findOne({ _id: req.params.id }, (err, data) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: "There was a server side error!",
    //         });
    //     } else {
    //         res.status(200).json({
    //             result: data,
    //             message: "Todo was find successfully!",
    //         });
    //     }
    // });
});

// POST A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  // console.log(newTodo)
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

// POST MULTIPLE TODOS
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server error!",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully!",
      });
    }
  });
});

// PUT TODO
router.put("/:id", async (req, res) => {
  // await Todo.findByIdAndUpdate()
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server error!",
        });
      } else {
        res.status(200).json({
          message: "Todos were inserted successfully!",
        });
      }
    }
  );
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Todo was deleted successfully!",
            });
        }
    });
});

module.exports = router;
