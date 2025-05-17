import React from "react";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import iconCheck from "../assets/icon-check.svg";
import Button from "./Button";

const FEATURE_LIST = [
  "Pantau klasifikasi sampah secara langsung",
  "Hitung kontribusi lingkungan Anda",
  "Dapatkan reward secara real-time",
];

export default function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/osm_bright.json",
      center: [112.768845, -7.250445], // [lng, lat] Surabaya
      zoom: 12,
    });

    // Add marker
    new maplibregl.Marker().setLngLat([112.768845, -7.250445]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-14 lg:px-8">
        <div className="text-center gap-y-4 flex flex-col mb-8">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:leading-[4rem]">
            Lokasi Trashure
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Temukan bagaimana Trashure telah meningkatkan partisipasi warga dalam
            memilah sampah di berbagai lokasi.
          </p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 md:gap-14 lg:gap-20">
          {/* Left: Features & Testimonial */}
          <div className="flex flex-col items-start w-full lg:w-1/2 gap-8 md:gap-10">
            <div className="flex flex-col gap-y-3 text-left md:text-center lg:text-left w-full">
              <h2 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug md:leading-[2.75rem] text-gray-800">
                “Trashure mulai kami gunakan di Birmingham, dan sejak itu,
                partisipasi warga dalam memilah sampah meningkat 70%. Lokasi ini
                menjadi bukti awal bahwa teknologi kami bisa diadopsi secara
                luas.”
              </h2>
            </div>
            <div className="flex flex-col gap-y-4 w-full mt-4">
              {FEATURE_LIST.map((feature, idx) => (
                <div className="flex gap-3 items-center" key={idx}>
                  <div className="p-1.5 bg-green-2 flex items-center justify-center rounded-full">
                    <img src={iconCheck} alt="Checkmark" />
                  </div>
                  <p className="font-bold text-base sm:text-lg">{feature}</p>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              size="md"
              className="w-full sm:w-auto mt-4"
            >
              Pelajari Cara Kerja
            </Button>
          </div>
          {/* Right: MapLibre Map */}
          <div className="flex items-center justify-center w-full lg:w-1/2 mb-8 lg:mb-0">
            <div
              ref={mapContainer}
              className="w-full h-72 sm:h-96 md:h-[28rem] lg:h-[32rem] rounded-xl shadow-md"
              style={{ minHeight: 250 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}