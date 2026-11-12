import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { ProductBanner, ProductTour } from "@/components/ProductSections";
import config from "@/config/config.json";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";

const hrmsFaqs = [
  { question: "What is an HRMS?", answer: "An HRMS (human resource management system) is software that brings employee records, attendance, leave, payroll, recruitment and performance management into one system, replacing spreadsheets and separate HR tools." },
  { question: "Does Slingshotteck HRMS work with biometric attendance devices?", answer: "Yes. Slingshotteck HRMS syncs attendance from supported biometric and fingerprint devices, so check-in and check-out times flow automatically into attendance records and payroll." },
  { question: "Can the HRMS calculate payroll automatically?", answer: "Yes. Payroll runs use attendance, leave, overtime, allowances, bonuses and deductions to generate salaries and payslips without manual calculation." },
  { question: "How much does Slingshotteck HRMS cost?", answer: "Plans start at $10 per employee per month, with a 14-day free trial and 20% off yearly billing. See the <a href='/pricing'>pricing page</a> for details or contact us for enterprise pricing." },
  { question: "Is the HRMS cloud-based?", answer: "Yes. Slingshotteck HRMS runs in the browser and is hosted in the cloud, and it can be deployed on your own servers for enterprise customers." },
  { question: "Can it be customised for our company?", answer: "Yes. As we develop the product ourselves, we can configure policies and workflows and build custom modules or integrations through our <a href='/services/custom-software-development'>software development service</a>." },
];

export default function Hrms() {
  const hrms = getListPage("hrms", "-index").data;
  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const productSchema = {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/hrms#software`,
    name: "Slingshotteck HRMS",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Human resource management system (HRMS)",
    operatingSystem: "Web browser",
    url: `${siteUrl}/hrms`,
    description: hrms.description,
    image: `${siteUrl}/images/hrms/hrms-dashboard.png`,
    publisher: { "@id": `${siteUrl}/#organization` },
    featureList: [
      "Employee records and documents",
      "Biometric attendance, shifts and leave",
      "Automated payroll and payslips",
      "Recruitment and onboarding",
      "Performance reviews",
      "HR and payroll reports",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "10",
      highPrice: "20",
      offerCount: 2,
      url: `${siteUrl}/pricing`,
      description: "Per employee per month, 14-day free trial",
    },
  };

  return (
    <Base {...hrms} schema={productSchema}>
      <ProductBanner banner={hrms.banner} productName="HRMS" imageAlt="Slingshotteck HRMS Sign In" />
      <ProductTour data={hrms.product_tour} />
      <Faq title="HRMS software: frequently asked questions" items={hrmsFaqs} />
      <CallToAction />
    </Base>
  );
}
