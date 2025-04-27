import passport from "passport";
import { Strategy } from "passport-local";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";
import { cartDao} from "../../persistence/mongo/dao/cart.dao.js";
import { comparePassword, hashPassword } from "../../utils/hashPassword.js";

//estrategia registro 
const registerStetegy = new Strategy(

    {passReqToCallback: true, usernameField: "email"},
   async  (req, username, password, done) => {
    try { 
    const user = await userDao.getOne({email: username});
      if(user) return done(null, false, {message: "El email ya está registrado"});
      const newCart= await cartDao.create();
      
      const newUser = {
        ...req.body,
        password:  hashPassword(password),
        cart: newCart._id,
      };
      const userCreate = await userDao.create(newUser);
      return done (null, userCreate);
    } catch (error) {
        done(error);
    }
}
);

passport.use("register",registerStetegy);

// Serialization
passport.serializeUser((user, done) => {
    done(null, user._id); 
  });
  // Estrategia de login

const loginStrategy = new Strategy(
    { usernameField: "email" },
    async (username, password, done) => {
  
      try {
  
        const user = await userDao.getOne({ email: username});
        if(!user || !comparePassword(user.password, password)) return done(null, false, { message: "Email o password no válidos"});
  
        // En caso que las credenciales esten bien
        return done(null, user);
        
      } catch (error) {
        done(error)
      }
      
    }
  )
  
  // Registramos la estrategia de login en passport
  passport.use("login", loginStrategy);

  // Deserialized
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getOne({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
// estrategia login
