import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { error } from "../middlewares/errors.js";
import db from "./../DB/mysql.js";

const secret = config.jwt.secret;

function assignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkAuth = {
  confirmToken: function (req, id) {
    const decodified = decodifyHeader(req);

    if (decodified.id !== id) {
      throw error("No tienes privilegios para hacer esto", 401);
    }
  },
};

const checkSession = {
  confirmToken: function (req, id) {
    const decodified = decodifyHeader(req);
  },
};

const checkAdmin = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM admin`;
    try {
      const data = await db.query1(query);
      const idUsersAdmin = [];
      for (const item of data) {
        const id_user = item.id_user;
        idUsersAdmin.push(id_user);
      }
      if (!idUsersAdmin.includes(decodified.id)) {
        checkSAdmin.confirmToken(req, id);
      }
      if (decodified.id !== id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
    } catch (error) {
      throw error;
    }
  },
};

const checkCSAgent = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM csagent WHERE ?`;
    try {
      const data = await db.query(query, { id: id });
      const idUserOwner = data[0].id_user;
      if (idUserOwner !== decodified.id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      checkAuth.confirmToken(req, idUserOwner);
    } catch (error) {
      throw error;
    }
  },
};

const checkSAdmin = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM superadmin`;
    try {
      const data = await db.query1(query);
      const idUsersSAdmin = [];
      for (const item of data) {
        const id_user = item.id_user;
        idUsersSAdmin.push(id_user);
      }
      if (!idUsersSAdmin.includes(decodified.id)) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      if (decodified.id !== id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
    } catch (error) {
      throw error;
    }
  },
};

const checkOwner = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM business WHERE ?`;
    try {
      const data = await db.query(query, { id: id });
      const idUserOwner = data[0].id_user;
      if (idUserOwner !== decodified.id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      checkAuth.confirmToken(req, idUserOwner);
    } catch (error) {
      throw error;
    }
  },
};

const checkVolunteer = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM volunteer WHERE ?`;
    try {
      const data = await db.query(query, { id: id });
      const idUserVolunteer = data[0].id_user;
      if (idUserVolunteer !== decodified.id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      checkAuth.confirmToken(req, idUserVolunteer);
    } catch (error) {
      throw error;
    }
  },
};

const checkKYCUser = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM ukyc`;
    try {
      const data = await db.query1(query);
      const idUsersSAdmin = [];
      for (const item of data) {
        const id_user = item.id_user;
        idUsersSAdmin.push(id_user);
      }
      if (!idUsersSAdmin.includes(decodified.id)) {
        throw error("No haz completado el KYC", 401);
      }
      if (decodified.id !== id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      const query2 = `SELECT * FROM ukyc WHERE id_user = ?`;
      const data2 = await db.query(query2, id);
      const kyc = data2[0];
      if (kyc.approve !== 1) {
        throw error("Tu verificación de identidad sigue en revisión", 401);
      }
    } catch (error) {
      throw error;
    }
  },
};

const checkKYCBusiness = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM bkyc`;
    try {
      const data = await db.query1(query);
      const idUsersSAdmin = [];
      for (const item of data) {
        const id_user = item.id_user;
        idUsersSAdmin.push(id_user);
      }
      if (!idUsersSAdmin.includes(decodified.id)) {
        throw error("No haz completado el KYC", 401);
      }
      if (decodified.id !== id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      const query2 = `SELECT * FROM bkyc WHERE id_user = ?`;
      const data2 = await db.query(query2, id);
      const kyc = data2[0];
      if (kyc.approve !== true) {
        throw error("Tu verificación de identidad sigue en revisión", 401);
      }
    } catch (error) {
      throw error;
    }
  },
};

const checkInspector = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM inspector WHERE ?`;
    try {
      const data = await db.query(query, { id: id });
      const idUserOwner = data[0].id_user;
      if (idUserOwner !== decodified.id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      checkAuth.confirmToken(req, idUserOwner);
    } catch (error) {
      throw error;
    }
  },
};

const checkTGuide = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const query = `SELECT * FROM tour_guide WHERE ?`;
    try {
      const data = await db.query(query, { id: id });
      const idUserOwner = data[0].id_user;
      if (idUserOwner !== decodified.id) {
        throw error("No tienes privilegios para hacer esto", 401);
      }
      checkAuth.confirmToken(req, idUserOwner);
    } catch (error) {
      throw error;
    }
  },
};

function getToken(authorization) {
  if (!authorization) {
    throw error("No token", 401);
  }

  if (authorization.indexOf("Bearer") === -1) {
    throw error("Formato Inválido", 401);
  }

  let token = authorization.replace("Bearer ", "");
  return token;
}

function decodifyHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decodified = verifyToken(token);

  req.user = decodified;

  return decodified;
}

export default {
  assignToken,
  checkAuth,
  checkSAdmin,
  checkAdmin,
  checkSession,
  checkCSAgent,
  checkVolunteer,
  checkInspector,
  checkTGuide,
  checkKYCUser,
  checkKYCBusiness,
  checkOwner,
};
