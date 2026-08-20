import { I18nProvider } from "@/components/i18n/I18nProvider";
import { HomePageContent } from "@/components/page/HomePageContent";

export default function HomePage() {
  return (
    <I18nProvider locale="en">
      <HomePageContent />
    </I18nProvider>
  );
}
