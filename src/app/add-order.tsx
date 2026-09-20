import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brand, Button, Card, Field, Heading, Screen, palette } from '@/components/shop-ui';
import { useShop } from '@/context/shop-store';

type Mode = 'message' | 'review' | 'manual';

function extractMock(message: string) {
  const lower = message.toLowerCase();
  const quantity = Number(message.match(/\b(\d+)\b/)?.[1] ?? 1);
  const product = lower.includes('tote') ? 'Canvas tote' : lower.includes('kurta') ? 'Everyday kurta' : lower.includes('dress') ? 'Summer dress' : 'Linen co-ord set';
  const name = message.match(/(?:i(?:'m| am)|this is)\s+([A-Z][a-z]+)/)?.[1] ?? '';
  const variant = lower.includes('sand') ? 'Sand · M' : lower.includes('ivory') ? 'Ivory · L' : lower.includes('coral') ? 'Coral · S' : 'Natural · Standard';
  return { name, product, quantity: String(quantity), variant };
}

export default function AddOrder() {
  const router = useRouter(); const { addOrder } = useShop();
  const [mode, setMode] = useState<Mode>('message'); const [message, setMessage] = useState('');
  const [name, setName] = useState(''); const [product, setProduct] = useState(''); const [quantity, setQuantity] = useState('1'); const [variant, setVariant] = useState('');
  const extract = () => { const result = extractMock(message); setName(result.name); setProduct(result.product); setQuantity(result.quantity); setVariant(result.variant); setMode('review'); };
  const create = () => { addOrder({ name, product, quantity: Number(quantity), variant }); router.replace('/orders'); };
  const form = <View style={styles.form}><Field label="Customer name" value={name} onChangeText={setName} placeholder="e.g. Priya Nair"/><Field label="Product or service" value={product} onChangeText={setProduct} placeholder="e.g. Linen co-ord set"/><View style={styles.twoCol}><View style={styles.half}><Field label="Quantity" value={quantity} onChangeText={setQuantity} placeholder="1"/></View><View style={styles.half}><Field label="Variant" value={variant} onChangeText={setVariant} placeholder="Size / colour"/></View></View></View>;
  return <Screen><SafeAreaView style={styles.safe} edges={['top']}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><Brand/>
    {mode === 'message' && <><Heading eyebrow="Create an order" title="Paste customer message"/><Card style={styles.info}><Text style={styles.infoTitle}>Owner-submitted content only</Text><Text style={styles.infoText}>Paste content shared with you by a customer. This MVP does not connect to WhatsApp.</Text></Card><Field label="Customer message" value={message} onChangeText={setMessage} placeholder="Paste customer request" multiline/><Button label="Extract order" onPress={extract}/><View style={styles.divider}/><Button label="Enter order manually" secondary onPress={() => setMode('manual')}/></>}
    {mode === 'review' && <><Pressable onPress={() => setMode('message')}><Text style={styles.back}>‹ Back to message</Text></Pressable><Heading eyebrow="Review extracted details" title="Check the order"/>{form}<Button label="Create order" onPress={create}/></>}
    {mode === 'manual' && <><Pressable onPress={() => setMode('message')}><Text style={styles.back}>‹ Back to options</Text></Pressable><Heading eyebrow="Create an order" title="Enter order manually"/>{form}<Button label="Create order" onPress={create}/></>}
  </ScrollView></SafeAreaView></Screen>;
}
const styles = StyleSheet.create({ safe:{flex:1},content:{padding:20,gap:19,paddingBottom:132,maxWidth:720,width:'100%',alignSelf:'center'},info:{backgroundColor:'#EFF8F3',borderColor:'#D5EDE0'},infoTitle:{color:palette.green,fontSize:13,fontWeight:'800',marginBottom:4},infoText:{color:'#57756A',fontSize:12,lineHeight:17},form:{gap:15},twoCol:{flexDirection:'row',gap:12},half:{flex:1},divider:{height:1,backgroundColor:'#DDE7E1'},back:{color:palette.green,fontSize:14,fontWeight:'800'} });
