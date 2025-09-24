import e from "express";
import { prismaClient } from "@repo/db/client";
const app = e();
app.use(e.json());
app.get("/getTodos", async (req, res) => {
  const todos = await prismaClient.todo.findMany({
    select: {
      task: true,
      status: true,
      user: {
        select: { username: true },
      },
    },
  });
  return res.status(200).json({ todos: todos });
});
app.get("/getTodos/:id", async (req, res) => {
  const id = req.params.id;
  const todos = await prismaClient.todo.findMany({
    where: {
      userId: id,
    },
    select: {
      status: true,
      task: true,
    },
  });
  return res.status(200).json({ todos });
});
app.post("/createTodo", async (req, res) => {
  const { task, userId } = req.body;
  const todo = await prismaClient.todo.create({
    data: { task, userId, status: false },
  });
  return res.status(200).json({ msg: "created", todo: todo });
});

app.get("/getUsers", async (req, res) => {
  const users = await prismaClient.user.findMany({});
  return res.status(200).json({ users: "users" });
});

app.post("/createusers", async (req, res) => {
  const { username, password } = req.body;
  const user = await prismaClient.user.create({ data: { username, password } });
  return res.status(200).json({ user });
});
app.listen(3000, () => console.log("listening.."));
