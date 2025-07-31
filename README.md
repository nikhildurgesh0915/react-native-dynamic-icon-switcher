# 🔄 React Native App with Remote Icon Switching (Android Only)

This is a React Native Android app that allows **dynamic app icon switching remotely via Firebase Remote Config**. By using Firebase, you can control which launcher icon appears on users’ devices — without requiring a new app update or user interaction.

> 📌 **Note**: This feature is supported **only on Android**, as iOS does not allow runtime icon switching.

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
   - **Value**: e.g., `default_icon`, `festival_icon`, `sale_icon` (must match alias names in manifest)
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
