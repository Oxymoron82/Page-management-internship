// app/_screens/ManageEvents/BasicEventInfo.tsx

import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Eye, Save } from 'lucide-react-native';

// Layout components used across the app
import Navbar from '@/app/components/homescreen/navbar/Navbar';
import Container from '@/app/components/homescreen/Container';
import Footer from '@/app/components/homescreen/footer/Footer';

// Typography components
import { CustomText, CustomTextSemiBold } from '@/app/components/UI/CustomText';

//  Reuse shared Input (supports icons, matches CreateEvent)
import Input from '@/app/components/Input';

// Custom toggle (so it’s not green and the knob stays inside)
import Toggle from '@/app/components/UI/Toggle';

// Map (same one used in Create Event)
import EventMap from '@/app/components/UI/Map/EventMap';

// --- Icons (same approach as CreateEventScreen) ---
import RadioButtonInactiveLogo from '@/app/components/assets/icons/general/radio-button-inactive.svg';
import RadioButtonActiveLogo from '@/app/components/assets/icons/general/radio-button-active.svg';
import LocationIcon from '@/app/components/assets/icons/general/locationIcon.svg';
import LinkIcon from '@/app/components/assets/icons/general/link-grey.svg';




// Types

type BasicEventForm = {
  title: string;
  description: string;
  dateTime: string;
  capacity: string;
  eventType: 'Online' | 'Venue';
  venueName: string;
  address: string; // Venue address OR meeting link when Online
};

