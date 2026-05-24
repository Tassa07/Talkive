# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Menjaga agar MainActivity tidak dihapus atau diubah namanya
-keep class com.naltylabs.talkive.MainActivity { *; }

# Jika kamu menggunakan plugin Capacitor/Cordova, tambahkan ini juga
-keep class com.getcapacitor.** { *; }
-keep class com.ionicframework.** { *; }

# Mencegah error pada library pendukung
-keepattributes Signature
-keepattributes *Annotation*
