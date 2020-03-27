import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../assets/img/logo.png';
import styles from '../assets/css/incidents.js';

import api from '../services/api'

export default function Incidents() {
      const [incidents, setIncidents] = useState([]);
      const [total, setTotal] = useState(0);
      const [page, setPage] = useState(1);
      const [loading, setLoading] = useState(false);

      const navigation = useNavigation();

      function navigationToDetail(incident) {
            navigation.navigate('Detail', { incident });
      };

      async function loadIncidents() {
            if (loading) {
                  return;
            }
            if (total > 0 && incidents.length === total) {
                  return;
            }
            setLoading(true);
            const response = await api.get('incidents', {
                  params: { page }
            });

            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers['x-total-count']);

            setLoading(false);
            setPage(page + 1)
      };

      useEffect(() => {
            loadIncidents();
      }, []);

      return (
            <View style={styles.container}>
                  <View style={styles.header}>
                        <Image source={logoImg} />
                        <Text style={styles.headerText}>
                              Total of <Text style={styles.headerTextBold}>{total} incidents</Text>.
      </Text>
                  </View>

                  <Text style={styles.title}>Welcome!</Text>
                  <Text style={styles.description}>Choose one of the NGO's incidents below and be the <Text style={styles.headerTextBold}>hero</Text> they need you to be!</Text>

                  <FlatList
                        data={incidents}
                        style={incidents.incidents}
                        KeyExtractor={incident => String(incidents.id)}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadIncidents}
                        onEndReachedThreshold={0.2}
                        renderItem={({ item: incident }) => (
                              <View style={styles.incident}>
                                    <Text style={styles.incidentProperty}>ONG:</Text>
                                    <Text style={styles.incidentValue}>{incident.name}</Text>

                                    <Text style={styles.incidentProperty}>CASO:</Text>
                                    <Text style={styles.incidentValue}>{incident.title}</Text>

                                    <Text style={styles.incidentProperty}>VALOR:</Text>
                                    <Text style={styles.incidentValue}>{
                                          Intl.NumberFormat(
                                                'pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                          }).format(incident.value)}
                                    </Text>
                                    <TouchableOpacity
                                          style={styles.detailsButton}
                                          onPress={() => navigationToDetail(incident)}
                                    >
                                          <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                          <Feather name="arrow-right" size={16} color="#E02041" />
                                    </TouchableOpacity>
                              </View>
                        )}
                  />

            </View>
      );
};