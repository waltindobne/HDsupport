import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'suaChaveSecreta');
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

const authMiddleware = (handler) => async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken; // Adiciona o usuário decodificado ao objeto de solicitação
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export default authMiddleware;
