export function validate(schema) {
  return (req, res, next) => {
    const errors = [];
    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }
      if (rules.type && value !== undefined && typeof value !== rules.type) {
        errors.push(`${field} must be a ${rules.type}`);
        continue;
      }
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        errors.push(`${field} is invalid`);
      }
    }
    if (errors.length) {
      const err = new Error(errors.join(', '));
      err.statusCode = 400;
      return next(err);
    }
    next();
  };
}
