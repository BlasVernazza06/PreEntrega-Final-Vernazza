import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

const Support = () => {
  // Se crea un estado para la expansión de la pregunta.
  const [expanded, setExpanded] = useState(null)

  // Se obtiene la función para expandir la pregunta.
  const toggleAccordion = (index) => {
    setExpanded(expanded === index ? null : index)
  }

  // Se crea un array de preguntas frecuentes.
  const faqs = [
    { question: "¿Cómo puedo restablecer mi contraseña?", answer: "Puedes restablecer tu contraseña desde la pantalla de inicio de sesión." },
    { question: "¿Dónde puedo encontrar mi historial de pedidos?", answer: "Tu historial de pedidos está disponible en la sección de tu perfil." },
    { question: "¿Cómo contacto al soporte?", answer: "Puedes contactarnos a través de la sección de soporte en la aplicación." },
    { question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito, débito y PayPal." },
    { question: "¿Puedo cancelar mi pedido?", answer: "Sí, puedes cancelar tu pedido dentro de los 30 minutos posteriores a la compra." },
    { question: "¿Cómo puedo cambiar mi dirección de envío?", answer: "Puedes cambiar tu dirección de envío en la sección de tu perfil." },
  ]

  return (
    <SafeAreaView style={styles.SafeAreaViewcontainer} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Soporte</Text>
        <Text style={styles.subtitle}>Aquí puedes encontrar respuestas a preguntas frecuentes.</Text>
        <Text style={styles.infoText}>
          Si tienes alguna duda o necesitas ayuda con tu cuenta, no dudes en consultar nuestras preguntas frecuentes. 
          También puedes contactarnos directamente a través de la aplicación para obtener asistencia personalizada.
        </Text>
        <Text style={styles.infoText}>
          Nuestro equipo de soporte está disponible para ayudarte con cualquier problema que puedas tener. 
          Asegúrate de revisar las secciones de ayuda y soporte para obtener más información sobre cómo utilizar nuestra plataforma.
        </Text>
        <View style={styles.separator} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqContainer}>
              <TouchableOpacity onPress={() => toggleAccordion(index)} style={styles.faqQuestion}>
                <Text style={styles.faqText}>{faq.question}</Text>
                <Ionicons name={expanded === index ? "chevron-up" : "chevron-down"} size={24} color="black" />
              </TouchableOpacity>
              {expanded === index && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeAreaViewcontainer: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 15,
    textAlign: 'justify',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  faqContainer: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  faqText: {
    fontSize: 18,
    color: '#007BFF',
    flex: 1,
  },
  faqAnswer: {
    padding: 15,
    fontSize: 16,
    color: '#444',
    backgroundColor: '#f9f9f9',
  },
})

export default Support