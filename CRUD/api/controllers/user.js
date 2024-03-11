import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM equipamentos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO equipamentos(`nome`, `email`, `numero`, `tipo`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.numero,
    req.body.tipo,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastro realizado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE equipamentos SET `nome` = ?, `email` = ?, `numero` = ?, `tipo` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.numero,
    req.body.tipo,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastro atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM equipamentos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastro deletado com sucesso.");
  });
};
