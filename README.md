# 🔄 React Native App with Remote Icon Switching (Android Only)

This is a React Native Android app that allows **dynamic app icon switching remotely via Firebase Remote Config**. By using Firebase, you can control which launcher icon appears on users’ devices — without requiring a new app update or user interaction.

> 📌 **Note**: This feature is currently supported only on Android.
iOS support is not available yet but will be implemented in future updates.

---

## ✨ Features

- 🔧 **Remote Control**: Manage app icon dynamically using Firebase Remote Config.
- 🚀 **No App Update Needed**: Change the icon remotely without uploading a new build.
- 🎨 **Multiple Icon Variants**: Easily support multiple themes (e.g., festival, sale, etc.) via alias icons.
- 🔥 Built with React Native and integrated with Firebase.

---

## 📖 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nikhildurgesh0915/react-native-dynamic-icon-switcher.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Metro Server

```bash
npx react-native start
```

### 4. Run the Android App

```bash
npx react-native run-android
```

---

## 🔧 Firebase Remote Config Setup

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select or create a Firebase project
3. Navigate to **Remote Config**
4. Add a new parameter:
   - **Key**: `icon_name`
   - **Value**: e.g., `MainActivityDefault`, `MainActivityPromo`, `MainActivityFestival` (must match alias names in manifest)
5. Publish the config

The app will fetch this value and switch icons accordingly.

---

## 🧪 Customize & Add Icons

### 1. Add Icon Images

Place different icon images in:

```
android/app/src/main/res/mipmap-*/icon_variant_name.png
```

Each alias uses its own icon from these folders.

### 2. Configure AndroidManifest.xml

Add `<activity-alias>` entries for each icon like:

```xml
<activity-alias
    android:name=".FestivalIcon"
    android:enabled="false"
    android:icon="@mipmap/ic_festival"
    android:targetActivity=".MainActivity"
    android:exported="true"
    android:label="@string/app_name">
</activity-alias>
```

Set only one alias `enabled=true` at a time.

---

### 3. Configure Kotlin Native Android Code
🧩 Native Kotlin Setup Overview
To enable dynamic icon switching on Android, we’ve integrated custom native logic using Kotlin:

IconChangerModule.kt – Exposes a native module to JavaScript to trigger icon changes.

IconChangerPackage.kt – Implements the core logic to enable or disable icon aliases using Android’s PackageManager.

MainActivity.kt & MainApplication.kt – Modified to properly register and integrate the native module with React Native.

---

### 4. 🔥 Firebase Integration Summary
We integrated Firebase into the project to enable remote dynamic icon switching functionality. Below are the key steps performed:

Firebase Project Setup: A new Firebase project was created via the Firebase Console and the Android app was registered.

SHA Keys Configuration: We added both the SHA-1 and SHA-256 keys from the development machine to enable authentication 

google-services.json File: The configuration file (google-services.json) was downloaded and placed under the android/app/ directory.

Gradle Configuration: Firebase SDK was integrated by modifying build.gradle files:

Applied com.google.gms.google-services plugin.

Added Firebase dependencies to support analytics.

---

## ⚙️ How It Works

- On app launch, Firebase Remote Config is fetched
- The icon alias specified in the `icon_name` key is enabled
- All other aliases are disabled
- This switch happens via native Android code using the PackageManager

---

## 🤝 Contribution

Contributions are welcome! Feel free to:
- Fork the repo
- Create a branch
- Submit a pull request

---

## 📜 License

This project is licensed under the MIT License.
