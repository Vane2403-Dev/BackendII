
export const validateSchema = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
          console.log(result.error.issues); // Mostrará los errores correctamente
            return res.status(400).json({ 
                error: result.error.errors.map(err =>
                     ({path: err.path.join ("."),
                         message: err.message}))
            });
        }
        next();
    };
}