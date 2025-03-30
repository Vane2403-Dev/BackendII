import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import envsConfig from "../../config/env.config.js";


const cookieExtractor = (req) =>    {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies.token;
    } 
    console.log( `token recibido: ${token}`);
    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey: envsConfig.JWT_SECRET,
  };

  const jwtStrategy = new Strategy (jwtOptions,async (payload, done) => {
    try{
    console.log(`payload: ${payload}`);
    if (payload) {
        return done(null, payload);
    }
    return done(null, false);

  } catch (error) {
    done(error);
  }
  
});

  passport.use("jwt", jwtStrategy);


