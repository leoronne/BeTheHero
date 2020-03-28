import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../assets/img/logo.png';
import styles from '../assets/css/detail.js';


export default function Detail() {
	const navigation = useNavigation();
	const route = useRoute();

	const incident = route.params.incident;
	const message = `Hello ${incident.NAME}, I'm getting in touch because I would like to help with the incident "${incident.TITLE}" with the ammount of $ ${incident.VALUE}`

	function navigateBack() {
		navigation.goBack();
	};

	function sendMail() {
		MailComposer.composeAsync({
			recipients: [incident.EMAIL],
			subject: `A Hero is interested on your incident: ${incident.TITLE}`,
			body: message,
		})
	};

	function SendWhatsApp() {
		Linking.openURL(`whatsapp://send?phone=${incident.WHATSAPP}&text=${message}`);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#E82041" />
				</TouchableOpacity>
			</View>

			<View style={styles.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
				<Text style={styles.incidentValue}>
					{incident.NAME} of {incident.CITY}/{incident.UF}
				</Text>

				<Text style={styles.incidentProperty}>INCIDENT:</Text>
				<Text style={styles.incidentValue}>
					{incident.TITLE}
				</Text>

                        
				<Text style={styles.incidentProperty}>DESCRIPTION:</Text>
				<Text style={styles.incidentValue}>
					{incident.DESCRIPTION}
				</Text>

				<Text style={styles.incidentProperty}>VALUE:</Text>
				<Text style={styles.incidentValue}>{
					Intl.NumberFormat(
						'en-US', {
						style: 'currency',
						currency: 'USD'
					}).format(incident.VALUE)}
				</Text>
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Be the hero of this incident.</Text>

				<Text style={styles.heroDescription}>Get in touch:</Text>
				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={SendWhatsApp}>
						<Text style={styles.actiontext}>WhatsApp</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actiontext}>Email</Text>
					</TouchableOpacity>
				</View>
			</View>

		</View>
	);
};