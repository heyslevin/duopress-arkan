import Header from "./Header";
import PageBuilderPage from "./PageBuilder";
import Footer from "./Footer";

export default function PageWithHeader({ page }) {
  return (
    <div className="bg-primary">
      <Header headerTheme={page.headerTheme || "transparent"} />
      <PageBuilderPage page={page as any} />
      <Footer />
    </div>
  );
}