export default function BasicEventInfo() {
  const [form, setForm] = useState<BasicEventForm>({
    title: '',
    description: '',
    dateTime: '',
    capacity: '',
    eventType: 'Venue',
    venueName: '',
    address: '',
  });

  // Tabs are visual  now
  const [activeTabIndex, setActiveTabIndex] = useState<0 | 1 | 2>(0);

  const isVenue = useMemo(() => form.eventType === 'Venue', [form.eventType]);

  const patchForm = (patch: Partial<BasicEventForm>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const setEventType = (type: 'Venue' | 'Online') => {
    patchForm({ eventType: type });
    
  };

  // Action handlers
  const handlePreview = () => console.log('Preview event:', form);
  const handleSaveDraft = () => console.log('Save draft:', form);
  const handlePublish = () => console.log('Publish event:', form);
  const handleSaveChanges = () => console.log('Save changes:', form);


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Navbar />

        <Container>
          {/* ================= HEADER ================= */}
          <View style={styles.headerWrapper}>
            {/* Left: back link + tabs */}
            <View>
              <TouchableOpacity>
                <CustomText style={styles.backText}>{'<'} Back to events</CustomText>
              </TouchableOpacity>

              {/* Tabs */}
              <View style={styles.tabsRow}>
                <TouchableOpacity
                  onPress={() => setActiveTabIndex(0)}
                  style={[
                    styles.tabButton,
                    activeTabIndex === 0 ? styles.activeTab : styles.inactiveTab,
                  ]}
                >
                  <CustomText
                    style={activeTabIndex === 0 ? styles.activeTabText : styles.inactiveTabText}
                  >
                    Event Details
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setActiveTabIndex(1)}
                  style={[
                    styles.tabButton,
                    activeTabIndex === 1 ? styles.activeTab : styles.inactiveTab,
                  ]}
                >
                  <CustomText
                    style={activeTabIndex === 1 ? styles.activeTabText : styles.inactiveTabText}
                  >
                    Attendees
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setActiveTabIndex(2)}
                  style={[
                    styles.tabButton,
                    activeTabIndex === 2 ? styles.activeTab : styles.inactiveTab,
                  ]}
                >
                  <CustomText
                    style={activeTabIndex === 2 ? styles.activeTabText : styles.inactiveTabText}
                  >
                    Settings
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Right: action buttons */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionBtnBase, styles.actionBtnSecondary]}
                onPress={handlePreview}
                activeOpacity={0.85}
              >
                <View style={styles.actionBtnContent}>
                  <Eye size={24} color="#374151" />
                  <CustomText style={styles.actionBtnTextSecondary}>Preview</CustomText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtnBase, styles.actionBtnSecondary]}
                onPress={handleSaveDraft}
                activeOpacity={0.85}
              >
                <View style={styles.actionBtnContent}>
                  <Save size={24} color="#374151" />
                  <CustomText style={styles.actionBtnTextSecondary}>Save Draft</CustomText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtnBase, styles.actionBtnPrimary]}
                onPress={handlePublish}
                activeOpacity={0.85}
              >
                <CustomText style={styles.actionBtnTextPrimary}>Publish Event</CustomText>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= BASIC INFORMATION ================= */}
          <View style={styles.card}>
            <CustomTextSemiBold style={styles.sectionTitle}>Basic Information</CustomTextSemiBold>

            <View style={styles.fieldGroup}>
              <CustomText style={styles.label}>Event Title</CustomText>
              <Input
                placeholder="Helsinki React.js Meetup"
                value={form.title}
                onChangeText={(text) => patchForm({ title: text })}
              />
            </View>

            <View style={styles.fieldGroup}>
              <CustomText style={styles.label}>Description</CustomText>
              <Input
                placeholder="Write a short description about your event"
                value={form.description}
                onChangeText={(text) => patchForm({ description: text })}
                multiline
                height={140}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CustomText style={styles.label}>Date &amp; Time</CustomText>
                <Input
                  placeholder="Select date & time"
                  value={form.dateTime}
                  onChangeText={(text) => patchForm({ dateTime: text })}
                />
              </View>

              <View style={styles.rowItem}>
                <CustomText style={styles.label}>Capacity</CustomText>
                <Input
                  placeholder="Max attendees"
                  value={form.capacity}
                  onChangeText={(text) => patchForm({ capacity: text })}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* ================= LOCATION ================= */}
          <View style={styles.card}>
            <View style={styles.locationHeaderRow}>
              <CustomTextSemiBold style={styles.sectionTitle}>Location</CustomTextSemiBold>

            </View>

            <View style={styles.fieldGroup}>
              <CustomText style={styles.label}>Event Type</CustomText>
              <CustomText style={styles.helperText}>Is that online or in-person event?</CustomText>

              {/*  Event Type cards (same as Create Event) */}
              <View style={styles.eventTypeOptions}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setEventType('Venue')}
                  style={[
                    styles.eventTypeOption,
                    isVenue && styles.eventTypeOptionActive,
                  ]}
                >
                  {isVenue ? <RadioButtonActiveLogo /> : <RadioButtonInactiveLogo />}
                  <View style={styles.eventTypeOptionTextContainer}>
                    <CustomText style={[styles.eventTypeOptionTitle, isVenue && styles.eventTypeOptionTitleActive]}>
                      In-Person/Venue
                    </CustomText>
                    <CustomText style={styles.eventTypeOptionSubtitle}>
                      A physical location where attendees will meet in person
                    </CustomText>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setEventType('Online')}
                  style={[
                    styles.eventTypeOption,
                    !isVenue && styles.eventTypeOptionActive,
                  ]}
                >
                  {!isVenue ? <RadioButtonActiveLogo /> : <RadioButtonInactiveLogo />}
                  <View style={styles.eventTypeOptionTextContainer}>
                    <CustomText style={[styles.eventTypeOptionTitle, !isVenue && styles.eventTypeOptionTitleActive]}>
                      Virtual/Online
                    </CustomText>
                    <CustomText style={styles.eventTypeOptionSubtitle}>
                      An online event that attendees join remotely
                    </CustomText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Venue - Venue name + Address + Map */}
            {isVenue ? (
              <>
                <View style={styles.fieldGroup}>
                  <CustomText style={styles.label}>Venue name</CustomText>
                  <Input
                    placeholder="Venue name"
                    value={form.venueName}
                    onChangeText={(text) => patchForm({ venueName: text })}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <CustomText style={styles.label}>Address</CustomText>
                  <Input
                    placeholder="Type event location"
                    value={form.address}
                    onChangeText={(text) => patchForm({ address: text })}
                    leftIcon={<LocationIcon />}
                  />
                </View>

                <View style={styles.mapWrapper}>
                  <EventMap address={form.address || 'Helsinki'} />
                </View>
                
{/* ================= BOTTOM ACTIONS (Figma) ================= */}
<View style={styles.bottomActionsRow}>
  <View style={styles.bottomActionsLeft}>
    <TouchableOpacity
      style={[styles.bottomBtnBase, styles.bottomBtnSecondary]}
      onPress={handlePreview}
      activeOpacity={0.85}
    >
      <View style={styles.bottomBtnContent}>
        <Eye size={18} color="#374151" />
        <CustomText style={styles.bottomBtnTextSecondary}>Preview</CustomText>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.bottomBtnBase, styles.bottomBtnSecondary]}
      onPress={handleSaveDraft}
      activeOpacity={0.85}
    >
      <View style={styles.bottomBtnContent}>
        <Save size={18} color="#374151" />
        <CustomText style={styles.bottomBtnTextSecondary}>Save draft</CustomText>
      </View>
    </TouchableOpacity>
  </View>

  <TouchableOpacity
    style={[styles.bottomBtnBase, styles.bottomBtnPrimary]}
    onPress={handleSaveChanges}
    activeOpacity={0.85}
  >
    <View style={styles.bottomBtnContent}>
      <Save size={18} color="#FFFFFF" />
      <CustomText style={styles.bottomBtnTextPrimary}>Save changes</CustomText>
    </View>
  </TouchableOpacity>
