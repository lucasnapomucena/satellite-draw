import { Map } from 'ol';
import {create} from 'zustand';

interface MapState {
  mapInstance: Map | null;
  setMapInstance: (mapInstance: Map) => void;
} 

export const useMapStore = create<MapState>((set) => ({
  mapInstance: null,
  setMapInstance: (mapInstance) => set({ mapInstance }),
}));