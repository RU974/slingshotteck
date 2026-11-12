import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { ProductBanner, ProductTour, ServiceFeatures, SmartPlatform } from "@/components/ProductSections";
import config from "@/config/config.json";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";

const crmFaqs = [
  { question: "What is a CRM?", answer: "A CRM (customer relationship management) system stores every lead, contact, deal and conversation in one place, so sales and support teams can follow up on time and managers can forecast revenue." },
  { question: "Who is Slingshotteck CRM for?", answer: "Growing sales and support teams, from small businesses to mid-sized companies, that have outgrown spreadsheets and inboxes and want a clear pipeline with automated follow-up." },
  { question: "Does Slingshotteck CRM integrate with our HRMS and other tools?", answer: "Yes. It shares a platform with Slingshotteck HRMS, and we can integrate it with email, telephony, accounting and payment systems through our <a href='/services/custom-software-development'>development team</a>." },
  { question: "How much does Slingshotteck CRM cost?", answer: "CRM plans are quoted based on team size and required features. <a href='/contact'>Contact us</a> for a tailored proposal and demo." },
  { question: "Can you migrate our data from another CRM or spreadsheets?", answer: "Yes. We import contacts, companies, deals and history from spreadsheets and most popular CRMs as part of onboarding." },
];

export default function Crm() {
  const crm = getListPage("crm", "-index").data;
  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const productSchema = {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/crm#software`,
    name: "Slingshotteck CRM",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Customer relationship management (CRM)",
    operatingSystem: "Web browser",
    url: `${siteUrl}/crm`,
    description: crm.description,
    image: `${siteUrl}/images/crm/crm-leads-board.png`,
    publisher: { "@id": `${siteUrl}/#organization` },
    featureList: [
      "Lead and contact management",
      "Visual sales pipeline",
      "Quotes",
      "Email, call and task automation",
      "Customer support and ticketing",
      "Sales reporting dashboards",
    ],
  };

  return (
    <Base {...crm} schema={productSchema}>
      <ProductBanner banner={{ ...crm.banner, button_secondary: undefined }} productName="CRM" imageAlt="Slingshotteck CRM Dashboard" />
      <SmartPlatform data={crm.smart_platform} />
      <ProductTour data={crm.product_tour} />
      <ServiceFeatures data={crm.service_features} />
      <Faq title="CRM software: frequently asked questions" items={crmFaqs} />
      <CallToAction />
    </Base>
  );
}
