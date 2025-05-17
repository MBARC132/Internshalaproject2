import bcrypt from 'bcryptjs';

const password = 'Mahesh';
const hash = '$2b$12$Rt9H9TnGM1KaKbPQ1ZO6p.gQe2aFM.2ybKppfSup0bsDyO6hfpmLe';

bcrypt.compare(password, hash).then(result => {
  console.log('Password match:', result);
});
