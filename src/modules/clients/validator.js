const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createClientSchema = {
  name: { required: true, type: 'string' },
  email: { required: true, type: 'string', pattern: emailPattern }
};

export const updateClientSchema = {
  id: { required: true, type: 'number' },
  name: { type: 'string' },
  email: { type: 'string', pattern: emailPattern }
};
