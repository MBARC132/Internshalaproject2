import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,            // Remove extra spaces
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,       // Save email in lowercase
    trim: true,
  },
  password: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Password hashing middleware: hashes password before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method: compares plain text password with hashed password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
