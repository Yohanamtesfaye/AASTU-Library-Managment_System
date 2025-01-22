import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Bind i18next to React
  .init({
    resources: {
      en: {
        translation: {
          "Library Dashboard": "Library Dashboard",
          "Current Visitors": "Current Visitors",
          "Avg. Visit Duration": "Avg. Visit Duration",
          "Books Borrowed": "Books Borrowed",
          "Peak Day": "Peak Day",
          "Thursday": "Thursday",
          "Yearly Statistics": "Yearly Statistics",
          "Hourly": "Hourly",
          "Weekly": "Weekly",
          "Monthly": "Monthly",
          "Yearly": "Yearly",
          "nav": "AASTU Library Management System",
          "Books": "Books",
          "Students": "Students",
          "Lend A Book": "Lend A Book",
          "Lent Book List": "Lent Book List",
          "Lending History": "Lending History",
          "Book Returns": "Book Returns",
          "Settings": "Settings",
          "Main": "Main",
          "bookmanagement": "Book Management",
          "thursday": "Thursday",
          "Hourly Visits": "Hourly Visits",
          "Weekly Traffic": "Weekly Traffic",
          "Monthly Traffic": "Monthly Overview",
          "Yearly Traffic": "Yearly Statistics",

        },
      },
      am: {
        translation: {
          "Library Dashboard": "የቤተ መጻሕፍት ዳሽቦርድ",
          "Current Visitors": "አሁን የሚጎበኙ",
          "Avg. Visit Duration": "አማካኝ የጉብኝት ጊዜ",
          "Books Borrowed": "የተበደሩ መጻሕፍት",
          "Peak Day": "ከፍተኛ ቀን",
          "Thursday": "ሐሙስ",
          "Yearly Statistics": "የአመት ስታቲስቲክስ",
          "Hourly": "በሰዓት",
          "Weekly": "በሳምንት",
          "Monthly": "በወር",
          "Yearly": "በአመት",
          "nav": "አአሳቴዪ ቤተመጻሕፍት ቁጥጥር ሲስተም",
          "Books": "መጻሕፍት",
          "Students": "ተማሪዎች",
          "Lend A Book": "መጻሕፍት እንል",
          "Lent Book List": "መጻሕፍት ዝርዝር",
          "Lending History": "መጻሕፍት ታሪክ",
          "Book Returns": "መጻሕፍት መለያ",
          "Settings": "ቅንብሮች",
          "Main": "መሪ",
          "bookmanagement": "መጻሕፍት አስተዳዳሪ",
          "thursday": "ሐሙስ",
          "Hourly Visits": "ሰዓት ጉብኝቶች",
          "Weekly Traffic": "ሳምንታዊ ጉብኝቶች",
          "Monthly Traffic": "ወርሐዊ ጉብኝቶች",
          "Yearly Traffic": "አመታዊ ጉብኝቶች",
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // Not needed for React (auto escaping)
    },
  });

export default i18n;
