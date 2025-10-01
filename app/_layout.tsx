import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function RootLayout() {
  return (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="figure.walk" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="games">
          <Icon sf="trophy.fill" drawable="custom_settings_drawable" />
          <Label>Games</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.crop.circle.fill" drawable="custom_settings_drawable" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
  );
}
