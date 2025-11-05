import passport from "passport"
import passportJWT from "passport-jwt"

const searchToken = (req) =>{
    let token = null;

    if (req.cookies.tokenCookie) {
        token = req.cookies.tokenCookie;
    }

    return token;
}

export const initializePassport = () =>{
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "LaGranBodega123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([searchToken]),
        }, 
        async (jwtPayload, done) => {
            try {
                return done(null, jwtPayload);
            } catch (error) {
                return done(error);
            }
        }
    ))
}