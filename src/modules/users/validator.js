export const createUserSchema = {
  username: { required: true, type: 'string' },
  password: { required: true, type: 'string', minLength: 6 },
  role: { required: true, type: 'string' }
};

export const updateUserSchema = {
  id: { required: true, type: 'number' },
  username: { type: 'string' },
  password: { type: 'string', minLength: 6 },
  role: { type: 'string' }
};
