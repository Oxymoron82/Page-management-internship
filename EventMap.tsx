import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { MapView, Marker } from '../Map';
import type { Region } from '../Map';

interface EventMapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  title?: string;
  address: string;
  height?: number;
}

const EventMap: React.FC<EventMapProps> = ({
  coordinates,
  title = 'Event Location',
  address,
  height = 300,
}) => {
  const defaultCoordinates = {
    latitude: coordinates?.lat || 60.1699,
    longitude: coordinates?.lng || 24.9384,
  };

  const region: Region = {
    ...defaultCoordinates,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const mapProps: any = {
    style: styles.map,
    initialRegion: region,
    provider: 'google',
  };

  // if (Platform.OS === 'web') {
  //   mapProps.googleMapsApiKey = 'GOOGLE_MAPS_API_KEY';
  // }

  return (
    <View style={[styles.container, { height }]}>
      <MapView {...mapProps}>
        <Marker
          coordinate={defaultCoordinates}
          title={title}
          description={address}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
  },
  map: {
    width: '100%',
    height: 300,
  },
});

export default EventMap;
