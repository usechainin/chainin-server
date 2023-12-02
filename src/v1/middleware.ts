import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const whitelistedIPs = process.env.WHITELISTED_IPS;

const middleware: {
  authenticateJWT?: (req: Request, res: Response, next: NextFunction) => void;
  checkWhitelistedIpAddress?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  authenticateJWTForWebsocket?: (socket: any, next: NextFunction) => void;
} = {};

middleware.authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "my-secret", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    (req as any).user = user;

    next();
  });
};

middleware.authenticateJWTForWebsocket = (socket, next: NextFunction) => {
  // Extract the token from the client
  const token = socket.handshake.auth.token;
  console.log(token, "wats token?");
  // Verify the token
  jwt.verify(token, "your-secret-key", (err: any, decoded: any) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    // Attach the user data to the socket for future use
    socket.user = decoded.user;
    next();
  });
};

middleware.checkWhitelistedIpAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (whitelistedIPs) {
    const whitelistedIpList = whitelistedIPs.split(",");
    const clientIP: string | undefined = req.ip;

    if (clientIP && whitelistedIpList.includes(clientIP)) {
      return next();
    } else {
      return res.status(403).send("Forbidden");
    }
  } else {
    console.log("WHITELISTED_IPS undefined in ENV.");
  }
};

export default middleware;
