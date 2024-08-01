import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    verificationToken: { 
      type: String 
    },
    verificationTokenExpires: { 
      type: Date,  
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
   },
  { timestamps: true }
);

// Add indexes
userSchema.index({ resetPasswordExpires: 1 }, { expireAfterSeconds: 0 });
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400, partialFilterExpression: { isVerified: false } });

// Clean up function
userSchema.statics.cleanupExpiredTokens = async function() {
  const now = new Date();
  await this.updateMany(
    { resetPasswordExpires: { $lt: now } },
    { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }
  );

  // Delete unverified users after 1 day
  await this.deleteMany({
    isVerified: false,
    createdAt: { $lt: new Date(Date.now() - 86400000) }
  });
};

const User = mongoose.model('User', userSchema);

// Log the indexes to verify
// console.log(User.collection.getIndexes({ full: true }));

// // Rebuild indexes (decomment and save to trigered this code) after every model change
// const rebuildIndexes = async () => {
//   try {
//     await User.collection.dropIndexes();
//     await User.syncIndexes();
//     console.log('Indexes rebuilt successfully');
//   } catch (error) {
//     console.error('Error rebuilding indexes:', error);
//   }
// };

// rebuildIndexes();

export default User;