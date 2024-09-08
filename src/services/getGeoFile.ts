import geoblaze from "geoblaze";
import GeoRasterLayer from "georaster-layer-for-leaflet";

export const RasterService = {
  getGeoFile: async (url: string, resolution: number) => {
    const georaster = await geoblaze.parse(url);

    const options = {
      georaster: georaster,
      opacity: 0.7,
      resolution: resolution,
    };

    const raster = new GeoRasterLayer(options);

    return raster;
  },
};