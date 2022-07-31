import { clientData } from "../clients.js";

export const getClientById = (req, res) => {
  const client = clientData.find((item) => req.params.id === item.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404);
    res.json({ message: "Not found" });
    throw new Error({ message: "Not found" });
  }
};

export const searchClientByFirstName = (req, res) => {
  const { q } = req.query;

  const output = [];
  if (q) {
    clientData.forEach((obj) => {
      obj.first_name.toLocaleLowerCase().startsWith(q.toLowerCase()) &&
        output.push(obj);
    });
    res.json(output.slice(0, 10));
  } else {
    res.sendStatus(404);
  }
};

export const searchClientByLastName = (req, res) => {
  const { q } = req.query;

  const output = [];
  if (q) {
    clientData.forEach((obj) => {
      obj.last_name.toLocaleLowerCase().startsWith(q.toLowerCase()) &&
        output.push(obj);
    });
    res.json(output.slice(0, 10));
  } else {
    res.sendStatus(404);
  }
};

export const searchClientByEmail = (req, res) => {
  const { q } = req.query;

  const output = [];
  if (q) {
    clientData.forEach((obj) => {
      obj.email.toLocaleLowerCase().startsWith(q.toLowerCase()) &&
        output.push(obj);
    });
    res.json(output.slice(0, 10));
  } else {
    res.sendStatus(404);
  }
};
