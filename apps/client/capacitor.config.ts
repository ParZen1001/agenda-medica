import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.agendamedica.app",
  appName: "Agenda Médica",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
