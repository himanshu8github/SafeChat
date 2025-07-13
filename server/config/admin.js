import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const createAdminIfNotExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await User.findOne({ email: adminEmail, role: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const admin = new User({
        username: 'himanshuasadmin',
        name: 'Himanshu',
        email: "himanshukakran87@gmail.com",
        contact: '8126422965',
        country: 'India',
        state: 'Uttar Pradesh',
        password: "@#him&^%$@BHJVGgmail",
        role: 'admin',
      });

      await admin.save();
      console.log(' Admin account created');
    } else {
      console.log(' Admin account already exists');
    }
  } catch (error) {
    console.error(' Failed to create admin:', error.message);
  }
};
