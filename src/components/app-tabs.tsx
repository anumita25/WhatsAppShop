import { Tabs, TabList, TabSlot, TabTrigger, TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { name: 'dashboard', href: '/', label: 'Home', icon: '⌂' },
  { name: 'orders', href: '/orders', label: 'Orders', icon: '▤' },
  { name: 'add-order', href: '/add-order', label: 'Add order', icon: '+' },
  { name: 'inventory', href: '/inventory', label: 'Stock', icon: '□' },
] as const;

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList style={[styles.tabBar, { height: 72 + insets.bottom, paddingBottom: insets.bottom }]}>
        {tabs.map((tab) => (
          <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
            <TabButton icon={tab.icon} label={tab.label} isAdd={tab.name === 'add-order'} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

function TabButton({ icon, label, isAdd, isFocused, ...props }: TabTriggerSlotProps & { icon: string; label: string; isAdd?: boolean }) {
  return <Pressable {...props} style={styles.tabButton}><View style={[styles.tabIcon, isAdd && styles.addIcon, isFocused && !isAdd && styles.activeIcon]}><Text style={[styles.iconText, isAdd && styles.addIconText, isFocused && !isAdd && styles.activeIconText]}>{icon}</Text></View>{!isAdd && <Text style={[styles.tabLabel, isFocused && styles.activeLabel]}>{label}</Text>}</Pressable>;
}

const styles = StyleSheet.create({
  slot: { flex: 1 }, tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#EEF1EF', paddingHorizontal: 10 }, tabButton: { minWidth: 58, alignItems: 'center', justifyContent: 'center', gap: 4 }, tabIcon: { width: 32, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }, iconText: { fontSize: 22, lineHeight: 24, color: '#779087', fontWeight: '700' }, activeIcon: { backgroundColor: '#E4F6EE' }, activeIconText: { color: '#147A55' }, tabLabel: { fontSize: 11, color: '#779087', fontWeight: '600' }, activeLabel: { color: '#147A55' }, addIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#137A55', marginTop: -22, shadowColor: '#0D543A', shadowOpacity: 0.28, shadowRadius: 10, elevation: 5 }, addIconText: { color: '#FFFFFF', fontSize: 32, lineHeight: 34, fontWeight: '400' },
});
