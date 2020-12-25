require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;  
    if (electronPlatformName !== 'darwin') {
        return;
    }

    const appName = context.packager.appInfo.productFilename;
    const appleId = process.env.APPLEID;
    if (!appleId) {
        return;
    }

    return await notarize({
        appBundleId: 'com.electron.vite.wallet',
        appPath: `${appOutDir}/${appName}.app`,
        appleId,
        appleIdPassword: '@keychain:AC_PASSWORD',
        ascProvider: process.env.PROVIDER
    });
};