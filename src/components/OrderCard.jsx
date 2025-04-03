import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const OrderCard = ({orderData}) => {

     return (
          <View style={styles.card}>
               <View style={styles.mainContent}>
                    <Image
                         source={{ uri: orderData.imagen }}
                         style={styles.image}
                         resizeMode="cover"
                    />
                    
                    <View style={styles.infoContainer}>
                         <View style={styles.headerRow}>
                              <Text style={styles.title}>
                                   {orderData.nombre}
                              </Text>
                              <View style={[styles.statusBadge, 
                                   { backgroundColor: orderData.status === 'completed' ? colors.success : colors.warning }
                              ]}>
                                   <Text style={styles.statusText}>
                                        {orderData.status || 'pendiente'}
                                   </Text>
                              </View>
                         </View>

                         <Text style={styles.destination}>
                              Destino: {orderData.destino}
                         </Text>
                    </View>
               </View>

               <View style={styles.footer}>
                    <View style={styles.quantitySection}>
                         <Text style={styles.label}>Cantidad: {String(orderData.cantidad)}</Text>
                    </View>

                    <View style={styles.priceSection}>
                         <View style={styles.priceRow}>
                              <Text style={styles.label}>Precio unitario:</Text>
                              <Text style={styles.value}>
                                   ${Number(orderData.precio).toFixed(2)}
                              </Text>
                         </View>
                    </View>
               </View>
          </View>
     )
}

export default OrderCard

const styles = StyleSheet.create({
     card: {
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 15,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: colors.lightGray,
     },
     mainContent: {
          flexDirection: 'row',
          marginBottom: 15,
     },
     image: {
          width: 90,
          height: 90,
          borderRadius: 8,
          marginRight: 15,
     },
     infoContainer: {
          flex: 1,
          justifyContent: 'space-between',
     },
     headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
     },
     title: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.primary,
          flex: 1,
          marginRight: 10,
     },
     statusBadge: {
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 20,
     },
     statusText: {
          color: colors.white,
          fontSize: 12,
          fontWeight: '600',
     },
     destination: {
          fontSize: 15,
          color: colors.lightBlack,
     },
     footer: {
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
          paddingTop: 12,
     },
     quantitySection: {
          flexDirection: 'row',
          marginBottom: 8,
     },
     priceSection: {
          gap: 4,
     },
     priceRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },
     label: {
          fontSize: 14,
          color: colors.lightBlack,
          marginRight: 8,
     },
     value: {
          fontSize: 14,
          color: colors.primary,
          fontWeight: '500',
     },
     totalLabel: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.primary,
     },
     totalValue: {
          fontSize: 16,
          fontWeight: '700',
          color: colors.success,
     },
});
      