</View>


              </>
            ) : (
              /* Online - Meeting link only */
              <View style={styles.fieldGroup}>
                <CustomText style={styles.label}>Meeting link</CustomText>
                <Input
                  placeholder="https://zoom.us/j/example"
                  value={form.address}
                  onChangeText={(text) => patchForm({ address: text })}
                  autoCapitalize="none"
                  leftIcon={<LinkIcon />}
                />
              </View>
            )}
          </View>
        </Container>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollViewContent: { paddingBottom: 32 },

  headerWrapper: {
    marginTop: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  backText: { fontSize: 14, color: '#4F46E5' },

  tabsRow: { marginTop: 16, flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tabButton: {
    height: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: { backgroundColor: '#FFFFFF', borderColor: '#374151' },
  inactiveTab: { backgroundColor: '#F0F0F0', borderColor: '#374151' },
  activeTabText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  inactiveTabText: { fontSize: 14, color: '#4B5563', fontWeight: '500' },

  // ACTION BUTTONS
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  actionBtnBase: {
    height: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
  },
  actionBtnSecondary: { backgroundColor: '#FFFFFF', borderColor: '#374151' },
  actionBtnPrimary: { backgroundColor: '#6F6BFF', borderColor: '#374151' },
  actionBtnContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionBtnTextSecondary: { fontSize: 18, color: '#374151', fontWeight: '600' },
  actionBtnTextPrimary: { fontSize: 18, color: '#FFFFFF', fontWeight: '700' },

  // Cards (Figma)
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  sectionTitle: { fontSize: 32, color: '#111827', fontWeight: '700', marginBottom: 20 },

  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#111827', marginBottom: 6 },
  helperText: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  row: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  rowItem: { flex: 1, minWidth: 220 },

  // Location header
  locationHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  venueLabel: { fontSize: 16, color: '#6B7280' },

  // Event Type cards (from Create Event)
  eventTypeOptions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  eventTypeOption: {
    flex: 1,
    minWidth: 260,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  eventTypeOptionActive: {
    borderColor: '#544FFF',
  },
  eventTypeOptionTextContainer: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  eventTypeOptionTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  eventTypeOptionTitleActive: {
    color: '#544FFF',
  },
  eventTypeOptionSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  mapWrapper: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Bottom actions (under Location)
bottomActionsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
  marginTop: 8,
  marginBottom: 24,
},
bottomActionsLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
},

bottomBtnBase: {
  height: 40,
  paddingHorizontal: 16,
  borderRadius: 8,
  borderWidth: 1,
  justifyContent: 'center',
},
bottomBtnSecondary: {
  backgroundColor: '#FFFFFF',
  borderColor: '#374151',
},
bottomBtnPrimary: {
  backgroundColor: '#544FFF',
  borderColor: '#544FFF',
},

bottomBtnContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

bottomBtnTextSecondary: {
  fontSize: 14,
  color: '#374151',
  fontWeight: '600',
},
bottomBtnTextPrimary: {
  fontSize: 14,
  color: '#FFFFFF',
  fontWeight: '700',
},

});
