export type ScreenLocale = "ko" | "en";

const SCREENS = {
  alarmRing: { ko: "01_alarm-ring_ko.png", en: "01_alarm-ring_en-US.png" },
  homeFabs: { ko: "02_home-fabs_ko.png", en: "02_home-fabs_en-US.png" },
  alarmDetail: {
    ko: "03_alarm-detail-weekdays_ko.png",
    en: "03_alarm-detail-weekdays_en-US.png",
  },
  soundPicker: { ko: "04_sound-picker_ko.png", en: "04_sound-picker_en-US.png" },
  messagePreview: {
    ko: "05_message-preview-playing_ko.png",
    en: "05_message-preview-playing_en-US.png",
  },
  settings: { ko: "06_settings-default_ko.png", en: "06_settings-default_en-US.png" },
  settingsTheme: {
    ko: "07_settings-theme-modal_ko.png",
    en: "07_settings-theme-modal_en-US.png",
  },
  onboardingIntro: {
    ko: "08_onboarding-intro_ko.png",
    en: "08_onboarding-intro_en-US.png",
  },
  onboardingFlow: {
    ko: "09_onboarding-flow_ko.png",
    en: "09_onboarding-flow_en-US.png",
  },
  voiceMessagesList: {
    ko: "10_voice-messages-list_ko.png",
    en: "10_voice-messages-list_en-US.png",
  },
} satisfies Record<string, Record<ScreenLocale, string>>;

export type ScreenKey = keyof typeof SCREENS;

export function getScreenPath(key: ScreenKey, locale: ScreenLocale = "ko"): string {
  return `/screens/${locale}/${SCREENS[key][locale]}`;
}
