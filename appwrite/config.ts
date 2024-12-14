// config.ts

import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject('67576e37002213a2b157')
    .setPlatform('com.recording.app');

export const adb = new Databases(client);