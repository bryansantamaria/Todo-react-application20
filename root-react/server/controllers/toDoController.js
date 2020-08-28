const {
  insertToDo,
  findToDos,
  updateToDo,
  deleteToDo,
  sortByCreated,
  sortByUpdated,
  limitPaginate,
} = require("../models/toDoModel");

const createToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const doc = await insertToDo(title, done, req.user.userId);

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getToDos = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const doc = await findToDos(userId, role);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updToDo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const { userId, role } = req.user;
    const doc = await updateToDo(req.params.id, title, done, userId, role);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const delToDo = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const doc = await deleteToDo(req.params.id, userId, role);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const sortCreate = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const doc = await sortByCreated(req.params.order, userId, role);
    return res.status(200).json(doc);
  } catch (error) {}
  return res.status(400).json(error);
};

const sortUpdated = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const doc = await sortByUpdated(req.params.order, userId, role);
    return res.status(200).json(doc);
  } catch (error) {}
  return res.status(400).json(error);
};

const paginate = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let perPage = 5;
    let skip = Math.max(0, req.params.skip);
    const doc = await limitPaginate(perPage, skip, userId, role);
    return res.status(200).json(doc);
  } catch {
    return res.status(400).json(error);
  }
};

module.exports = {
  createToDo,
  getToDos,
  updToDo,
  delToDo,
  sortCreate,
  sortUpdated,
  paginate,
};
