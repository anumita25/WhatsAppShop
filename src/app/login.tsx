import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brand, Button, Card, Field, Screen, palette } from '@/components/shop-ui';
import { useAuth } from '@/context/auth-store';

/** Mock-only authentication UI. Google Sign-In and password authentication are intentionally not connected yet. */
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const showMockNotice = () => login();

  return <Screen><SafeAreaView style={styles.safe} edges={['top']}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <View style={styles.brandWrap}><Brand /></View>
    <View style={styles.hero}><Text style={styles.title}>Welcome back</Text><Text style={styles.tagline}>Turn conversations into business operations.</Text></View>
    <Card style={styles.card}><Button label="Continue with Google" onPress={showMockNotice} /><Text style={styles.googleHint}>Secure sign-in for your business workspace</Text><View style={styles.divider}><View style={styles.line}/><Text style={styles.or}>OR CONTINUE WITH EMAIL</Text><View style={styles.line}/></View><View style={styles.form}><Field label="Email address" value={email} onChangeText={setEmail} placeholder="you@business.com" /><Field label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" /></View><Button label="Sign in with email" secondary onPress={showMockNotice} /><Text onPress={showMockNotice} style={styles.signup}>New here? Create a mock account</Text>{notice ? <Text style={styles.notice}>{notice}</Text> : null}</Card>
    <Text style={styles.footer}>Mock authentication only — no account data is sent or stored.</Text>
  </ScrollView></SafeAreaView></Screen>;
}
const styles = StyleSheet.create({ safe:{flex:1},content:{flexGrow:1,padding:20,paddingBottom:48,justifyContent:'center',gap:28,maxWidth:520,width:'100%',alignSelf:'center'},brandWrap:{alignItems:'center'},hero:{alignItems:'center',gap:9},title:{color:palette.ink,fontSize:29,fontWeight:'800',letterSpacing:-.7},tagline:{color:palette.muted,fontSize:15,textAlign:'center',lineHeight:22,maxWidth:280},card:{gap:16,padding:20},googleHint:{color:palette.muted,fontSize:12,textAlign:'center',marginTop:-7},divider:{flexDirection:'row',alignItems:'center',gap:9,marginVertical:2},line:{height:1,backgroundColor:palette.line,flex:1},or:{color:palette.muted,fontSize:10,fontWeight:'800',letterSpacing:.6},form:{gap:14},signup:{color:palette.green,fontSize:13,fontWeight:'800',textAlign:'center'},notice:{color:palette.green,fontSize:12,textAlign:'center',lineHeight:18},footer:{color:palette.muted,fontSize:12,textAlign:'center',lineHeight:18,paddingHorizontal:18} });
