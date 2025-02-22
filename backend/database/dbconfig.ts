import admin from 'firebase-admin'
import serviceAccount from '../private.json'

// Initialize Firebase Admin with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})


// Export the admin instance for use in other files
export const db = admin.firestore()
export default admin;

