# 🔄 React Native App with Remote Icon & App Name Switching (Android Only)

This is a React Native Android app that enables **dynamic app icon and app name switching remotely via Firebase Remote Config**. Firebase allows control over what launcher icon and label users see — all without requiring an app update or user interaction.

> 📌 **Note**: This feature is currently supported only on Android.  
> iOS support is not available yet but will be implemented in future updates.

---

## ✨ Features

- 🔧 **Remote Control**: Manage app icon and label dynamically using Firebase Remote Config.
- 🚀 **No App Update Needed**: Switch icon and app name remotely without uploading a new build.
- 🎨 **Multiple Icon Variants**: Easily support seasonal themes or branding (e.g., festivals, promotions).
- 🔤 **Dynamic App Name Support**: App name displayed on launcher updates along with the icon.
- 🔥 Built with React Native and integrated with Firebase.


## 🔧 Firebase Remote Config Setup

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select or create a Firebase project
3. Navigate to **Remote Config**
4. Add a new parameter:
   - **Key**: `app_icon`
   - **Value**: e.g., `MainActivityDefault`, `MainActivityPromo`, `MainActivityFestival` (must match alias names in manifest)
5. Publish the config
---

## 📖 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nikhildurgesh0915/react-native-dynamic-icon-switcher.git
cd react-native-dynamic-icon-switcher
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
                android:name=".MainActivityDefault"
                android:enabled="true"
                android:exported="true"
                android:icon="@mipmap/ic_launcher"
                android:label="IconSwitcherApp"
                android:targetActivity=".MainActivity">
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LAUNCHER" />
                </intent-filter>
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
Firebase enables remote delivery of icon and app name switching. Here's what was configured:

🔐 SHA Keys: Added both SHA-1 and SHA-256 keys in Firebase Console

📁 google-services.json: Downloaded and added to android/app/

⚙️ Gradle Setup: Applied Firebase plugins and dependencies in both root and app-level build.gradle

🌐 Remote Config: Keys like app_icon determine what alias is enabled



---

### ⚙️ How It Works
On app startup, Firebase Remote Config is fetched.

The value of app_icon determine which alias to enable.

The Kotlin module enables that alias and disables all others.

The launcher app icon and app name are updated immediately on Android.

---

## 🤝 Contribution

Contributions are welcome! Feel free to:
- Fork the repo
- Create a branch
- Submit a pull request

---

## 📜 License

This project is licensed under the MIT License.
