import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { error as createError } from "../middlewares/errors.js";
import db from "./../DB/mysql.js";

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn;

function assignToken(data) {
  return jwt.sign(data, secret, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

async function isUserInTable(userId, table) {
  const data = await db.query(
    "SELECT 1 FROM ?? WHERE id_user = ? LIMIT 1",
    [table, userId]
  );
  return data.length > 0;
}

async function verifyOwnership(req, id, table) {
  const { id: userId } = decodifyHeader(req);
  const data = await db.query(
    "SELECT id_user FROM ?? WHERE id = ? LIMIT 1",
    [table, id]
  );
  const ownerId = data[0]?.id_user;
  if (ownerId !== userId) {
    throw createError("No tienes privilegios para hacer esto", 401);
  }
}

const checkAuth = {
  confirmToken: function (req, id) {
    const decodified = decodifyHeader(req);

    if (decodified.id !== id) {
      throw createError("No tienes privilegios para hacer esto", 401);
    }
  },
};

const checkSession = {
  confirmToken: function (req) {
    decodifyHeader(req);
  },
};

const checkAdmin = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const isAdmin = await isUserInTable(decodified.id, "admin");
    if (!isAdmin) {
      await checkSAdmin.confirmToken(req, id);
      return;
    }
    if (decodified.id !== id) {
      throw createError("No tienes privilegios para hacer esto", 401);
    }
  },
};

const checkCSAgent = {
  confirmToken: async function (req, id) {
    await verifyOwnership(req, id, "csagent");
  },
};

const checkSAdmin = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const isSAdmin = await isUserInTable(decodified.id, "superadmin");
    if (!isSAdmin || decodified.id !== id) {
      throw createError("No tienes privilegios para hacer esto", 401);
    }
  },
};

const checkOwner = {
  confirmToken: async function (req, id) {
    await verifyOwnership(req, id, "business");
  },
};

const checkVolunteer = {
  confirmToken: async function (req, id) {
    await verifyOwnership(req, id, "volunteer");
  },
};

const checkKYCUser = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const inKYC = await isUserInTable(decodified.id, "ukyc");
    if (!inKYC) {
      throw createError("No haz completado el KYC", 401);
    }
    if (decodified.id !== id) {
      throw createError("No tienes privilegios para hacer esto", 401);
    }
    const data = await db.query("SELECT * FROM ukyc WHERE id_user = ?", [id]);
    const kyc = data[0];
    if (kyc.approve !== 1) {
      throw createError("Tu verificación de identidad sigue en revisión", 401);
    }
  },
};

const checkKYCBusiness = {
  confirmToken: async function (req, id) {
    const decodified = decodifyHeader(req);
    const inKYC = await isUserInTable(decodified.id, "bkyc");
    if (!inKYC) {
      throw createError("No haz completado el KYC", 401);
    }
    if (decodified.id !== id) {
      throw createError("No tienes privilegios para hacer esto", 401);
    }
    const data = await db.query("SELECT * FROM bkyc WHERE id_user = ?", [id]);
    const kyc = data[0];
    if (kyc.approve !== true) {
      throw createError("Tu verificación de identidad sigue en revisión", 401);
    }
  },
};

const checkInspector = {
  confirmToken: async function (req, id) {
    await verifyOwnership(req, id, "inspector");
  },
};

const checkTGuide = {
  confirmToken: async function (req, id) {
    await verifyOwnership(req, id, "tour_guide");
  },
};

function getToken(authorization) {
  if (!authorization) {
    throw createError("No token", 401);
  }

  if (authorization.indexOf("Bearer") === -1) {
    throw createError("Formato Inválido", 401);
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

export { isUserInTable, verifyOwnership };
