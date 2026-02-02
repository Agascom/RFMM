import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const user = {
  name: 'Daniel Kouassi',
  email: 'daniel.k@email.com',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAWhjEs9kf5ijzyZiuwXASXSFOwjxLkFIWWyRq44JP5TewkzTyv6_8MVudSGlRrpkQpZSMY-wNpWr5URxnA8y9hBUpuVph4nyf1iwI5Ky5nLOyg2Pt2VG7IvosgJqGqlvfRTMjYfvt6gFBTlK6o_wMvi1eldqwVBWRtRfo1n9aNh1yCMdmO4N3odRoJJj0OwCc6rAMx_XmB8RewRlnlrXu07iOqDbF4fSF9hMc8_qoVw9zlKFOBmzrUUdQPoeOu1j2nOXnTbrJutk',
  memberSince: 'Janvier 2023',
  level: 'Premium',
};

const stats = [
  { label: 'Livres Lus', value: '12' },
  { label: 'Heures Écoutées', value: '48' },
  { label: 'Coaching', value: '5' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const menuItems = [
    {
      icon: 'settings' as const,
      label: 'Paramètres',
      subtitle: 'Compte, notifications',
      onPress: () => navigation.navigate('Settings')
    },
    {
      icon: 'credit-card' as const,
      label: 'Abonnement',
      subtitle: 'Plan Premium',
      onPress: () => Alert.alert('Abonnement', 'Vous êtes actuellement sur le plan Premium.\n\nRenouvellement: 15 février 2026\nPrix: 5 000 FCFA/mois')
    },
    {
      icon: 'file-download' as const,
      label: 'Téléchargements',
      subtitle: '6 éléments hors ligne',
      onPress: () => navigation.navigate('Ma Biblio')
    },
    {
      icon: 'history' as const,
      label: 'Historique',
      subtitle: 'Voir tous les achats',
      onPress: () => Alert.alert('Historique des achats', 'Vos derniers achats:\n\n• Marcher dans la Foi - 5 000 FCFA\n• L\'Onction Divine - 7 500 FCFA\n• Maîtrise Mentale - 12 000 FCFA')
    },
    {
      icon: 'help-outline' as const,
      label: 'Aide & Support',
      subtitle: 'FAQ, Contact',
      onPress: () => Alert.alert('Aide & Support', 'Pour toute question:\n\n📧 support@rfmm.com\n📞 +225 07 00 00 00\n\nHoraires: Lun-Ven 8h-18h')
    },
  ];

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnecter',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Déconnecté', 'Vous avez été déconnecté avec succès.');
            // navigation.navigate('Login');
          }
        }
      ]
    );
  };

  const handleSettingsHeader = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSettingsHeader}>
            <MaterialIcons name="settings" size={24} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity style={styles.iconButton} onPress={handleEditProfile}>
            <MaterialIcons name="edit" size={24} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        {/* Carte Profil */}
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={handleEditProfile}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <View style={styles.premiumBadge}>
              <MaterialIcons name="star" size={12} color="black" />
            </View>
            <View style={styles.editAvatarBadge}>
              <MaterialIcons name="camera-alt" size={12} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity
            style={styles.memberBadge}
            onPress={() => Alert.alert('Premium', 'Profitez de tous les avantages Premium:\n\n✓ Accès illimité\n✓ Téléchargements\n✓ Contenu exclusif\n✓ Support prioritaire')}
          >
            <Text style={styles.memberBadgeText}>MEMBRE {user.level.toUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={styles.memberSince}>Membre depuis {user.memberSince}</Text>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity
              key={stat.label}
              style={[styles.statCard, index > 0 && { marginLeft: 12 }]}
              onPress={() => {
                if (stat.label === 'Livres Lus') {
                  navigation.navigate('Ma Biblio');
                } else if (stat.label === 'Heures Écoutées') {
                  Alert.alert('Statistiques d\'écoute', 'Total: 48 heures\n\nCe mois: 12 heures\nSemaine dernière: 5 heures\nAujourd\'hui: 45 minutes');
                } else if (stat.label === 'Coaching') {
                  navigation.navigate('Ma Biblio');
                }
              }}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, index > 0 && { marginTop: 1 }]}
              activeOpacity={0.7}
              onPress={item.onPress}
            >
              <View style={styles.menuIcon}>
                <MaterialIcons name={item.icon} size={24} color="#f2d00d" />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.notificationBanner}
          onPress={() => navigation.navigate('Notifications')}
        >
          <View style={styles.notificationIcon}>
            <MaterialIcons name="notifications" size={24} color="#f2d00d" />
            <View style={styles.notificationDot} />
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>2 nouvelles notifications</Text>
            <Text style={styles.notificationSubtitle}>Voir toutes les notifications</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#ff6b6b" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>RFMM v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221f10',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#f2d00d',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f2d00d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
  memberBadge: {
    marginTop: 16,
    backgroundColor: 'rgba(242, 208, 13, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(242, 208, 13, 0.3)',
  },
  memberBadgeText: {
    color: '#f2d00d',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  memberSince: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f2d00d',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(242, 208, 13, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  menuSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  notificationBanner: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(242, 208, 13, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(242, 208, 13, 0.2)',
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff6b6b',
    borderWidth: 2,
    borderColor: 'rgba(242, 208, 13, 0.1)',
  },
  notificationText: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  logoutText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    marginTop: 24,
  },
});
