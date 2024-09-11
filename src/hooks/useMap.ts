import { useContext } from "react";
import { MapContext } from "../context/MapContext";

export const useMap = () => {
    const context = useContext(MapContext);
  
    return context;
  };