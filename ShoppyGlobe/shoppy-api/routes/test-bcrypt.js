import bcrypt from 'bcryptjs';

const password = 'yourRegisteredPasswordHere';  // Your real password here
const hash = '$2b$12$OkLoFNk1YVox9FBT3qdBFODxdnKdMPu4s6w9HNgS364M09cTJTa7S';  // Password hash from DB

bcrypt.compare(password, hash).then(result => {
  console.log('Password match:', result);  // Should print true if passwords match
}).catch(err => {
  console.error('Error:', err);
});
