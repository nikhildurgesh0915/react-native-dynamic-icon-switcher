package com.abcd

import android.content.ComponentName
import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class IconChangerModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "IconChanger"
  }

  @ReactMethod
  fun changeIcon(iconName: String) {
    val packageManager = reactContext.packageManager
    val packageName = reactContext.packageName

    val aliasNames = listOf("MainActivityDefault", "MainActivityPromo", "MainActivityFestival")

    for (alias in aliasNames) {
      val component = ComponentName(packageName, "$packageName.$alias")
      val newState = if (alias == iconName) {
        PackageManager.COMPONENT_ENABLED_STATE_ENABLED
      } else {
        PackageManager.COMPONENT_ENABLED_STATE_DISABLED
      }

      packageManager.setComponentEnabledSetting(
        component,
        newState,
        PackageManager.DONT_KILL_APP
      )
    }
  }
}
