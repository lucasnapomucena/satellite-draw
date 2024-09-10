import { create } from 'zustand';
import { Map } from 'ol';
import Draw from 'ol/interaction/Draw';

interface MapState {
    map: Map | null;
    setMap: (map: Map) => void;
    draw: Draw | null;
    setDraw: (draw: Draw) => void;
  }

const useMapStore = create<MapState>((set) => ({
  map: null,
  draw: null,
  setMap: (map) => set({ map }),
  setDraw: (draw) => set({ draw }),
}));

export default useMapStore;